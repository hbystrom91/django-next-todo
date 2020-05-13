import "../css/globals.css";

import { ThemeProvider } from "@material-ui/core";
import { NextPageContext } from "next";
import { AppProps } from "next/app";
import { parseCookies } from "nookies";
import React from "react";

import { me } from "../api";
import { AppContextProvider } from "../contexts/AppContext";
import { UserContextProvider } from "../contexts/UserContext";
import theme from "../theme";

App.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const cookies = parseCookies(ctx);

  const { authToken } = cookies;

  let user = undefined;

  if (authToken) {
    try {
      const response = await me(authToken);

      if (response.status === 200) {
        user = response.data;
      }
    } catch (error) {
      console.error(error, error.response);
    }
  }

  return {
    user: user,
  };
};

interface ExtendedAppProps extends AppProps {
  user?: User;
}

function App({ Component, pageProps, user }: ExtendedAppProps) {
  // Clear SSR styles
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <UserContextProvider user={user}>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
