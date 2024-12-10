import { useState } from "react";
import LeaveRequestForm from "./LeaveRequestForm";
import HistoryComponent from "./HistoryComponent";
export default function AbsencePage() {
  const [butState, setButState] = useState("absenceSummary");
  return (
    <div className="relative  p-20">
      <h1 className="absolute top-5 text-4xl">Absence</h1>
      <div className="grid grid-cols-[1fr_2.5fr]">
        <div className=" flex flex-col gap-8 bg-[#bebebe] p-5">
          <button
            onClick={() => setButState("absenceSummary")}
            className={
              butState === "absenceSummary"
                ? "bg-gray-500 p-5 w-96 h-[10vh]"
                : "bg-[#d9d9d9] p-5 w-96 h-[10vh]"
            }
          >
            Absences Summary
          </button>
          <button
            onClick={() => setButState("requestNewAbsence")}
            className={
              butState === "requestNewAbsence"
                ? "bg-gray-500 p-5 w-96 h-[10vh]"
                : "bg-[#d9d9d9] p-5 w-96 h-[10vh]"
            }
          >
            Request New Absence{" "}
          </button>
          <button
            onClick={() => setButState("absenceHistory")}
            className={
              butState === "absenceHistory"
                ? "bg-gray-500 p-5 w-96 h-[10vh]"
                : "bg-[#d9d9d9] p-5 w-96 h-[10vh]"
            }
          >
            Absences History{" "}
          </button>
        </div>
        <div className="bg-[#d9d9d9] h-[130vh]">
          {butState === "requestNewAbsence" ? (
            <LeaveRequestForm />
          ) : butState === "absenceHistory" ? (
            <HistoryComponent />
          ) : (
            <div>hi</div>
          )}
        </div>
      </div>
    </div>
  );
}
