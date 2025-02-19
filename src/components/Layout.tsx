import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const pathname = useLocation().pathname;
 const  isAdmin = pathname.includes("admin",);
 const  isUser = pathname.includes("user-dashboard",);
  return (
    <div>
     {isAdmin || isUser?"": <Navbar></Navbar>}
      <Outlet></Outlet>
      {isAdmin || isUser?"": <Footer></Footer>}
    </div>
  );
};

export default Layout;
