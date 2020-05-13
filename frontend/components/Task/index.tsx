import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

import { useAppContext } from "../../contexts/AppContext";

interface TaskProps {
  title: string;
  onDelete: () => void;
  onEdit: () => void;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
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
  })
);

export default function Task({ title, onDelete, onEdit }: TaskProps) {
  const classes = useStyles();
  const { loading } = useAppContext();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>

      <div className={classes.actions}>
        <IconButton disabled={loading} onClick={onEdit} size="small">
          <EditIcon />
        </IconButton>
        <IconButton disabled={loading} onClick={onDelete} size="small">
          <CheckIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
