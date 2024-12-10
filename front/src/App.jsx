import AdminDashboard from "./components/adminDashboard/Index";
import ProtectedRoute from "./components/ProtectedRoute";
import { User } from "./User";
import Login from "./components/loginPage/Index";
import HomePage from "./components/homePage/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/NavBar/Layout";
import AbsencePage from "./components/absencePage/Index";
import PayslipsPage from "./components/payslipsPage/Index";

function App() {
  return (
    <User>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

         
          <Route
            path="/"
            element={
              <ProtectedRoute role="user">
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/absence" element={<AbsencePage />} />
            <Route path="/payslips" element={<PayslipsPage />} />
          </Route>

          
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </User>
  );
}

export default App;
