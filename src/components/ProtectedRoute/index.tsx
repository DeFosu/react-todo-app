import React from "react";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../utils/routes";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to={ROUTES.signIn} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
