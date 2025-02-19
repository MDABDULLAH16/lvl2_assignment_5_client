import { useState, useMemo } from "react";

import { useGetAllServicesQuery } from "@/redux/api/baseApi";
import { TService } from "@/types/TServices";
import ServiceCard from "@/components/ServiceCard";

const Services = () => {
  const { data: servicesData, isLoading, isError } = useGetAllServicesQuery({});

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

    let filtered = [...servicesData.data];

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((service: TService) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "asc") {
      filtered = filtered.sort((a: TService, b: TService) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = filtered.sort((a: TService, b: TService) => b.price - a.price);
    }

    return filtered;
  }, [servicesData, searchTerm, sortOrder]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-2xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
          Loading Services...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50 dark:bg-red-900">
        <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
          Error: Failed to load Featured Services
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto dark:bg-gray-950 dark:text-gray-200 p-4">
      {/* Search, Filter, and Sorting Controls */}
      <div className="mb-4 w-full flex flex-col md:flex-row justify-between m-2  space-y-2 md:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services by name"
          className="p-3 border sm:w-2/4 w-full border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
        />

        {/* Sorting Options */}
        <select
          value={sortOrder || ""}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Clear Filter Button */}
        <button
          onClick={clearFilters}
          className="p-3 bg-red-500 dark:bg-red-700 text-white rounded-lg shadow-md hover:bg-red-600 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 transition-all duration-200"
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
