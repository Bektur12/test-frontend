import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { baseAuth } from "./store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { jwt } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  const autoLogin = () => {
    const token = JSON.parse(localStorage.getItem("AUTH"));
    if (token) {
      dispatch(baseAuth({ jwt: token }));
    }
  };

  useEffect(() => {
    autoLogin();
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  if (location.pathname === "/" && !jwt)
    return <Navigate to="/signin" replace />;
  return <AppRoutes />;
}

export default App;
