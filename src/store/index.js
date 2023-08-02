import { configureStore } from "@reduxjs/toolkit";
import flastsSlice from "./reducers/dataSlice";
import managerSlice from "./reducers/managerSlice";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    flats: flastsSlice,
    managers: managerSlice,
    auth: authSlice.reducer,
  },
});

export default store;
