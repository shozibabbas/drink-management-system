import {createSlice} from "@reduxjs/toolkit";

const sliceName = "criticalError";
const initialState = {
	status: null,
	message: null
};

export const CriticalErrorSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setCriticalError(state, action) {
			state.status = action.payload.status;
			state.message = action.payload.message;
		},
	},
});

export const {
	setCriticalError
} = CriticalErrorSlice.actions;

export const selectCriticalError = state => state[sliceName].status ? state[sliceName] : null;