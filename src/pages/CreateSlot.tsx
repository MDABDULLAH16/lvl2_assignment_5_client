import React, { useState } from "react";
import {
  useCreateSlotMutation,
  useGetAllServicesQuery,
} from "@/redux/api/baseApi";
import { useNavigate } from "react-router-dom";

interface SlotData {
  service: string; // This will store the service ID
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
  const [error, setError] = useState<string | null>(null);

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createSlot(slotData).unwrap(); // Unwrap to handle errors
      console.log("Slot created successfully:", response);
      alert("Slot created successfully");
      navigate("/admin-panel");
    } catch (err: any) {
      console.error("Failed to create slot:", err);
      setError(
        err.data?.message || "An error occurred while creating the slot"
      );
    }
  };

  if (isLoading) return <p>Loading services...</p>;
  if (isError) return <p>Error loading services.</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Create New Slot</h1>
      <form onSubmit={handleCreateSlot} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block font-medium">Service Name:</label>
          <select
            value={slotData.service}
            onChange={(e) =>
              setSlotData({ ...slotData, service: e.target.value })
            }
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Start Time:</label>
          <input
            type="time"
            value={slotData.startTime}
            onChange={(e) =>
              setSlotData({ ...slotData, startTime: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">End Time:</label>
          <input
            type="time"
            value={slotData.endTime}
            onChange={(e) =>
              setSlotData({ ...slotData, endTime: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default CreateSlot;
