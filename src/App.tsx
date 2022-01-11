
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./store/AuthContext";

import userService from './services/userService';
import useTokenStatus from "./utils/useTokenStatus";

import { User } from './interfaces/UserInterfaces'

interface Props {

}

const App: React.FC<Props> = (props) => {


  const authContext = useContext(AuthContext);

  const [ users, setUsers ] = useState<User[]>([]);

  const handlePurgeToken = () => {
    authContext.setToken("")
  }
  const tokenStatus = useTokenStatus();

  const handleGetUsers = async () => {
    if(tokenStatus.active){
      const usersResponse = async() => {
        const response = await userService.getUsers({...tokenStatus});
        setUsers(response);
      }
      usersResponse();
    }
  }

  useEffect(()=>{
   
  },[])



  return (
    <div className="dash-wrapper">
      <button onClick={handleGetUsers}>Apasa</button>

      {users.length>0&&users.map((user, index)=><p key={`user-${index}`}>{user.displayName}</p>)}
    </div>
  );
};

export default App;
