// import { selectCurrentUser } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(
    (state: RootState) => state?.userDetails.userDetails
  );
  // const token = useAppSelector(selectCurrentUser);
  // console.log("token", token);

  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
