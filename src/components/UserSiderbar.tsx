import { 
    Users,  HomeIcon, 
    LayoutDashboard, Palette,  
  } from "lucide-react";
  import {  useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  
  import logoLight from "../assets/logo-2.png";
  const UserSidebar = () => {
    //dark mood for logo
    const [darkMode,] = useState(
        localStorage.getItem("theme") === "dark"
      );
    
     
  
    const location = useLocation();
  
    const links = [
      { to: "/", label: "Home", icon: <HomeIcon size={20} /> },
      { to: "/user-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { to: "/all-services", label: "All Services", icon: <Palette size={20} /> },
      { to: "/my-booking", label: "My Bookings", icon: <Users size={20} /> },
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
        </nav>
      </div>
    );
  };
  
  export default UserSidebar;
  