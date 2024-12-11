import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Absences from "./Absences";
import { userContext } from "../../User";
import Payslips from "./Payslips";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const { username } = useContext(userContext);
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Absences />;
      case "Payslips":
        return <Payslips />;
      default:
        return <Absences />;
    }
  };
  return (
    <>
      {username ? (
        <div className="flex flex-col h-screen bg-gray-100">
          {/* Top Navigation Bar */}
          <div className="bg-white shadow w-full p-2 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://www.bing.com/th?id=OIP.EHNAumCpAijVRF2X8cQUMwHaHE&w=146&h=140&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
                alt="Logo"
                className="w-10 h-10 mr-2"
              />
              <h2 className="font-bold text-xl">HR Management</h2>
            </div>
            <div className="space-x-5">
              <button>
                <i className="fas fa-bell text-gray-500 text-lg"></i>
              </button>
              <button>
                <i className="fas fa-user text-gray-500 text-lg"></i>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-wrap">
            {/* Sidebar */}
            <div
              className="p-2 bg-white w-full md:w-60 flex flex-col md:flex"
              id="sideNav"
            >
              <nav>
                <a
                  className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                  href="#"
                  onClick={() => setActiveTab("Overview")}
                >
                  <i className="fas fa-home mr-2"></i>Home
                </a>
                <a
                  className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                  href="#"
                  onClick={() => setActiveTab("Absences")}
                >
                  <i className="fas fa-file-alt mr-2"></i>Absences
                </a>
                <a
                  className="block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white"
                  href="#"
                  onClick={() => setActiveTab("Payslips")}
                >
                  <i className="fas fa-users mr-2"></i>Payslips
                </a>
              </nav>
              <button
                className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto"
                href="#"
                onClick={() => {
                  Cookies.remove("token");
                }}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Log Out
              </button>
              <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mt-2"></div>
              <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">
                Copyright Charikat Dajaj@2024
              </p>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 w-full md:w-1/2">
              {/* Charts */}
              <h1 className="text-3xl font-bold">{activeTab}</h1>
              {renderContent()}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AdminDashboard;
