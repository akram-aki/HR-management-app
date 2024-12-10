import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const userContext = createContext({});

export function User({ children }) {
  const [username, setusername] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (!username) {
      const { token } = Cookies.get();
      axios
        .post("/profile", {
          token,
        })
        .then((response) => {
          setusername(response.data.username);
          setId(response.data.id);
          setRole(response.data.role);
        });
    }
  }, []);

  return (
    <userContext.Provider value={{ username, id, role }}>
      {children}
    </userContext.Provider>
  );
}
