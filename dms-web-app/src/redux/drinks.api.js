import {createApi} from "@reduxjs/toolkit/query/react";
import {CustomFetchBaseQuery} from "./CustomFetchBaseQuery";

export const drinksApi = createApi({
	reducerPath: "drinksApi",
	baseQuery: CustomFetchBaseQuery({
		baseUrl: "/drinks"
	}),
	tagTypes: ["drinks", "admin-drinks"],
	endpoints: builder => ({
		getDrinks: builder.query({
			query: () => "/",
		}),
		getUserDrinks: builder.query({
			query: (params) => ({url: "/user", method: "get", params}),
			providesTags: ["drinks"]
		}),
		consumeDrink: builder.mutation({
			query: (body) => ({url: "/consume", method: "post", body}),
			invalidatesTags: ["drinks"]
		}),
		guestConsumeDrink: builder.mutation({
			query: (body) => ({url: "/guest/consume", method: "post", body}),
			invalidatesTags: ["drinks"]
		}),
		getAllUserDrinks: builder.query({
			query: (params) => ({url: "/all_users", method: "get", params}),
			providesTags: ["admin-drinks"]
		}),
		deleteUserDrink: builder.mutation({
			query: (params) => ({url: "/user", method: "delete", params}),
			invalidatesTags: ["admin-drinks"]
		}),
		retrieveUserDrink: builder.mutation({
			query: (body) => ({url: "/user", method: "post", body}),
			invalidatesTags: ["admin-drinks"]
		}),
		getDrinkingUsers: builder.query({
			query: (params) => ({url: "/drinking_users", method: "get", params}),
		}),
		generateBills: builder.query({
			query: (params) => ({url: "/generate-bills", method: "get", params}),
			providesTags: ["admin-drinks"]
		}),
	})
});

export const {
	useGetDrinksQuery,
	useGetUserDrinksQuery,
	useConsumeDrinkMutation,
	useGuestConsumeDrinkMutation,
	useGetAllUserDrinksQuery,
	useDeleteUserDrinkMutation,
	useRetrieveUserDrinkMutation,
	useGetDrinkingUsersQuery,
	useGenerateBillsQuery
} = drinksApi;
