import React from "react";
import { Link } from "react-router-dom";

const OfferedSection: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-[url('https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhciUyMHdhc2h8ZW58MHx8MHx8fDI%3D')] dark:bg-[url('https://images.unsplash.com/photo-1552930294-6b595f4c2974?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhciUyMHdhc2h8ZW58MHx8MHx8fDI%3D')] bg-cover bg-center">
      {/* Dark Overlay */}
      <div className="hero-overlay bg-black bg-opacity-40 dark:bg-opacity-60"></div>

      <div className="hero-content text-center text-gray-200 dark:text-gray-100">
        <div className="">
          <h1 className="mb-5 text-5xl font-bold text-white dark:text-gray-300">
          Your Car Deserves the Best !
          </h1>
          <p className="mb-5 text-lg text-gray-300 dark:text-gray-400">
            Are you looking for car washing services? We provide the best 
            services tailored for you. Check out our offerings now!
          </p>
          <Link to="/services">
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-all">
            Book a Wash Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferedSection;
