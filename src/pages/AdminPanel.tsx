import React, { useState } from "react";
import ServiceManagement from "./ServiceManagement";
import SlotManagement from "./SlotManagement";
import UserManagement from "./UserManagement";
// import ServiceManagement from "./ServiceManagement";
// import SlotManagement from "./SlotManagement";
// import UserManagement from "./UserManagement";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Admin Panel
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-4">
        {["services", "slots", "users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 mx-2 text-white font-medium rounded ${
              activeTab === tab
                ? "bg-blue-600"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "services" && <ServiceManagement />}
        {activeTab === "slots" && <SlotManagement />}
        {activeTab === "users" && <UserManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
