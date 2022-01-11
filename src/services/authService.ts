import axios from "axios";
import { API_BASE_URL, WEB_BASE_URL } from "../constants/apiLinks";

import { AuthUrl, SignUpResponse } from "../interfaces/AuthInterfaces";

const auth = {
  getAuthUrl: async (): Promise<AuthUrl> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/auth/google/auth-url`, {
        params: { redirect_uri: WEB_BASE_URL },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
  signIn: async (code: string | null): Promise<SignUpResponse> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/auth/google/signin`, {
        params: { code, redirect_uri: WEB_BASE_URL },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
  refreshToken: async (): Promise<any> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/auth/refresh`)
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
};

export default auth;
