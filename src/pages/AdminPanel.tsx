import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import ServiceManagement from "./ServiceManagement";
import SlotManagement from "./SlotManagement";
import UserManagement from "./UserManagement";

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-10 bg-white shadow-lg md:w-64 w-64 h-full p-6 transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
        }`}
      >
        <button 
          className="md:hidden absolute top-4 right-4 text-gray-600" 
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Admin Panel</h2>
        <nav className="flex flex-col gap-3">
          {["services", "slots", "users"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
              className={`w-full px-4 py-2 text-left font-medium rounded ${
                activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
            </button>
          ))}
        </nav>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden mb-4 p-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
        
        {/* Tab Content */}
        {activeTab === "services" && <ServiceManagement />}
        {activeTab === "slots" && <SlotManagement />}
        {activeTab === "users" && <UserManagement />}
        
      </div>
    </div>
  );
};

export default AdminPanel;
