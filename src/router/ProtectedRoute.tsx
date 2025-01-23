import { selectCurrentToken } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
