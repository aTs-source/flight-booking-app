"use client";

// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const router = useRouter();

  if (!isAuthenticated) {
    setTimeout(() => {
      router.replace("/login");
      console.log("route to login");
    }, 2000);
    return null;
  }

  return children;
};

export default ProtectedRoute;
