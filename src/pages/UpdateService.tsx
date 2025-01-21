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

import { useParams } from "react-router-dom";

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

  // Fetch single service data
  const {
    data: service,
    isLoading,
    isError,
    refetch,
  } = useGetSingleServiceQuery(_id!);
  const serviceDetails = service?.data;

  // Define mutation hook for updating the service
  const [
    updateService,
    { isLoading: isUpdating, isSuccess, isError: updateError },
  ] = useUpdateServiceMutation();

  useEffect(() => {
    if (serviceDetails) {
      setFormData({
        name: serviceDetails.name,
        price: serviceDetails.price,
        description: serviceDetails.description,
        duration: serviceDetails.duration,
        image: serviceDetails.image,
      });

      // Store service details in Redux state
      dispatch(setServiceDetails(serviceDetails));
    }

    // Cleanup function to clear service details when component unmounts
    return () => {
      dispatch(clearServiceDetails());
    };
  }, [serviceDetails, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
    };

    // Call the update mutation with the service ID and updated service data
    await updateService({ _id: _id!, ...dataToSubmit });
  };

  // Open modal when the service update is successful
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
      refetch();
    }
  }, [isSuccess, refetch]);

  // Close modal after a few seconds
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

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

  if (!serviceDetails) {
    return <div>No service found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Update Service
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Service Name */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Service Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter service name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Price */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter service price"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows={2}
            required
          />
        </div>

        {/* Duration */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Duration (hrs)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter service duration"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Image URL */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Service Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md transform transition-all duration-500 ease-in-out scale-0 opacity-0 animate-scale-up-fade-in">
            <h2 className="text-2xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-4">
              Your service has been updated successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceUpdate;
