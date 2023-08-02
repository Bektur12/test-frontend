import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { baseAuth } from "./store/reducers/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const autoLogin = () => {
    const token = JSON.parse(localStorage.getItem("AUTH"));
    if (token) {
      dispatch(baseAuth({ jwt: token }));
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
