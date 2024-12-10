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
        userName,
        password,
      })
      .then((result) => {
        Cookies.set("token", result.data, { expires: 1 });
        window.location.reload();
      })
      .catch((e) => alert("wrong credentials"));
  }
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      <div className="fixed bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto z-20 border rounded-xl p-4 shadow-md ">
        <button onClick={props.toggle} className="right-0 top-0  z-50 fixed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>{" "}
        <form
          onSubmit={handleLogin}
          className="flex p-10 text-black flex-col items-center gap-5"
        >
          <label className="flex flex-col items-center">
            User name
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border p-1 rounded-xl w-auto shadow-md"
            />
          </label>
          <label className="flex flex-col items-center">
            Password
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" border p-1 rounded-xl w-auto shadow-md"
            />
          </label>

          <button
            type="submit"
            className="border shadow-md rounded-2xl bg-ELECT p-2 text-white  transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
