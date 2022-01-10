import auth from "../services/authService";
import useLocalStorage from "./useLocalStorage";

const [ token, setToken ] = useLocalStorage("token");
const [ tokenExpAt, setTokenExpAt ] = useLocalStorage("tokenExpAt",0);
const [ refreshTokenExpAt, setRefreshTokenExpAt ] = useLocalStorage("refreshTokenExpAt",0);

export const getTokenStatus = async () => {
  if (
    refreshTokenExpAt &&
    new Date().getTime() < refreshTokenExpAt
  ) {
    if (tokenExpAt && new Date().getTime() < tokenExpAt) {
      return {
        token,
        tokenActive: true,
      };
    } else {
      let response: any;
      try {
        response = await auth.refreshToken();
        const data = await response.data;
          setToken(data.token.access);
          setTokenExpAt(new Date().getTime() + data.token.TokenExpAt * 1000);
        return {
          token,
          tokenActive: true,
        };
      } catch (error) {
        response = error;
        console.log(error);
      }
      return response;
    }
  }else{
        if (setToken) {
            setToken(null);
        }
      localStorage.setItem("token", JSON.stringify(null));
      return {
          tokenActive: false
      }
  }
};
