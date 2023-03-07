import React from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const { auth } = React.useContext(AuthContext);
  const location = useLocation();
  const originalLocation = React.useRef<any>();

  if (auth) return children;
  if (!originalLocation.current) {
    originalLocation.current = location;
  }
  return (
    <Navigate to="/login" replace state={{ from: originalLocation.current }} />
  );
};

export default ProtectedRoute;
