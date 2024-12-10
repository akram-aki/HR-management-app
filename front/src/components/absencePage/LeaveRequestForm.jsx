import { useContext, useState } from "react";
import { userContext } from "../../User";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";

export default function LeaveRequestForm() {
  const [date, setDate] = useState(new Date()); //
  const [selected, setSelected] = useState("");
  const [photoLink, setPhotoLink] = useState("");
  const { username, id } = useContext(userContext);

  const handleCheckboxClick = (e) => {
    const value = e.target.name;
    setSelected(selected === value ? "" : value); // Toggle selection
  };
  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    data.append("id", id);

    axios
      .post("/uploadPhoto", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        setPhotoLink("http://localhost:8000/Routes/uploads/" + response.data);
      })
      .catch(() => alert("didnt work"));
  }

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
    const { token } = Cookies.get();
    if (token && date && selected && photoLink && id && username) {
      axios.post("/requestAbsence", {
        token,
        date,
        selected,
        photoLink,
        id,
        username,
      });
    }
  };
  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex px-10 text-black flex-col items-start h-full  gap-5 justify-start"
        >
          <h2 className="font-bold text-2xl mt-7">Request New Absence</h2>

          <div className="grid">
            <p className="font-semibold text-lg">Absence Type</p>
            <div className="flex">
              <label className="p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="sick"
                  checked={selected === "sick"}
                  onChange={handleCheckboxClick}
                />
                <span>Sick Leave</span>
              </label>

              <label className="p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="Vacation"
                  checked={selected === "Vacation"}
                  onChange={handleCheckboxClick}
                />
                <span>Vacation</span>
              </label>

              <label className="p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="Personal"
                  checked={selected === "Personal"}
                  onChange={handleCheckboxClick}
                />
                <span>Personal Day</span>
              </label>
              <label className="p-4 flex rounded-xl gap-2 items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="Other"
                  checked={selected === "Other"}
                  onChange={handleCheckboxClick}
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <p className="text-lg font-semibold">Date</p>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
          {preInput("Proof", "upload a screenshot of the proof")}
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
              className="  flex bg-white  gap-2 items-center  justify-center  w-32 h-32 cursor-pointer border border-gray-300 p-2 rounded-lg  hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
          {photoLink ? (
            <img src={photoLink} alt="image" />
          ) : (
            <div>loading...</div>
          )}
          <button
            type="submit"
            className="border shadow-md bg-[#78e56c] rounded-sm bg-ELECT px-6 py-2 "
          >
            submit absence request
          </button>
        </form>
      </div>
    </>
  );
}
