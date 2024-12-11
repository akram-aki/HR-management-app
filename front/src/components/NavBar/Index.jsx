import { useContext } from "react";
import { userContext } from "../../User";
import Cookies from "js-cookie";

export default function Nav() {
  const { username } = useContext(userContext);
  return (
    <nav className="flex justify-around bg-[#d9d9d9] p-5 items-center">
      {username ? (
        <>
          <p className=" cursor-default">
            {"Welcome " + JSON.stringify(username)}
          </p>
          <button
            onClick={() => {
              Cookies.set("token", "");
            }}
            className="bg-[#cc1b1b] text-white px-3 font-light rounded-md p-1"
          >
            Sign out
          </button>
        </>
      ) : (
        <a
          className="bg-[#cc1b1b] text-white px-3 font-light rounded-md p-1"
          href="/login"
        >
          Login
        </a>
      )}
    </nav>
  );
}
