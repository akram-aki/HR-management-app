// import React from "react";
// import { Navigate } from "react-router-dom";
// import * as jwt_decode from "jwt-decode";
// import Cookies from "js-cookie";

// const ProtectedRoute = ({ children, role }) => {
//   const token = Cookies.get("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   try {
//     const decoded = jwt_decode(token);

//     if (decoded.role !== role) {
//       return <Navigate to="/" />;
//     }

//     return children;
//   } catch (e) {
//     console.error("Error decoding token", e);
//     return <Navigate to="/login" />;
//   }
// };

// export default ProtectedRoute;
