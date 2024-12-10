import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const userContext = createContext({});

export function User({ children }) {
  const [username, setusername] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!username) {
      const { token } = Cookies.get();
      axios
        .post("/profile", {
          token,
        })
        .then((response) => {
          console.log(response.data);
          setusername(response.data.username);
          setId(response.data.id);
        });
    }
  }, []);

  return (
    <userContext.Provider value={{ username, id }}>
      {children}
    </userContext.Provider>
  );
}
