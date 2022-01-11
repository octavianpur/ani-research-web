import { Avatar, Icon } from "@mui/material";
import React, { useContext } from "react";
import AuthContext from "../store/AuthContext";
import UserContext from "../store/UserContext";
import "./DashHeader.css";

const DashHeader = () => {
  const authContext = useContext(AuthContext);
  const userContext = useContext(UserContext);

  const handlePurgeUser = () => {
    authContext.setToken("");
    authContext.setRefreshToken("");
    authContext.setTokenExpAt(0);
    authContext.setRefreshTokenExpAt(0);
    userContext.setUser({
      id: undefined,
      roles: [],
      displayName: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      profileImageUrl: undefined,
    });
  };

  return (
    <div className="header-wrapper">
      <Avatar alt={userContext.displayName} src={userContext.profileImageUrl} />
      <p>{userContext.displayName}</p>
      <p>{userContext.email}</p>
      <Icon
        sx={{ fontSize: 16 }}
        className="logout-icon"
        onClick={handlePurgeUser}
      >
        logout
      </Icon>
    </div>
  );
};

export default DashHeader;
