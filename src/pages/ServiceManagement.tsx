import React, { useState } from "react";
import {
  useAddServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/baseApi";
import { TService } from "@/types/TServices";

const ServiceManagement: React.FC = () => {
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery({});
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<TService | null>(null);

  const handleAddService = async (newService: TService) => {
    try {
      await addService(newService).unwrap();
      setIsModalOpen(false);
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service.");
    }
  };

  const handleUpdateService = async (updatedService: TService) => {
    try {
      await updateService({
        id: updatedService._id,
        ...updatedService,
      }).unwrap();
      setSelectedService(null);
      alert("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      await deleteService(serviceId).unwrap();
      alert("Service deleted successfully!");
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
          onClick={() => {
            setIsModalOpen(true);
            setSelectedService(null); // Open modal for adding service
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
        >
          Add Service
        </button>
      </div>

      {/* Service Table */}
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
                <button
                  onClick={() => {
                    setSelectedService(service);
                    setIsModalOpen(true); // Open modal for updating service
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Update Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              {selectedService ? "Update Service" : "Add Service"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);

                // Convert formData to object and ensure data types
                const serviceData = Object.fromEntries(
                  formData.entries()
                ) as unknown as TService;
                serviceData.price = Number(serviceData.price);
                serviceData.duration = Number(serviceData.duration);

                console.log("Collected Service Data:", serviceData);

                if (selectedService) {
                  handleUpdateService({
                    _id: selectedService._id,
                    ...serviceData,
                  });
                } else {
                  handleAddService(serviceData);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedService?.name || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedService?.description || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedService?.price || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="number"
                  name="duration"
                  defaultValue={selectedService?.duration || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedService?.image || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                  disabled={isAdding || isUpdating}
                >
                  {isAdding || isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
