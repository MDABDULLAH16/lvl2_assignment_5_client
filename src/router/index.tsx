import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Services from "@/pages/Services";
import ProtectedRoute from "./ProtectedRoute";
import ServiceDetails from "@/pages/ServiceDetails";
import Booking from "@/pages/Booking";
import AdminPanel from "@/pages/AdminPanel";
import UpdateService from "@/pages/UpdateService";
import CreateSlot from "@/pages/CreateSlot";
import UserDashboard from "@/pages/UserDashboard";
import UserBooking from "@/pages/UserBooking";
import About from "@/pages/About";

// import AdminPanel from "@/pages/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/booking/:_id",
        element: (
          <ProtectedRoute>
            <Booking></Booking>
          </ProtectedRoute>
        ),
      },
      {
        path: "/service-details/:_id",
        element: (
          <ProtectedRoute>
            <ServiceDetails></ServiceDetails>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-panel",
        element: (
          <ProtectedRoute>
            {" "}
            <AdminPanel></AdminPanel>
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard></UserDashboard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking",
        element: (
          <ProtectedRoute>
            <UserBooking></UserBooking>
          </ProtectedRoute>
        ),
      },
      // { path: "/admin-services", element: <ServiceManagement></ServiceManagement> },
      {
        path: "/create-slot",
        element: (
          <ProtectedRoute>
            {" "}
            <CreateSlot></CreateSlot>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-service/:_id",
        element: (
          <ProtectedRoute>
            {" "}
            <UpdateService></UpdateService>
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/about", element: <About></About> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
