"use client";

// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";

import exampleReducer from "./reducers/exaple-slice";

const store = configureStore({
  reducer: {
    // Our reducers go here
    example: exampleReducer,
  },
});

export default store;
