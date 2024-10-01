import { useLoginUserMutation } from "@/redux/api/baseApi";
import { setUser } from "@/redux/features/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [loginUser, { data, error, isLoading, isSuccess }] =
    useLoginUserMutation();
  console.log("user", data?.data?.userInfo);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      loginUser({ email: formData.email, password: formData.password });
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      // Dispatch the setUser action to store the user data in Redux
      dispatch(
        setUser({
          user: data?.data?.userInfo, // Assuming the user data is in the response
          token: data.token, // Assuming the token is in the response
        })
      );

      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate("/"); // Redirect to home page
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
              required
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
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
              className={`mt-1 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
              required
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-blue-500 hover:underline"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>

        {error && (
          <p className="text-red-500 mt-2">
            Login failed: {error?.data?.message || "Something went wrong"}
          </p>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg w-80 transform transition-all scale-100 duration-300">
            <h3 className="text-lg font-semibold mb-4 text-green-600">
              Success
            </h3>
            <p className="mb-4">You have logged in successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
