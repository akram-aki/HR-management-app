import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export default function Overview() {
  const [absences, setAbsences] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    axios.post("/fetchPendingAbsences", { token }).then((res) =>
      setAbsences(() => {
        const set = new Set();
        if (!res.data) {
          return [];
        }
        const newItems = res.data.filter((item) => {
          if (set.has(item.id)) {
            return false;
          }
          set.add(item.id);
          return true;
        });
        return newItems;
      })
    );
  }, []);
  function handleState(state, employee_id) {
    const token = Cookies.get("token");
    axios
      .post("/updateJustificationState", { state, employee_id, token })
      .then(() => {
        alert("sucess");
      });
  }
  return (
    <>
      {absences.length > 0 ? (
        absences.map((absence, key) => (
          <div key={key} className="border p-3 rounded-sm shadow-md ">
            <p>{absence.employee_name}</p>
            <p>{absence.date}</p>
            <img src={absence.justification_photo_url} alt="photo" />
            <button
              onClick={(e) => handleState("accepted", absence.employee_id)}
              className="border p-2 mr-4 bg-green-400"
            >
              approve
            </button>
            <button
              onClick={(e) => handleState("rejected", absence.employee_id)}
              className="border p-2 mr-4 bg-red-400"
            >
              reject
            </button>
          </div>
        ))
      ) : (
        <div>No pending absences</div>
      )}
    </>
  );
}
