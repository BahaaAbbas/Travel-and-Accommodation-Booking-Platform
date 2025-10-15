import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/features/auth/hooks";
import { selectAuth } from "@/features/auth/authSlectors";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { token, userType } = useAppSelector(selectAuth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userType || "")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
