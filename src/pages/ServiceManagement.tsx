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
    refetch,
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
      refetch();
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
      refetch();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service.");
    }
  };

  if (isLoading) return <p className="text-gray-800 dark:text-gray-300">Loading services...</p>;
  if (isError) return <p className="text-red-500 dark:text-red-400">Failed to load services.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          Service Management
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
        >
          Add Service
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-300">
            <tr>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Description</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Price</th>
              <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData?.data.map((service: TService) => (
              <tr
                key={service._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-300">
                  {service.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-300">
                  {service.description}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-800 dark:text-gray-300">
                  ${service.price}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <Link
                      to={`/admin-panel/all-services/${service._id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-center transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => {
                        setDeleteServiceId(service._id as string);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
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
