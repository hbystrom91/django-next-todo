import { Container, createStyles, makeStyles } from "@material-ui/core";
import React from "react";

import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import Todo from "../components/Todo";
import { useUserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);

export default function Index() {
  const classes = useStyles();
  const { user } = useUserContext();

  return (
    <Layout>
      <div className={classes.root}>
        <Container maxWidth="xs">{!user ? <LoginForm /> : <Todo />}</Container>
      </div>
    </Layout>
  );
}
