import { createSlice } from "@reduxjs/toolkit";
import { getFlats } from "../actions/flats";

const initialState = {
  flats: [],
};

const apartmentsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: {
    [getFlats.fulfilled]: (state, action) => {
      state.flats = action.payload;
    },
  },
});

export default apartmentsSlice.reducer;
