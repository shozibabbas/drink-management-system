import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "./auth.api";
import {UserSlice} from "./user.slice";
import {CriticalErrorSlice} from "./critical-error.slice";
import storage from "redux-persist/lib/storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from "redux-persist";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: [
		authApi.reducerPath,
		CriticalErrorSlice.name,
		// add all APIs to black list to stop persistence
		// for example
		// NewsApi.reducerPath,
	]
};

const appReducer = combineReducers({
	[UserSlice.name]: UserSlice.reducer,
	[CriticalErrorSlice.name]: CriticalErrorSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	// add all APIs and slices here
	// for example
	// [authApi.reducerPath]: authApi.reducer,
	// [DrawerSlice.name]: DrawerSlice.reducer,
});

const rootReducer = (state, action) => {
	// handle logout and critical error situations and empty storage
	if (action.type === "user/logout" || (action.type === "criticalError/setCriticalError" && action.payload.status === 401)) {
		storage.removeItem("persist:root");

		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		const middlewares = [
			authApi.middleware,
			// add all API middlewares here
		];
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		})
			.concat(middlewares);
	}
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
