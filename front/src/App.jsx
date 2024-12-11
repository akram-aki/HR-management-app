import AdminDashboard from "./components/adminDashboard/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { User } from "./User";
import Login from "./components/loginPage/Index";
import HomePage from "./components/homePage/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import PayslipsPage from "./components/payslipsPage/Index";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <>
      {/* <User> */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/payslips" element={<PayslipsPage />} />

          {/* admin aroute */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="hr_manager">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      {/* </User> */}
    </>
  );
}

export default App;
