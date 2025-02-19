/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useCreateSlotMutation,
  useGetAllServicesQuery,
} from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";

interface SlotData {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
}

const CreateSlot: React.FC = () => {
  const [createSlot] = useCreateSlotMutation();
  const navigate = useNavigate();
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery({});
  const [slotData, setSlotData] = useState<SlotData>({
    service: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    message: "",
    onClose: () => {},
  });

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createSlot(slotData).unwrap();
      console.log("Slot created successfully:", response);
      setModalVisible({
        visible: true,
        message: "Slot created successfully!",
        onClose: () => {
          setModalVisible({ ...modalVisible, visible: false });
          navigate("/admin-panel");
        },
      });
    } catch (err: any) {
      console.error("Failed to create slot:", err);
      setModalVisible({
        visible: true,
        message: err.data?.message || "An error occurred while creating the slot",
        onClose: () => setModalVisible({ ...modalVisible, visible: false }),
      });
    }
  };

  if (isLoading) return <p className="text-gray-800 dark:text-gray-300">Loading services...</p>;
  if (isError) return <p className="text-red-500 dark:text-red-400">Error loading services.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300">
      <div className="p-5 bg-white dark:bg-gray-800 rounded shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Slot</h1>
        <form onSubmit={handleCreateSlot} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Service Name:</label>
              <select
                value={slotData.service}
                onChange={(e) => setSlotData({ ...slotData, service: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="" disabled>
                  Select a service
                </option>
                {servicesData?.data?.map((service: any) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Date:</label>
              <input
                type="date"
                value={slotData.date}
                onChange={(e) => setSlotData({ ...slotData, date: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Start Time:</label>
              <input
                type="time"
                value={slotData.startTime}
                onChange={(e) => setSlotData({ ...slotData, startTime: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block font-medium">End Time:</label>
              <input
                type="time"
                value={slotData.endTime}
                onChange={(e) => setSlotData({ ...slotData, endTime: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
          >
            Create Slot
          </button>
        </form>
      </div>

      {modalVisible.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Notification</h2>
            <p className="mb-4">{modalVisible.message}</p>
            <button
              onClick={modalVisible.onClose}
              className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSlot;
