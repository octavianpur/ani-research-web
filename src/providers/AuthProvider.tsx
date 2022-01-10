import React, { useState, useEffect} from "react";
import useLocalStorage, {
  getStorageFieldValue,
} from "../utils/useLocalStorage";
import auth from "../services/authService";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SignUpResponse } from "../interfaces/AuthInterfaces";
import SignUp from "../pages/SignUp";
import Terms from "../pages/Terms";
import Gdpr from "../pages/Gdpr";

interface Props {}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const [dataLoaded, setDataLoaded] = useState(false);
  const [appData, setAppData] = useState<SignUpResponse | undefined>();
  const [authUrl, setAuthUrl] = useState("");
  const [token, setToken] = useLocalStorage("token", "");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [tokenExpAt, setTokenExpAt] = useLocalStorage("tokenExpAt", 0);
  const [refreshTokenExpAt, setRefreshTokenExpiresAt] = useLocalStorage(
    "refreshTokenExpAt",
    0
  );
  const [user, setUser] = useLocalStorage("user");
  const params = new URLSearchParams(document.location.search);
  const googleState = params.get("state");

  useEffect(() => {
    if (!getStorageFieldValue("token") && !googleState) {
      const getAuthUrl = async () => {
        const response = await auth.getAuthUrl();
        setAuthUrl(response.authUrl);
      };
      getAuthUrl();
    }
  }, [token, googleState]);

  useEffect(() => {
    if (googleState && params.get("code")) {
      const signIn = async () => {
        const response = await auth.signIn(params.get("code"));
        if (response) {
          setAppData(response);
          setDataLoaded(true);
          navigate("/");
        }
      };
      signIn();
    }
  }, [googleState]);

  useEffect(() => {
    if (appData?.token) {
      setToken(appData?.token.access);
      setRefreshToken(appData.token.refresh);
      setTokenExpAt(
        new Date().getTime() + appData.token.accessExpiresIn * 1000
      );
      setRefreshTokenExpiresAt(
        new Date().getTime() + appData.token.refreshExpiresIn * 1000
      );
    }
    if (appData?.user) {
      setUser(appData.user);
    }
  }, [appData]);

  useEffect(() => {
    if (user) {
      // console.log(user);
    }
  }, [user]);

  return (
    <>
      {!token ||
      (refreshTokenExpAt && new Date().getTime() > refreshTokenExpAt) ? (
        <Routes>
          <Route path="/terms" element={<Terms></Terms>}></Route>
          <Route path="/gdpr" element={<Gdpr></Gdpr>}></Route>
          <Route path="/" element={<SignUp authUrl={authUrl}></SignUp>}></Route>
        </Routes>
      ) : (
        children
      )}
    </>
  );
};

export default AuthProvider;
