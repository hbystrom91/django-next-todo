import { destroyCookie } from "nookies";
import { setCookie } from "nookies";
import React from "react";

import { me, tokenAuth } from "../api";
import { LoginFormValues } from "../components/LoginForm";
import { noop } from "../helpers";
import { COOKIE_AUTH_NAME, MONTH } from "../helpers/user";

interface UserContextProps {
  user?: User;
  logout: () => void;
  login: (values: LoginFormValues) => Promise<void>;
}

const UserContext = React.createContext<UserContextProps>({
  user: undefined,
  logout: noop,
  login: async () => noop(),
});

export const useUserContext = () => React.useContext(UserContext);

interface UserContextProviderProps {
  children: React.ReactNode;
  user?: User;
}

export const UserContextProvider = ({
  children,
  user: initialUser,
}: UserContextProviderProps) => {
  const [user, setUser] = React.useState<User | undefined>(initialUser);

  const login = async (values: LoginFormValues) => {
    try {
      const tokenResponse = await tokenAuth(values);

      if (tokenResponse.status === 200) {
        const { token } = tokenResponse.data;

        setCookie(null, COOKIE_AUTH_NAME, token, {
          maxAge: MONTH,
          path: "/",
        });

        const userResponse = await me(token);

        if (userResponse.status === 200) {
          setUser(userResponse.data);
        }
      }
    } catch (error) {
      console.error(error, error.response);
    }
  };

  const logout = () => {
    setUser(undefined);
    destroyCookie(null, COOKIE_AUTH_NAME);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
