import {
  AppBar,
  createStyles,
  IconButton,
  LinearProgress,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import React from "react";

import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";

export const APP_BAR_HEIGHT = 64;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0),
      position: "relative",
      width: "100%",
      flex: 1,
    },
    linearProgress: {
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 5000,
    },
    user: {
      alignSelf: "flex-end",
    },
    appBar: {
      padding: theme.spacing(1),
      height: APP_BAR_HEIGHT,
    },
  })
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { user, logout } = useUserContext();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading } = useAppContext();

  return (
    <>
      <AppBar className={classes.appBar} position="static">
        {user && (
          <>
            <IconButton
              className={classes.user}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </AppBar>
      <div className={classes.root}>
        {loading && (
          <LinearProgress className={classes.linearProgress} color="primary" />
        )}
        {children}
      </div>
    </>
  );
}
