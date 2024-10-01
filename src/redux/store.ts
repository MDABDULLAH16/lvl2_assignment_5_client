import { configureStore } from "@reduxjs/toolkit";
import { baseAPi } from "./api/baseApi";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer, [baseAPi.reducerPath]: baseAPi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
