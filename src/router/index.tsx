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
        element: (
          <ProtectedRoute>
            <Services></Services>{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking/:_id",
        element: <Booking></Booking>,
      },
      {
        path: "/service-details/:_id",
        element: (
          <ProtectedRoute>
            <ServiceDetails></ServiceDetails>{" "}
          </ProtectedRoute>
        ),
      },
      { path: "/admin-panel", element: <AdminPanel></AdminPanel> },
      {
        path: "/update-service/:_id",
        element: <UpdateService></UpdateService>,
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
