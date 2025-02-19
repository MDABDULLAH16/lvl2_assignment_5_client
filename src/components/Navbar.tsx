import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoDark from "../assets/logo1.png";
import logoLight from "../assets/logo-2.png";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUserDetails } from "@/redux/features/userDetailsSlice";
import { Moon, Sun, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userDetails = useAppSelector((state: RootState) => state.userDetails.userDetails);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUserDetails());
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img className="h-12 w-auto" src={darkMode ? logoDark : logoLight} alt="SparkWave" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" />
            <NavLink to="/services" label="Services" />
            {userDetails?.role === "admin" && <NavLink to="/admin-panel/all-user-bookings" label="User Bookings" />}
            {userDetails?.role === "admin" && <NavLink to="/admin-panel/dashboard" label="Admin Panel" />}
            {userDetails?.role === "user" && <NavLink to="/my-booking" label="My Bookings" />}
            {userDetails?.role === "user" && <NavLink to="/user-dashboard" label="Dashboard" />}
            <NavLink to="/about" label="About Us" />

            {/* Dark Mode Toggle */}
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Authentication */}
            {userDetails ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-800 dark:text-gray-200 font-medium">{userDetails.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800 dark:text-gray-200">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg p-4 space-y-4">
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Services" />
          {userDetails?.role === "admin" && <NavLink to="/All-UserBooking" label="User Bookings" />}
          {userDetails?.role === "admin" && <NavLink to="/admin-panel/dashboard" label="Admin Panel" />}
          {userDetails?.role === "user" && <NavLink to="/my-booking" label="My Bookings" />}
          {userDetails?.role === "user" && <NavLink to="/user-dashboard" label="Dashboard" />}
          <NavLink to="/about" label="About Us" />

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Authentication */}
          {userDetails ? (
            <div className="flex flex-col space-y-2">
              <span className="text-gray-800 dark:text-gray-200 font-medium">{userDetails.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition transform hover:scale-105 block"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => (
  <Link to={to} className="text-gray-800 dark:text-gray-200 hover:text-blue-500 transition">
    {label}
  </Link>
);

export default Navbar;
