import {createApi} from "@reduxjs/toolkit/query/react";
import {CustomFetchBaseQuery} from "./CustomFetchBaseQuery";

export const drinksApi = createApi({
	reducerPath: "drinksApi",
	baseQuery: CustomFetchBaseQuery({
		baseUrl: "/drinks"
	}),
	endpoints: builder => ({
		getDrinks: builder.query({
			query: () => "/"
		}),
		getUserDrinks: builder.query({
			query: () => "/user"
		})
	})
});

export const {useGetUserDrinksQuery} = drinksApi;
