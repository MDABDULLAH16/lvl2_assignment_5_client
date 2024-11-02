// baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
    getSingleService: builder.query({
      query: (_id) => ({
        url: `/services/${_id}`,
        method: "GET",
      }),
    }),
    getSlot: builder.query({
      query: (_id) => ({
        url: `/slots/${_id}`,
        method: "GET",
      }),
    }),
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    signUp: builder.mutation({
      query: (userData: {
        name: string;
        email: string;
        password: string;
        phone: string;
        address: string;
      }) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useGetSlotQuery,
  useLoginUserMutation,
  useSignUpMutation,
} = baseApi;
