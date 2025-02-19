import { TService } from "@/types/TServices";
import React from "react";
import { Link } from "react-router-dom";

const FeaturedCard: React.FC<TService> = ({
  _id,
  name,
  image,
  duration,
  price,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
      <figure className="relative w-full h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold py-1 px-2 rounded">
          NEW
        </div>
      </figure>
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 dark:text-gray-300 mb-2">
          {name}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 truncate">
          {description}
        </p>
        <div className="flex justify-between items-center space-x-1">
          <span className="text-lg font-semibold text-blue-500 dark:text-blue-400">
            ${price}
          </span>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-lg">
            Time: {duration}
          </span>
          <div className="card-actions">
            <Link
              to={`/service-details/${_id}`}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 text-white md:py-2 px-2 py-1 md:px-3 rounded-lg shadow-inner focus:outline-none transition ease-in-out duration-150"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
