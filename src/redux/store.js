"use client";

// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import exampleSlice from "./reducers/exaple-slice";
import userSlice from "./reducers/userSlice";
import flightSlice from "./reducers/flightSlice";

const store = configureStore({
  reducer: {
    // Our reducers go here
    example: exampleSlice,
    user: userSlice,
    flight: flightSlice,
  },
});

export default store;
