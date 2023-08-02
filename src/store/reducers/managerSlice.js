import { createSlice } from "@reduxjs/toolkit";
import { getManagers } from "../actions/managers";

const initialState = {
  managers: [],
};

const managerSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {},
  extraReducers: {
    [getManagers.fulfilled]: (state, action) => {
      state.managers = action.payload;
    },
  },
});

export default managerSlice.reducer;
