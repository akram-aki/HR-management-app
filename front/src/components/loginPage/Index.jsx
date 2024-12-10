import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/login", {
        username: userName,
        password: password,
      })
      .then((result) => {
        Cookies.set("token", result.data, { expires: 1 });
        window.location.reload();
      })
      .catch((e) => alert("wrong credentials"));
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
