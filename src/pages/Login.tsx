/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/redux/api/baseApi";
import { verifyToken } from "@/utils/verefyToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { setUserDetails } from "@/redux/features/userDetailsSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface APIError {
  message: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const [loginUser, { data, error, isLoading, isSuccess }] = useLoginUserMutation();

  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError & { data: APIError } => {
    return (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof (error as any).data?.message === "string"
    );
  };

  useEffect(() => {
    if (data?.data?.userInfo) {
      dispatch(setUserDetails({ userDetails: data.data.userInfo }));
    }
  }, [data, dispatch]);

  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const res = await loginUser({ email, password }).unwrap();
      const user = verifyToken(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const onSubmit = async (formData: LoginFormInputs) => {
    await loginWithCredentials(formData.email, formData.password);
  };

  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  useEffect(() => {
    if (isSuccess && data) {
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate(from);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, navigate, from]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="flex sm:flex-col sm:space-y-2 justify-between mb-4">
          <button
            onClick={() => loginWithCredentials("admin@ph-b3-hero.com", "ph-password")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Admin Credential
          </button>
          <button
            onClick={() => loginWithCredentials("user@programming-hero.com", "ph-password")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            User Credential
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required." })}
              className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required." })}
              className={`mt-1 block w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between items-center mt-4">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-sm text-blue-500 hover:underline">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>

        {error && isFetchBaseQueryError(error) && (
          <p className="text-red-500 mt-2">Login failed: {error.data.message || "Something went wrong"}</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg w-80 transform transition-all scale-100 duration-300">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Success</h3>
            <p className="mb-4">You have logged in successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
