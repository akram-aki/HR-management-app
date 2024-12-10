import { useContext, useState } from "react";
import { userContext } from "../../User";

export default function LeaveRequestForm() {
  const [extraInfo, setExtraInfo] = useState("");
  const [date, setDate] = useState(""); //
  const [selected, setSelected] = useState("");
  const { currentUser, id } = useContext(userContext);

  const handleCheckboxClick = (e) => {
    const value = e.target.name;
    setSelected(selected === value ? "" : value); // Toggle selection
  };
  const uploadPhoto = (e) => {
    alert("todo");
  };

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4  ">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, Description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(Description)}
      </>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex p-10 text-black flex-col items-center gap-5 justify-start"
        >
          {preInput("Date", "date of the leave request")}
          <input
            type="text"
            value={date}
            onChange={(ev) => setDate(ev.target.value)}
            placeholder="todooooo"
            className="w-full border p-4 rounded-xl shadow-sm"
          />

          <div className="flex">
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                name="yes"
                checked={selected === "yes"}
                onChange={handleCheckboxClick}
              />
              <span>yes</span>
            </label>
            <label className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                name="no"
                checked={selected === "no"}
                onChange={handleCheckboxClick}
              />
              <span>no</span>
            </label>
          </div>
          {selected === "yes" && (
            <div className="relative mt-2">
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={uploadPhoto}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="fileInput"
                className="  flex  gap-2 items-center  justify-center  w-full h-32 cursor-pointer border border-gray-300 p-2 rounded-lg  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
          )}
          {preInput("Extra info", "extra info about the leave request")}
          <textarea
            rows={5}
            type="text"
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
            className="w-full h-36 border p-4 rounded-xl shadow-sm"
          />
          <button
            type="submit"
            className="border shadow-md rounded-2xl bg-ELECT p-6 "
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
}
