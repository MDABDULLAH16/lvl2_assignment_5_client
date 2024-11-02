import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const handleSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    onSelectSlot(slotId); // Pass selected slot to parent
  };

  return (
    <div>
      <Select value={selectedSlot} onValueChange={handleSelect}>
        <SelectTrigger className="w-[220px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select a Slot" />
        </SelectTrigger>
        <SelectContent className="max-h-48 overflow-y-auto bg-white border border-gray-200 shadow-md rounded-md">
          {slotData.map((slot) => (
            <SelectItem key={slot._id} value={slot._id}>
              {`${slot.date} - ${slot.startTime}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Slots;
