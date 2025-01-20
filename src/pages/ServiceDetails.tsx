import React, { useState } from "react";
import Slots from "@/components/Slots";
import { useGetSingleServiceQuery, useGetSlotQuery } from "@/redux/api/baseApi";
import { TService } from "@/types/TServices";
import { Link, useParams } from "react-router-dom";

const ServiceDetail: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const { data: services } = useGetSingleServiceQuery(_id!);
  const { data: slotData } = useGetSlotQuery(_id!);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const service: TService | undefined = services?.data;

  const handleSelectSlot = (slotId: string) => {
    setSelectedSlotId(slotId);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          {service?.image && (
            <img
              src={service.image}
              alt={service.name}
              className="rounded-lg shadow-lg max-h-96 w-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service?.name}
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ${service?.price}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Duration:
            <span className="font-medium">
              {service?.duration || "N/A"} minutes
            </span>
          </p>
          <p className="text-gray-700 text-md mt-4">{service?.description}</p>

          {/* Pass slotData to Slots component */}
          {slotData?.data && (
            <Slots slotData={slotData.data} onSelectSlot={handleSelectSlot} />
          )}

          <Link to={`/booking/${_id}`}>
            <button
              className={`mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md ${
                selectedSlotId ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!selectedSlotId} // Disable if no slot is selected
            >
              Book This Service
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
