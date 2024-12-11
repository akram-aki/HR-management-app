import React, { useContext, useEffect, useState } from "react";
import AbsenceForm from "./AbsenceForm";
import axios from "axios";
import { userContext } from "../../User";
import Cookies from "js-cookie";
const daysAbsented = 7;
const maxDays = 10;
const pendingAbsenceRequests = 2;
export const absenceRequests = [
  {
    id: 1,
    name: "John Doe",
    startDate: "2021-10-01",
    endDate: "2021-10-03",
    status: "Pending",
    type: "Sick Leave",
  },
  {
    id: 2,
    name: "Jane Doe",
    startDate: "2021-10-05",
    endDate: "2021-10-07",
    status: "Approved",
    type: "Annual Leave",
  },
];
function Absences() {
  const { id, attendance } = useContext(userContext);
  return (
    <div>
      <div className="mt-8 flex flex-wrap space-x-0 space-y-2 md:space-x-4 md:space-y-0">
        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2 h-full">
          <h2 className="text-gray-500 text-lg font-semibold pb-1 text-center mx-20">
            Absences Summary
          </h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6" />
          {/* Leave Balance */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold my-4">Leave Balance:&nbsp;</h3>{" "}
            <span className="text-orange-600">
              {attendance.absent}/{maxDays} days remaining.
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ml-6">
              <div
                className="bg-orange-400 h-2.5 rounded-full"
                style={{ width: `${(daysAbsented / maxDays) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-gray-400 h-[0.5px] mb-6" />

          <div className="flex items-center">
            <h3 className="text-lg font-bold my-4">Pending Requests: &nbsp;</h3>
            <span className="text-orange-600">
              {pendingAbsenceRequests} requests awaiting approval.
            </span>
          </div>
          {/* Absence Requests */}
          {absenceRequests.map((request, index) => (
            <div
              key={index}
              className="flex items-center justify-between my-4 p-3 border rounded-lg hover:bg-gray-100"
            >
              <div>
                <h3 className="text-lg font-bold">{request.type}</h3>
                <p className="text-sm text-gray-500">
                  From <span className="text-black">{request.startDate}</span>{" "}
                  until <span className="text-black">{request.endDate}</span>
                </p>
              </div>
              <div className="flex items-center gap-8">
                <p
                  className={`text-sm ${
                    request.status === "Approved"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {request.status}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 bg-white p-4 shadow rounded-lg md:w-1/2 h-full">
          <h2 className="text-gray-500 text-lg font-semibold pb-1 text-center mx-20">
            Request New Absence
          </h2>
          <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6" />
          <AbsenceForm />
        </div>
      </div>
    </div>
  );
}
export default Absences;
