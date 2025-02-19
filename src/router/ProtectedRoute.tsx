import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "admin" | "user"; // Define role-based protection
}

const ProtectedRoute = ({ children, requiredRole = "user" }: ProtectedRouteProps) => {
  const user = useAppSelector((state: RootState) => state?.userDetails?.userDetails);
  const location = useLocation();

  if (!user) {
    // Redirect if not logged in
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole === "admin" && user.role !== "admin") {
    // Redirect non-admin users trying to access admin routes
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
