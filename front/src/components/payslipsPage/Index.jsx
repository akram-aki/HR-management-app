import { useState } from "react";
import csvIcon from "./csvIcon.svg";
import pdfIcon from "./pdfIcon.svg";
import filterIcon from "./filterIcon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PayslipsTable from "./PayslipsTable";
import navigation from "../navigation";
const payslipsData = [
  {
    "date": "01/01/2021",
    "salaireDeBase": "100000",
    "retenuSecluSLE": "5000",
    "panier": "10000",
    "transport": "5000",
    "retenuIRG": "2000",
    "downloadLink": "http://localhost:8000/payslips/1"
  },
  {
    "date": "01/01/2021",
    "salaireDeBase": "100000",
    "retenuSecluSLE": "5000",
    "panier": "10000",
    "transport": "5000",
    "retenuIRG": "2000",
    "downloadLink": "http://localhost:8000/payslips/1"
  }
  ,
  {
    "date": "04/01/2021",
    "salaireDeBase": "100000",
    "retenuSecluSLE": "5000",
    "panier": "10000",
    "transport": "5000",
    "retenuIRG": "2000",
    "downloadLink": "http://localhost:8000/payslips/1"
  }


]

export default function PayslipsPage() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  };



  return (

    <div className=" ">
      {navigation("payslips")}

      <h1 className="text-4xl">Payslip Overview</h1>
      <div className="flex mt-6 gap-6 items-center">
        <img src={filterIcon} className="w-6 h-6" />
        <h1 className="text-lg">From</h1>
        <DatePicker selected={startDate} onChange={
          date => setStartDate(date)
        } />
        <h1 className="text-lg">To</h1>
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <div className="bg-[#D9D9D9] px-5 my-4">
        <PayslipsTable startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
}
