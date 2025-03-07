import { createContext } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { CurrentUser, User } from '../interfaces/UserInterfaces'

interface UserContextI{
    id: number|undefined;
    roles: number[];
    firstName: string|undefined,
    lastName: string|undefined,
    displayName: string|undefined;
    email: string|undefined;
    profileImageUrl: string|undefined;
    setUser:any,
    
}

const UserContext = createContext<UserContextI>({
    id: undefined,
    roles: [],
    displayName: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    profileImageUrl: undefined,
    setUser: (user: CurrentUser) => {},
});

export function UserContextProvider(props: any) {
  const [user, setUser] = useLocalStorage<CurrentUser>("user");


  const setUserHandler = (value: CurrentUser) => {
    setUser(value);
  };


  const context : UserContextI = {
    id: user?.id,
    roles: user?.roles||[],
    displayName: user?.displayName,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    profileImageUrl: user?.profileImageUrl,
    setUser: setUserHandler,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;