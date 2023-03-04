import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {setCriticalError} from "./critical-error.slice";

export const CustomFetchBaseQuery = (fetchBaseQueryArgs) => {
	let baseQuery = fetchBaseQuery({
		baseUrl: (fetchBaseQueryArgs.root ?? process.env.REACT_APP_API_BASE_URI) + fetchBaseQueryArgs.baseUrl,
		prepareHeaders: (headers, {getState}) => {
			try {
				const token = getState().user.access_token;
				if (token) {
					headers.set("authorization", `Bearer ${token}`);
				}
			} catch (e) {
				console.error("error in setting authorization header: ", e);
			}
			return headers;
		},
	});
	return async (args, api, extraOptions) => {
		try {
			const result = await baseQuery(args, api, extraOptions);
			if (result.error?.status === "FETCH_ERROR") {
				api.dispatch(setCriticalError({
					status: result.error.status,
					message: result.error.error
				}));
			}
			if (result.error?.status === 401) {
				api.dispatch(setCriticalError({
					status: result.error.status,
					message: result.error.data.message
				}));
			}
			if (result.error?.status === 500) {
				api.dispatch(setCriticalError({
					status: result.error.status,
					message: result.error.data.message
				}));
			}
			return result;
		} catch (e) {
			console.error(e);
			throw e;
		}
	};
};
