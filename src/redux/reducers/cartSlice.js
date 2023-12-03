// src/redux/reducers/exampleReducer.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    flight: [],
    bookingReq: null,
  },
  reducers: {
    storeCarts: (state, action) => {
      state.flight.push(action.payload);
    },
    removeCarts: (state) => {
      state.flight = null;
    },
  },
});

export const { storeCarts, removeCarts } = cartSlice.actions;
export default cartSlice.reducer;
