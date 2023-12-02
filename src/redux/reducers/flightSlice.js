// src/redux/reducers/exampleReducer.js
import { createSlice } from "@reduxjs/toolkit";

const flightSlice = createSlice({
  name: "flights",
  initialState: {
    flight: null,
  },
  reducers: {
    storeFlights: (state, action) => {
      console.log("sebkjser", state, action.payload);
      state.flight = action.payload;
    },
    removeFlights: (state) => {
      state.flight = null;
    },
  },
});

export const { storeFlights, removeFlights } = flightSlice.actions;
export default flightSlice.reducer;
