import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait until Clerk finishes loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
