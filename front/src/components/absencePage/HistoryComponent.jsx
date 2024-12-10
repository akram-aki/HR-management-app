import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../User";
import Cookies from "js-cookie";

export default function HistoryComponent() {
  const [absence, setAbsences] = useState([]);
  const { id } = useContext(userContext);
  const { token } = Cookies.get();
  useEffect(() => {
    axios
      .post("/fetchAbsences", { id, token })
      .then((response) => {
        if (response.data) {
          setAbsences(() => {
            const set = new Set();
            const newItems = response.data.filter((item) => {
              if (set.has(item.id)) {
                return false;
              }
              set.add(item.id);
              return true;
            });
            return newItems;
          });
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      {absence.map((absence) => (
        <div key={absence.id}>
          <div>{absence.date}</div>
          <div>{absence.reason}</div>
          <div>{absence.status}</div>
        </div>
      ))}
    </div>
  );
}
