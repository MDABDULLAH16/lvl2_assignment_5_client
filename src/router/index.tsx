import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Services from "@/pages/Services";
import ProtectedRoute from "./ProtectedRoute";
import ServiceDetails from "@/pages/ServiceDetails";
import Booking from "@/pages/Booking";

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
        path: "/booking",
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
            <ServiceDetails></ServiceDetails>{" "}
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
    ],
  },
]);
