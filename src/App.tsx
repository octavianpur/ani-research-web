
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { User } from "./interfaces/UserInterfaces";

import useLocalStorage from "./utils/useLocalStorage";

interface Props {

}

const App: React.FC<Props> = (props) => {

  const [user, setUser] = useLocalStorage<User>("user");

  return (
    <div className="dash-wrapper">
     
    </div>
  );
};

export default App;
