import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { INITIAL_ROUTES } from "../utils/consts";
import { Flats } from "../components/Flats/Flats";
import { Manager } from "../components/Manager/Manager";
import { Layout } from "../layout/Layout";
import { SignIn } from "../pages/SignIn";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "./ProtectedRoute";

function AppRoutes() {
  const { jwt } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path={INITIAL_ROUTES.INITIAL.PATH}
        element={
          <ProtectedRoute
            children={<Navigate replace to="/signin" />}
            isAllowed={!jwt}
            fallbackPath="/signin"
          />
        }
      />
      <Route
        path="/signin"
        element={
          <ProtectedRoute
            children={<SignIn />}
            isAllowed={!jwt}
            fallbackPath="/"
          />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute
            children={<Layout />}
            isAllowed={jwt}
            fallbackPath="/signin"
          />
        }
      >
        <Route element={<Navigate replace to="/flats" />} index />
        <Route path="flats" element={<Flats />} />
        <Route path="managers" element={<Manager />} />
      </Route>

      <Route path={INITIAL_ROUTES.NOT_FOUND.PATH} element={<div>Error</div>} />
    </Routes>
  );
}

export default AppRoutes;
