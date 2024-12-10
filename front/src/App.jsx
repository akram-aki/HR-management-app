import { User } from "./User";
import Login from "./components/loginPage/Index";
import HomePage from "./components/homePage/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/NavBar/Layout";
import axios from "axios";
import AbsencePage from "./components/absencePage/Index";
import PayslipsPage from "./components/payslipsPage/Index";

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <>
      <User>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Layout />}> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/absence" element={<AbsencePage />} />
            <Route path="/payslips" element={<PayslipsPage />} />
            {/* </Route> */}
          </Routes>
        </Router>
      </User >
    </>
  );
}

export default App;
