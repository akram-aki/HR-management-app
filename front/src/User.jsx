import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create the context
export const userContext = createContext({});

export function User({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle async loading

  useEffect(() => {
    const token = Cookies.get("token"); // Get token directly

    if (token) {
      axios
        .post("/profile", { token })
        .then((response) => {
          setUser({
            username: response.data.username,
            id: response.data.id,
            role: response.data.role,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user profile", err);
          Cookies.remove("token"); // Remove invalid token
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    // Render a loading state or spinner while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <userContext.Provider value={user}>
      {children}
    </userContext.Provider>
  );
}
