import React from "react";
import { TService } from "@/types/TServices";

interface AddServiceProps {
  onClose: () => void;
  onAddService: (service: TService) => void;
  isAdding: boolean;
}

const AddService: React.FC<AddServiceProps> = ({
  onClose,
  onAddService,
  isAdding,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const serviceData = Object.fromEntries(
      formData.entries()
    ) as unknown as TService;
    serviceData.price = Number(serviceData.price);
    serviceData.duration = Number(serviceData.duration);

    console.log("Collected Service Data:", serviceData);
    onAddService(serviceData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Add Service</h3>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
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
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-1 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              disabled={isAdding}
            >
              {isAdding ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
