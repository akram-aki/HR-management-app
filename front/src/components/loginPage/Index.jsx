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
        const token = result.data;
        Cookies.set("token", token, { expires: 1 });

        // Decode token to get role
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const role = decodedToken.role;

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/homePage");
        }
      })
      .catch(() => alert("Wrong credentials"));
  }

  return (
    // <div className="absolute bg-[#d9d9d9] w-96 h-96  p-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    //   <form onSubmit={handleLogin} className="grid gap-3">
    //     <label htmlFor="">USERNAME</label>
    //     <input
    //       type="text"
    //       value={userName}
    //       onChange={(e) => setUserName(e.target.value)}
    //       placeholder=""
    //       className="w-full p-2"
    //     />
    //     <label htmlFor="">PASSWORD</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder=""
    //       className="w-full p-2"
    //     />
    //     <button type="submit" className="bg-green-400 p-2">
    //       Login
    //     </button>
    //   </form>
    // </div>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div class="mt-12 flex flex-col items-center">
            <div class="w-full flex-1 mt-8">
              <div class="flex flex-col items-center">
                <h1 className="text-3xl font-semibold mb-8">
                  HR Management App
                </h1>
              </div>

              <div class="my-12 border-b text-center">
                <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"></div>
              </div>

              <div class="mx-auto max-w-xs">
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  onClick={handleLogin}
                  class="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    class="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span class="ml-">Sign In</span>
                </button>
                <p class="mt-6 text-xs text-gray-600 text-center">
                  <a href="#" class="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>
                  and its
                  <a href="#" class="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 bg-green-100 text-center hidden lg:flex"></div>
      </div>
    </div>
  );
}
