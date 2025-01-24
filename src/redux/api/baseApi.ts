import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Existing service endpoints
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

    // Slot management endpoints
    getAllSlot: builder.query({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
    }),

    getSlot: builder.query({
      query: (_id) => ({
        url: `/slots/${_id}`,
        method: "GET",
      }),
    }),

    // Toggle slot status (AVAILABLE / CANCELLED)
    updateSlotStatus: builder.mutation({
      query: ({
        slotId,
        status,
      }: {
        slotId: string;
        status: "AVAILABLE" | "CANCELLED";
      }) => ({
        url: `/slots/${slotId}/status`,
        method: "PATCH", // Use PATCH for partial updates
        body: { status },
      }),
    }),

    // Create a new slot
    createSlot: builder.mutation({
      query: (slotData: {
        service: string;
        date: string;
        startTime: string;
        endTime: string;
      }) => ({
        url: "/slots",
        method: "POST",
        body: slotData,
      }),
    }),
    updateSlot: builder.mutation({
      query: ({ id, data }) => ({
        url: `/slots/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Authentication endpoints
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
    getAllUser: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/auth/${_id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Booking endpoint
    createBooking: builder.mutation({
      query: (bookingData: {
        customer: string;
        serviceId: string;
        slotId: string;
        serviceName: string;
        userName: string;
        email: string;
        price: number;
        time: string;
      }) => ({
        url: "/bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
    getUserBooking: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAllSlotQuery,
  useGetSlotQuery,
  useUpdateSlotStatusMutation, // New hook for updating slot status
  useCreateSlotMutation, // New hook for creating a new slot
  useUpdateSlotMutation,
  useLoginUserMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useCreateBookingMutation,
  useGetUserBookingQuery,
} = baseApi;
