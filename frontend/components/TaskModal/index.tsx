import DateFnsUtils from "@date-io/date-fns";
import { createStyles, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";
import { Field, Form } from "react-final-form";

import { useAppContext } from "../../contexts/AppContext";
import FFInput from "../FFInput";
import Spaced from "../Spaced";

const INITIAL_VALUES = {
  title: "",
  completed: false,
  description: "",
  id: "",
  due_date: new Date(),
  user: "",
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

export interface TaskModalFormValues {
  completed: boolean;
  title: string;
  id: string;
  due_date: Date;
  description: string;
}

interface TaskModalProps {
  handleClose: () => void;
  open: boolean;
  onSubmit: (values: TaskModalFormValues) => Promise<void>;
  initialValues?: TaskModalFormValues;
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
                <Spaced spacing={2}>
                  <Field
                    fullWidth
                    label="Title"
                    name="title"
                    component={FFInput}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field fullWidth name="due_date" label="Due date">
                      {({ input }) => (
                        <KeyboardDateTimePicker
                          variant="inline"
                          ampm={false}
                          fullWidth
                          name="due_date"
                          label="Due date"
                          value={input.value}
                          onChange={input.onChange}
                          disablePast
                          format="yyyy/MM/dd HH:mm"
                        />
                      )}
                    </Field>
                  </MuiPickersUtilsProvider>
                </Spaced>
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
