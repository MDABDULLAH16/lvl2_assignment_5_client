import { useState, useMemo } from "react";

import { useGetAllServicesQuery } from "@/redux/api/baseApi";
import { TService } from "@/types/TServices";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery({});
  // console.log("data", servicesData.data);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  // Helper to clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSortOrder("");
  };

  // Memoized filtering and sorting
  const filteredServices = useMemo(() => {
    if (!servicesData?.data) return [];

    // Create a copy of the services array to avoid mutating the original data
    let filtered = [...servicesData.data]; // Shallow copy of the array

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((service: TService) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered = filtered.sort((a: TService, b: TService) => a.price - b.price); // Ascending price
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a: TService, b: TService) => b.price - a.price); // Descending price
    }

    return filtered;
  }, [servicesData, searchTerm, sortOrder]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Services...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load Featured Services
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Search, Filter, and Sorting Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-around m-4 space-y-2 md:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services by name"
          className="p-3 border sm:w-2/4 w-full border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />

        {/* Sorting Options */}
        <select
          value={sortOrder || ""}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Clear Filter Button */}
        <button
          onClick={clearFilters}
          className="p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          Clear Filters
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 m-4 gap-8 animate-fade-in">
        {filteredServices?.map((service: TService) => (
          <div
            key={service._id}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <ServiceCard key={service._id} {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
