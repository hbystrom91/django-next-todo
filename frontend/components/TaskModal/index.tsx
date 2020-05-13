import { createStyles, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { Field, Form } from "react-final-form";

import { useAppContext } from "../../contexts/AppContext";
import FFInput from "../FFInput";

const INITIAL_VALUES = {
  title: "",
  completed: false,
  id: "",
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiPaper-root": {
        width: 300,
      },
    },
  })
);

interface TaskModalProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (values: Task) => Promise<void>;
  initialValues?: Task;
}

export default function TaskModal({
  handleClose,
  open,
  onSubmit,
  initialValues = INITIAL_VALUES,
}: TaskModalProps) {
  const classes = useStyles();
  const { loading } = useAppContext();

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, form, pristine }) => {
        const disabled = loading || pristine;
        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              className={classes.root}
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New task</DialogTitle>
              <DialogContent>
                <Field
                  fullWidth
                  label="Title"
                  name="title"
                  component={FFInput}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  disabled={disabled}
                  onClick={async () => {
                    await form.submit();
                    handleClose();
                  }}
                  color="primary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    </Form>
  );
}
