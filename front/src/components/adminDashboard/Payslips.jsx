import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
export default function PaymentHandeling() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [inputData, setInputData] = useState([]); // State to track input data
  const [employeeId, setEmployeeId] = useState("");
  const [pay, setPay] = useState({});

  function handleSubmit(e) {
    const token = Cookies.get("token");
    axios
      .post("/employeeSalary", {
        token,
        employeeId,
        inputData,
      })
      .then((res) => {
        setPay(res.data);
      });
  }

  const handleInputChange = (item, value) => {
    setInputData((prevData) => {
      const updatedData = [...prevData];
      const itemIndex = updatedData.findIndex((data) => data.id === item.id);
      if (itemIndex !== -1) {
        updatedData[itemIndex] = { ...updatedData[itemIndex], value };
      } else {
        updatedData.push({
          id: item.id,
          name: item.name,
          value,
          cnas: item.cnas,
          irg: item.irg,
        });
      }
      return updatedData;
    });
  };
  console.log(inputData);

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .post("/getSalaryComponenets", {
        token,
      })
      .then((res) => {
        setItems(() => {
          const set = new Set();
          const newItems = res.data.filter((item) => {
            if (set.has(item.id)) {
              return false;
            }
            set.add(item.id);
            return true;
          });
          return newItems;
        });
      });
  }, []);
  return (
    <div className="grid grid-cols-[1fr_3fr]">
      <div className="overflow-scroll h-96 w-[400px] mt-10">
        {items.map((item) => {
          return (
            <button
              className="flex gap-2 w-full overflow-hidden border m-2 bg-black text-white"
              key={item.id}
              onClick={() => setSelectedItem([...selectedItem, item])}
            >
              <p>{item.name}</p>
              <p>{item.code}</p>
              <p>{item.cnas}</p>
              <p>{item.irg}</p>
            </button>
          );
        })}
      </div>

      <div className="grid w-full relative  text-black overflow-scroll h-[400px]">
        <div className="mt-10 ml-4">
          <label htmlFor="">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            id=""
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="h-10  border shadow-sm"
          />
        </div>
        {selectedItem.map((item, key) => (
          <div key={key} className="h-24 grid m-4 ">
            <label htmlFor="">{item.name}</label>
            <input
              onChange={(e) => handleInputChange(item, e.target.value)} // Update state on change
              className="border p-2"
              type="text"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="border bg-green-400 h-20 px-5 py-2"
        >
          submit
        </button>
      </div>
    </div>
  );
}
