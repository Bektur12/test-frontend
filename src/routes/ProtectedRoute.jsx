import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  children,
  fallbackPath = "/signin",
}) => {
  if (!isAllowed) {
    return <Navigate to={fallbackPath} />;
  }
  return children;
};
