"use client";

// components/ProtectedRoute.js
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  if (!currentUser) {
    router.replace("/login");
    console.log("route to login");
    return null;
  }

  return children;
};

export default ProtectedRoute;
