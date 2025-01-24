import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_2 from "../assets/logo1.png";

import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUserDetails } from "@/redux/features/userDetailsSlice";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [userDetailsForNav, setUserDetails] = useState(false);

  // const user = useAppSelector((state: RootState) => state.auth.user);
  const userDetailsForNav = useAppSelector(
    (state: RootState) => state?.userDetails.userDetails
  );

  // if (user !== undefined) {

  // }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Handle Logout
  // const handleLogout = () => {
  //   dispatch(clearUser());
  //   navigate("/login");
  // };
  const handleLogout = () => {
    console.log("Before logout:", userDetailsForNav);
    dispatch(clearUserDetails());
    console.log("After logout:", userDetailsForNav);
    navigate("/");
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#0a426b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="h-14 w-auto" src={logo_2} alt="Logo" />
            </Link>
          </div>

          {/* Nav Links (Desktop) on the right */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </Link>

            {/* Conditional Links Based on Role */}
            {userDetailsForNav?.role === "admin" ? (
              <Link
                to="/All-UserBooking"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                User Bookings
              </Link>
            ) : (
              <Link
                to="/my-booking"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                My Bookings
              </Link>
            )}
            {/* Conditional Links Based on Role */}
            {userDetailsForNav?.role === "admin" ? (
              <Link
                to="/admin-panel"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Panel
              </Link>
            ) : (
              <Link
                to="/user-dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                User Dashboard
              </Link>
            )}

            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </Link>

            {userDetailsForNav ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-bold">
                  {userDetailsForNav.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-blue-400">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (Hamburger icon) */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Services
            </Link>

            {/* Conditional Links for Mobile */}
            {userDetailsForNav?.role === "admin" ? (
              <Link
                to="/All-UserBooking"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                User Bookings
              </Link>
            ) : (
              <Link
                to="/my-booking"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                My Bookings
              </Link>
            )}
            {userDetailsForNav?.role === "admin" ? (
              <Link
                to="/admin-panel"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Admin Panel
              </Link>
            ) : (
              <Link
                to="/user-dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                User Dashboard
              </Link>
            )}

            <Link
              to="/about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About Us
            </Link>

            {userDetailsForNav ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-bold">
                  {userDetailsForNav.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-blue-400">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
