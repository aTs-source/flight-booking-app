"use client";

import React from "react";
import ProtectedRoute from "../ProtectedRoute";

function index() {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
}

export default index;
