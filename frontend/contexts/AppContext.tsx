import React from "react";

import { noop } from "../helpers";

interface AppContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const AppContext = React.createContext<AppContextProps>({
  loading: false,
  setLoading: noop,
});

export const useAppContext = () => React.useContext(AppContext);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
