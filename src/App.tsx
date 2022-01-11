import "./App.css";


import { Routes, Route } from "react-router-dom";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import Users from "./components/Users";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";


interface Props {}

const App: React.FC<Props> = (props) => {

  return (
    <div className="app-wrapper">
      <div className="menu-wrapper">
        <MainMenu></MainMenu>
      </div>
      <div className="content-wrapper">
        <div className="main-header">
          <DashHeader></DashHeader>
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/terms" element={<Terms></Terms>}></Route>
            <Route path="/gdpr" element={<Gdpr></Gdpr>}></Route>
            <Route
              path="/"
              element={<Users/>}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
