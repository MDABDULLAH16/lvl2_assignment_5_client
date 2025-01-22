import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token; // Replace with your token path
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    addService: builder.mutation({
      query: (serviceData: {
        name: string;
        description: string;
        price: number;
        duration: number;
        image: string;
      }) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
    }),
    updateService: builder.mutation({
      query: ({
        _id,
        ...updatedService
      }: {
        _id: string;
        name?: string;
        description?: string;
        price?: number;
        duration?: number;
        image?: string;
      }) => ({
        url: `/services/${_id}`,
        method: "PUT",
        body: updatedService,
      }),
    }),
    deleteService: builder.mutation({
      query: (_id: string) => ({
        url: `/services/${_id}`,
        method: "DELETE",
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
    createBooking: builder.mutation({
      query: (bookingData: {
        customer: string;
        serviceId: string;
        slotId: string;
        vehicleType: string;
        vehicleBrand: string;
        vehicleModel: string;
        manufacturingYear: number;
        registrationPlate: string;
      }) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation, // Export addService hook
  useUpdateServiceMutation, // Export updateService hook
  useDeleteServiceMutation, // Export deleteService hook
  useGetSlotQuery,
  useLoginUserMutation,
  useSignUpMutation,
  useCreateBookingMutation,
} = baseApi;
