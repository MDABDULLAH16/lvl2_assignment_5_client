/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  useGetAllServicesQuery,
  useGetAllSlotQuery,
  useUpdateSlotMutation,
} from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";

interface SlotData {
  _id: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
}

const SlotManagement: React.FC = () => {
  const { data: slotsData, isLoading } = useGetAllSlotQuery({});
  const { data: servicesData } = useGetAllServicesQuery({});
  const [updateSlot] = useUpdateSlotMutation();
  const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    message: "",
    onConfirm: () => {},
  });

  const navigate = useNavigate();

  if (isLoading) {
    return <p className="text-gray-800 dark:text-gray-300">Loading slots...</p>;
  }

  const getServiceName = (serviceId: string) => {
    const service = servicesData?.data?.find((s: any) => s._id === serviceId);
    return service ? service.name : "Unknown Service";
  };

  const openModal = (slot: SlotData) => {
    setSelectedSlot(slot);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedSlot(null);
    setModalVisible(false);
  };

  const handleUpdateSlot = async () => {
    if (selectedSlot) {
      try {
        const payload = {
          id: selectedSlot._id,
          data: {
            date: selectedSlot.date,
            startTime: selectedSlot.startTime,
            endTime: selectedSlot.endTime,
            isBooked: selectedSlot.isBooked,
          },
        };

        await updateSlot(payload).unwrap();
        setConfirmModal({
          visible: true,
          message: "Slot updated successfully!",
          onConfirm: () => {
            setConfirmModal({ ...confirmModal, visible: false });
            closeModal();
          },
        });
      } catch (error) {
        console.error("Error updating slot:", error);
        setConfirmModal({
          visible: true,
          message: "Failed to update slot. Please try again.",
          onConfirm: () => setConfirmModal({ ...confirmModal, visible: false }),
        });
      }
    }
  };

  return (
    <div className="p-5 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-4">Slot Management</h1>
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => navigate("/create-slot")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create New Slot
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {slotsData?.data?.map((slot: SlotData) => (
          <div
            key={slot._id}
            className="border rounded p-4 shadow-md bg-white dark:bg-gray-800 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold mb-2 dark:text-gray-200">
                {getServiceName(slot.service)}
              </h2>
              <p className="text-sm">Date: {slot.date}</p>
              <p className="text-sm">Start Time: {slot.startTime}</p>
              <p className="text-sm">End Time: {slot.endTime}</p>
              <p
                className={`text-sm font-bold ${
                  slot.isBooked === "booked"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                Status: {slot.isBooked === "booked" ? "Booked" : "Available"}
              </p>
            </div>
            <button
              onClick={() => openModal(slot)}
              disabled={slot.isBooked === "booked"}
              className={`mt-4 px-4 py-2 text-white rounded ${
                slot.isBooked === "booked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 transition"
              }`}
            >
              Update Slot
            </button>
          </div>
        ))}
      </div>

      {/* Update Slot Modal */}
      {modalVisible && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-gray-300 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Slot</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateSlot();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium">Date:</label>
                <input
                  type="date"
                  value={selectedSlot.date}
                  onChange={(e) =>
                    setSelectedSlot({ ...selectedSlot, date: e.target.value })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium">Start Time:</label>
                <input
                  type="time"
                  value={selectedSlot.startTime}
                  onChange={(e) =>
                    setSelectedSlot({
                      ...selectedSlot,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium">End Time:</label>
                <input
                  type="time"
                  value={selectedSlot.endTime}
                  onChange={(e) =>
                    setSelectedSlot({
                      ...selectedSlot,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block font-medium">Status:</label>
                <select
                  value={selectedSlot.isBooked}
                  onChange={(e) =>
                    setSelectedSlot({
                      ...selectedSlot,
                      isBooked: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  disabled={selectedSlot.isBooked === "booked"}
                >
                  <option value="available">Available</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded w-full hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;
