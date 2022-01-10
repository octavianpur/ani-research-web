import axios from "axios";
import { getStorageFieldValue } from "../utils/useLocalStorage";
import { API_BASE_URL } from "./constants";

import { User } from "../interfaces/UserInterfaces";



const config = {
    headers: { Authorization:  `Bearer ${getStorageFieldValue("token")}` }
};


const usersService = {
  getUsers: async (): Promise<User[]> => {
    let response: any;
    try {
      response = await axios.get(`${API_BASE_URL}/users`,config);
      const data = await response.data;
      return data;
    } catch (error) {
      response = error;
      console.log(error);
    }
    return response;
  },
};

export default usersService;
