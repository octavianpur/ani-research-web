import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { User } from '../../interfaces/UserInterfaces'

import userService from '../../services/userService';
import useTokenStatus from "../../utils/useTokenStatus";

import "./Users.css"

const Users = (props:any) => {

    const [ users, setUsers ] = useState<User[]>([]);
    const tokenStatus = useTokenStatus();

    
    useEffect(()=>{
        if(tokenStatus.active){
          const usersResponse = async() => {
            const response = await userService.getUsers({...tokenStatus});
            console.log(response);
            setUsers(response);
          }
          usersResponse();
        }
      },[])



  return (
    <div className="users-wrapper">
      {users.length > 0 &&
        users.map((user, index) => (
            
            <div key={`user-${index}`} className="table-row">
                <p>{user.id}</p>
                <Avatar alt={user.displayName} src={user.profileImageUrl}></Avatar>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <p>{user.role}</p>
              <p>{user.lastLogin}</p>

            </div>
        ))}
    </div>
  );
};

export default Users;
