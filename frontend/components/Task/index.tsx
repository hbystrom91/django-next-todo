import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import { format } from "date-fns";
import React from "react";

import { useAppContext } from "../../contexts/AppContext";

export const CARD_HEIGHT = 140;

interface TaskProps {
  title: string;
  due_date: Date;
  onDelete: () => void;
  onEdit: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0),
      height: CARD_HEIGHT,
    },
    paper: {
      height: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    title: {
      maxWidth: "60%",
    },
    actions: {
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
    date: {
      color: "#999",
    },
  })
);

export default function Task({ title, due_date, onDelete, onEdit }: TaskProps) {
  const classes = useStyles();
  const { loading } = useAppContext();

  const formattedDate = format(new Date(due_date), "dd MMM yyyy HH:mm");

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div>
          <Typography className={classes.date} variant="overline">
            <strong>{formattedDate}</strong>
          </Typography>
          <Typography className={classes.title}>{title}</Typography>
        </div>

        <div className={classes.actions}>
          <IconButton disabled={loading} onClick={onEdit} size="small">
            <EditIcon />
          </IconButton>
          <IconButton disabled={loading} onClick={onDelete} size="small">
            <CheckIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}
