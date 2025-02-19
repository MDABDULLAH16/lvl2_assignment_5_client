import { 
  Users, ClipboardList, HomeIcon, 
  LayoutDashboard, Palette, BetweenHorizontalStart, 
  LogOut
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import logoDark from "../assets/logo1.png";
import logoLight from "../assets/logo-2.png";
import { useAppDispatch } from "@/redux/hooks";
import { clearUserDetails } from "@/redux/features/userDetailsSlice";

const AdminSidebar = () => {
  const [darkMode] = useState(localStorage.getItem("theme") === "dark");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(clearUserDetails());
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home", icon: <HomeIcon size={20} /> },
    { to: "/admin-panel/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/admin-panel/all-services", label: "All Services", icon: <Palette size={20} /> },
    { to: "/admin-panel/all-user-bookings", label: "All Bookings", icon: <Users size={20} /> },
    { to: "/admin-panel/slots", label: "Slot Management", icon: <BetweenHorizontalStart size={20} /> },
    { to: "/admin-panel/create-slot", label: "Create Slot", icon: <ClipboardList size={20} /> },
  ];

  return (
    <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg p-4 transition-colors">
      <div className="flex items-center justify-center mb-2">
        <Link to="/" className="flex-shrink-0">
          <img className="h-12 w-auto" src={darkMode ? logoLight : logoLight} alt="SparkWave" />
        </Link>
      </div>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-2 px-4 py-2 rounded transition 
              ${
                location.pathname === link.to
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded transition bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 mt-3"
        >
          <LogOut size={20} /> Log Out
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
