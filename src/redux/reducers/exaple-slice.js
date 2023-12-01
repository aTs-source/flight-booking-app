// src/redux/reducers/exampleReducer.js
import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    // Your initial state goes here
  },
  reducers: {
    // Your reducer functions go here
  },
});

export const { actions, reducer } = exampleSlice;
export default exampleSlice;
