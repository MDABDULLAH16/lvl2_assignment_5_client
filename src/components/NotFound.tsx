import React from "react";
import { useNavigate } from "react-router-dom"; // Assumes you're using React Router
import notFoundImage from "./../assets/404_mim1.jpg";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-4 animate-fadeIn">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="w-full max-w-md mb-8 object-contain animate-fadeIn delay-100"
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-4 animate-fadeIn delay-200">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-lg max-w-xl mb-6 animate-fadeIn delay-300">
        Oops! The page you are looking for does not exist. You may have mistyped
        the address or the page has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-500 transition duration-300 animate-fadeIn delay-400"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
