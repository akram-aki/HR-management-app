import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const userContext = createContext({});

export function User({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!currentUser) {
      const { token } = Cookies.get();
      axios
        .post("/profile", {
          token,
        })
        .then((response) => {
          setCurrentUser(response.data.name);
          setId(response.data.id);
        });
    }
  }, []);

  return (
    <userContext.Provider value={{ currentUser, id }}>
      {children}
    </userContext.Provider>
  );
}
