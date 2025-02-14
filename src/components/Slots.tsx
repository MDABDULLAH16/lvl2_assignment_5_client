import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { setSlot } from "@/redux/features/bookingSlice";

interface Slot {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface SlotsProps {
  slotData: Slot[];
  onSelectSlot: (slotId: string) => void;
}

const Slots: React.FC<SlotsProps> = ({ slotData, onSelectSlot }) => {
  const dispatch = useDispatch();

  const handleSelect = (slotId: string) => {
    onSelectSlot(slotId);

    // Find the selected slot from slotData
    const selectedSlotData = slotData.find((slot) => slot._id === slotId);

    if (selectedSlotData) {
      dispatch(
        setSlot({
          id: selectedSlotData._id,
          date: selectedSlotData.date,
          startTime: selectedSlotData.startTime,
          endTime: selectedSlotData.endTime,
          serviceId: "",
          isBooked: "",
        })
      );
    }
  };

  return (
    <div>
      {/* Show a message if no slots are available */}
      {slotData.length === 0 ? (
        <p className="text-gray-500">No slots available</p>
      ) : (
        <Select onValueChange={handleSelect} aria-label="Select a time slot">
          <SelectTrigger className="w-[220px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select a Slot" />
          </SelectTrigger>
          <SelectContent className="max-h-48 overflow-y-auto bg-white border border-gray-200 shadow-md rounded-md">
            {slotData.map((slot) => (
              <SelectItem
                key={slot._id}
                value={slot._id}
                aria-selected={slot._id === slotData[0]?._id} // Accessibility
              >
                {`${slot.date} - ${slot.startTime}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default Slots;
