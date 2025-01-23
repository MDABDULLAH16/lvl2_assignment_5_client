import React, { useState } from "react";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/baseApi";
import { TService } from "@/types/TServices";

import DeleteConfirmationModal from "@/components/ui/deletedModal";
import SuccessModal from "@/components/ui/successModal";
import { Link } from "react-router-dom";
import AddService from "./AddServices";

const ServiceManagement: React.FC = () => {
  const {
    data: servicesData,
    isLoading,
    isError,
    refetch, // Refetch method for manually fetching the updated data
  } = useGetAllServicesQuery({}, { refetchOnMountOrArgChange: false });

  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation(undefined);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);

  const handleAddService = async (newService: TService) => {
    try {
      await addService(newService).unwrap();
      setIsSuccessModalOpen(true);
      setIsAddModalOpen(false);
      refetch(); // Refetch the data after adding a new service
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service.");
    }
  };

  const handleDeleteService = async () => {
    if (!deleteServiceId) return;
    try {
      await deleteService(deleteServiceId).unwrap();
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true);
      refetch(); // Refetch the data after deleting a service
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  if (isLoading) return <p>Loading services...</p>;
  if (isError) return <p>Failed to load services.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-600">
          Service Management
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
        >
          Add Service
        </button>
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicesData?.data.map((service: TService) => (
            <tr key={service._id}>
              <td className="border border-gray-300 px-4 py-2">
                {service.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {service.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${service.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/update-service/${service._id}`}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    setDeleteServiceId(service._id as string);
                    setIsDeleteModalOpen(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <AddService
          onClose={() => setIsAddModalOpen(false)}
          onAddService={handleAddService}
          isAdding={isAdding}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          message="Are you sure you want to delete this service?"
          onConfirm={handleDeleteService}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      {isSuccessModalOpen && (
        <SuccessModal
          message="Operation completed successfully!"
          onClose={() => setIsSuccessModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
