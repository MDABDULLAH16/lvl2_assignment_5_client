import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/baseApi";
import {
  clearServiceDetails,
  setServiceDetails,
} from "@/redux/features/serviceSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ServiceUpdate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: 0,
    image: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: service, isLoading, isError } = useGetSingleServiceQuery(_id!);
  const [
    updateService,
    { isLoading: isUpdating, isSuccess, isError: updateError },
  ] = useUpdateServiceMutation();

  useEffect(() => {
    if (service?.data) {
      setFormData({
        name: service.data.name,
        price: service.data.price,
        description: service.data.description,
        duration: service.data.duration,
        image: service.data.image,
      });
      dispatch(setServiceDetails(service.data));
    }
    return () => {
      dispatch(clearServiceDetails());
    };
  }, [service, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
    };
    try {
      await updateService({ _id: _id!, ...updatedData }).unwrap();
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/admin-panel"); // Redirect after successful update
      }, 2000);
    }
  }, [isSuccess, navigate]);

  if (isLoading || isUpdating) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError || updateError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load or update service details.
      </div>
    );
  }

  if (!service?.data) {
    return <div>No service found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Update Service
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {["name", "price", "description", "duration", "image"].map((field) => (
          <div key={field} className="relative">
            <label className="block text-gray-700 font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={
                field === "price" || field === "duration" ? "number" : "text"
              }
              name={field}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              placeholder={`Enter service ${field}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center transform transition-transform scale-95 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 text-green-500 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Service Updated!
            </h2>
            <p className="mt-4 text-gray-600">
              Your service has been updated successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceUpdate;
