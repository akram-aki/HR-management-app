import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Create the context
export const userContext = createContext({});

export function User({ children }) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // To handle async loading
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const token = Cookies.get("token"); // Get token directly

    const fetchUserProfile = async () => {
      try {
        const response = await axios.post("/profile", { token });
        setUsername(response.data.username);
        setRole(response.data.role);
        setId(response.data.id);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
        Cookies.remove("token"); // Remove invalid token
      } finally {
        setLoading(false);
      }
    };

    const fetchAttendance = async () => {
      try {
        const res = await axios.post("/fetchThisMonthAttendance", {
          id: 1, // Replace with dynamic user ID if needed
          token,
          month: 6,
          year: 2024,
        });
        setAttendance(res.data);
      } catch (err) {
        console.error("Failed to fetch attendance", err);
      }
    };

    if (token) {
      if (!username) {
        fetchUserProfile();
      }
      fetchAttendance();
    } else {
      setLoading(false);
    }
  }, []); // Add `user` as a dependency

  if (loading) {
    // Render a loading state or spinner while fetching user data
    return <div>Loading...</div>;
  }

  return (
    <userContext.Provider value={{ username, role, id, attendance }}>
      {" "}
      {/* Use an object */}
      {children}
    </userContext.Provider>
  );
}
