import {createApi} from "@reduxjs/toolkit/query/react";
import {CustomFetchBaseQuery} from "./CustomFetchBaseQuery";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: CustomFetchBaseQuery({
		baseUrl: "/auth"
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({url: "/login", method: "post", body}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useLoginMutation,
} = authApi;