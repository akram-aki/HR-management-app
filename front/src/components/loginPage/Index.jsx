import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/login", {
        username: userName,
        password: password,
      })
      .then((result) => {
        Cookies.set("token", result.data, { expires: 1 });
        navigate("/homePage"); // Replace '/your-new-route' with the desired route
      })
      .catch((e) => alert("wrong credentials"));
  }
  return (
    <div className="absolute bg-[#d9d9d9] w-96 h-96  p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleLogin} className="grid gap-3">
        <label htmlFor="">USERNAME</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder=""
          className="w-full p-2"
        />
        <label htmlFor="">PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=""
          className="w-full p-2"
        />
        <button type="submit" className="bg-green-400 p-2">
          Login
        </button>
      </form>
    </div>
  );
}
