import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./auth.api";
import {setCriticalError} from "./critical-error.slice";

const sliceName = "user";
const initialState = {
	access_token: null,
	email: null,
	role: null
};

export const UserSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		logout(state) {
			state.access_token = null;
			state.email = null;
			state.role = null;
		},
	},
	extraReducers(builder) {
		builder.addCase(setCriticalError, (state, action) => {
			const {status} = action.payload;
			switch (status) {
			case 401:
				state.access_token = null;
				state.email = null;
				state.role = null;
				break;
			}
		});
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
			const {access_token, email, role} = action.payload;
			state.access_token = access_token;
			state.email = email;
			state.role = role;
		});
	}
});

export const {
	logout
} = UserSlice.actions;

export const selectIsLoggedIn = state => !!state[sliceName].access_token;
