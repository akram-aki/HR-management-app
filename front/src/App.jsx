import { User } from "./User";
import Login from "./components/loginPage/Index";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <>
      <User>
        <Login />
      </User>
    </>
  );
}

export default App;
