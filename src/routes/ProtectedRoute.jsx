import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAllowed,
  Component,
  fallbackPath = "/signin",
}) => {
  if (!isAllowed) {
    return <Navigate to={fallbackPath} />;
  }
  return Component;
};
