"use client";

// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    router.replace("/login");
    console.log("route to login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
