import { useContext } from "react";
import { userContext } from "../../User";

export default function HomePage() {
  const { username } = useContext(userContext);
  return (
    <>
      {username && (
        <div className="grid  grid-cols-2">
          <div className=" ml-10 mt-10">
            <h1 className="text-4xl">Home</h1>
            <div className="grid mt-10 gap-5">
              <a href="/absence" className="bg-gray-300 w-96 p-5 rounded-t-xl">
                {" "}
                Absence requests
              </a>

              <a href="/Pay" className="bg-gray-300 w-96  p-5 rounded-t-xl">
                {" "}
                view Payslip
              </a>
              <a
                href="/Contact HR"
                className="bg-gray-300 p-5 w-96  rounded-t-xl"
              >
                {" "}
                Contact HR
              </a>
              <a
                href="/documents"
                className="bg-gray-300 p-5 w-96  rounded-b-xl"
              >
                {" "}
                View Documents
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
