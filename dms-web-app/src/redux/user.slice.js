import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./auth.api";
import {setCriticalError} from "./critical-error.slice";

const sliceName = "user";
const initialState = {
	access_token: null,
	username: null,
	email: null,
};

export const UserSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		logout(state) {
			state.access_token = null;
			state.username = null;
			state.email = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(setCriticalError, (state, action) => {
			const {status} = action.payload;
			switch (status) {
			case 401:
				state.access_token = null;
				state.username = null;
				state.email = null;
				break;
			}
		});
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
			const {access_token, user_login, user_email} = action.payload;
			state.access_token = access_token;
			state.username = user_login;
			state.email = user_email;
		});
	}
});

export const {
	logout
} = UserSlice.actions;

export const selectIsLoggedIn = state => !!state[sliceName].access_token;
