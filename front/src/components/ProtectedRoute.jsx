import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { userContext } from "../User";

const ProtectedRoute = ({ children, Role }) => {
  const { role } = useContext(userContext);
  if (!role) {
    return <Navigate to="/login" />;
  }

  try {
    if (role === "hr_manager") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  } catch (e) {
    console.error("Error decoding token", e);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
