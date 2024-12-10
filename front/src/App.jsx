import { User } from "./User";
import Login from "./components/loginPage/Index";
import HomePage from "./components/homePage/Index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/NavBar/Layout";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <>
      <User>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route path="/homePage" element={<HomePage />} />
            </Route>
          </Routes>
        </Router>
      </User>
    </>
  );
}

export default App;
