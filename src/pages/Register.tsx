/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSignUpMutation } from "@/redux/api/baseApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after sign-up

const Register: React.FC = () => {
  const [signUp, { isLoading, isError, error, isSuccess }] =
    useSignUpMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "user", // The role is defaulted to "user"
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook for redirecting

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("user data", formData);

    try {
      await signUp(formData).unwrap(); // Attempt to sign up
    } catch {
      // Handle any errors (already captured by `isError`)
    }
  };

  // Effect to handle showing the modal and redirecting after successful sign-up
  useEffect(() => {
    if (isSuccess) {
      setShowModal(true); // Show the modal on successful sign-up
      setTimeout(() => {
        setShowModal(false);
        navigate("/login"); // Redirect to the home page after the modal disappears
      }, 2000); // Show the modal for 2 seconds before redirecting
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {isError && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p>
              {(error as any).data?.message ||
                "An error occurred during sign-up"}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <a href="/login" className="text-blue-500 hover:underline text-sm">
            Already have an account? Log in
          </a>
          <a
            href="/forgot-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg w-80 transform transition-all scale-100 duration-300">
            <h3 className="text-lg font-semibold mb-4 text-green-600">
              Success
            </h3>
            <p className="mb-4">
              You have signed up successfully! Redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
