import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./auth.api";
import {drinksApi} from "./drinks.api";

const sliceName = "user";
const initialState = {
	access_token: null,
	email: null,
	role: null,
	drinkPreference: {drinkId: 0, quantity: 1},
	guestDetails: {email: "", name: "", drinkId: 0, quantity: 1}
};

const excludedKeys = ["drinkPreference", "guestDetails"];

export const UserSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		logout(state) {
			// reset state
			Object.entries(initialState).filter(x => !excludedKeys.includes(x[0])).forEach(([k, V]) => {
				state[k] = V;
			});
		},
		setDrinkPreference(state, action) {
			state.drinkPreference = action.payload;
		}
	},
	extraReducers(builder) {
		// builder.addCase(setCriticalError, (state, action) => {
		// 	const {status} = action.payload;
		// 	switch (status) {
		// 	case 401:
		// 		// reset state
		// 		Object.entries(initialState).forEach(([k, V]) => {
		// 			state[k] = V;
		// 		});
		// 		break;
		// 	}
		// });
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
			const {access_token, email, role} = action.payload;
			state.access_token = access_token;
			state.email = email;
			state.role = role;
		});
		builder.addMatcher(drinksApi.endpoints.guestConsumeDrink.matchFulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			const {access_token, email, role} = action.payload;
			state.access_token = access_token;
			state.email = email;
			state.role = role;
		});
		builder.addMatcher(drinksApi.endpoints.consumeDrink.matchFulfilled, (state, action) => {
			state.drinkPreference = action.meta.arg.originalArgs;
		});
		builder.addMatcher(drinksApi.endpoints.guestConsumeDrink.matchFulfilled, (state, action) => {
			delete action.meta.arg.originalArgs.password;
			state.guestDetails = action.meta.arg.originalArgs;
		});
	}
});

export const {
	logout,
	setDrinkPreference
} = UserSlice.actions;

export const selectIsLoggedIn = state => !!state[sliceName].access_token;
export const selectUserEmail = state => state[sliceName].email;
export const selectDrinkPreference = state => state[sliceName].drinkPreference;
export const selectGuestDetails = state => state[sliceName].guestDetails;
