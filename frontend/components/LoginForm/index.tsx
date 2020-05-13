import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Field, Form } from "react-final-form";

import { useUserContext } from "../../contexts/UserContext";
import FFInput from "../FFInput";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",

      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const classes = useStyles();

  const { login } = useUserContext();

  const onSubmit = async (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <Field label="Username" name="username" component={FFInput} />
          <Field
            label="Password"
            type="password"
            name="password"
            component={FFInput}
          />
          <Button type="submit" color="primary" variant="contained">
            Login
          </Button>
        </form>
      )}
    </Form>
  );
}
