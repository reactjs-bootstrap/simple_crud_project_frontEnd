import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      jwtDecode(token); // Verify token
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return null; // or a spinner/loading

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
