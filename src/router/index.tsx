import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Services from "@/pages/Services";
import ProtectedRoute from "./ProtectedRoute";
import ServiceDetails from "@/pages/ServiceDetails";
import Booking from "@/pages/Booking";
// import AdminPanel from "@/pages/AdminPanel";
import UpdateService from "@/pages/UpdateService";
import CreateSlot from "@/pages/CreateSlot";
import UserDashboard from "@/pages/UserDashboard";
import UserBooking from "@/pages/UserBooking";
import About from "@/pages/About";
import NotFound from "@/components/NotFound";
import AllUserBooking from "@/pages/AllUserBooking";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminHome from "@/pages/admin/AdminHome";
import ServiceManagement from "@/pages/ServiceManagement";
import SlotManagement from "@/pages/SlotManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      // Protected Routes
      {
        path: "/booking/:_id",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/service-details/:_id",
        element: (
          <ProtectedRoute>
            <ServiceDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-booking",
        element: (
          <ProtectedRoute>
            <UserBooking />
          </ProtectedRoute>
        ),
      },

      // Admin Panel (Nested Routes)
      {
        path: "/admin-panel",
        element: (
          <ProtectedRoute requiredRole="admin">
            {/* <AdminPanel /> */}
            <AdminDashboard/>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
               <AdminHome/>
              </ProtectedRoute>
            ),
          },
          {
            path: "all-services",
            element: (
              <ProtectedRoute>
                <ServiceManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "all-services/:_id",
            element: (
              <ProtectedRoute>
                <UpdateService />
              </ProtectedRoute>
            ),
          },
          {
            path: "all-user-bookings",
            element: (
              <ProtectedRoute>
                <AllUserBooking />
              </ProtectedRoute>
            ),
          },
          {
            path: "slots",
            element: (
              <ProtectedRoute>
                <SlotManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-slot",
            element: (
              <ProtectedRoute>
                <CreateSlot />
              </ProtectedRoute>
            ),
          },
         
        ],
      },

      // Catch-all route for 404 pages
      { path: "/*", element: <NotFound /> },
    ],
  },
]);
