import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

import { createTask, deleteTask, editTask, getTasks } from "../../api";
import { useAppContext } from "../../contexts/AppContext";
import Spaced from "../Spaced";
import Task from "../Task";
import TaskModal from "../TaskModal";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
    },
    tasks: {},
    task: {
      padding: theme.spacing(2),
    },
  })
);

export default function Todo() {
  const classes = useStyles();
  const { loading, setLoading } = useAppContext();

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [open, setOpen] = React.useState({ taskModal: false });
  const [editing, setEditing] = React.useState<Task | undefined>(undefined);

  const fetchTasks = React.useCallback(async () => {
    try {
      const response = await getTasks();

      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error, error.response);
    }
  }, []);

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const removeTask = async (id = "") => {
    try {
      setLoading(true);
      await deleteTask({ id });
      await fetchTasks();
      setLoading(false);
    } catch (error) {
      console.error(error, error.response);
      setLoading(false);
    }
  };

  const onSubmit = async (values: Task) => {
    try {
      setLoading(true);
      if (!editing) {
        await createTask(values);
      } else {
        await editTask(values);
      }
      await fetchTasks();
      setLoading(false);
    } catch (error) {
      console.error(error, error.response);
      setLoading(false);
    }
  };

  const closeTaskModal = () => {
    setOpen({ ...open, taskModal: false });
    setEditing(undefined);
  };

  const openTaskModal = () => setOpen({ ...open, taskModal: true });

  return (
    <>
      <Spaced spacing={2} className={classes.root}>
        {tasks.length > 0 ? (
          <Spaced spacing={2} className={classes.tasks}>
            {tasks.map((task) => {
              const { title, id, due_date } = task;
              return (
                <Task
                  onDelete={() => {
                    removeTask(id);
                  }}
                  onEdit={() => {
                    setEditing(task);
                    openTaskModal();
                  }}
                  due_date={due_date}
                  title={title}
                  key={id}
                />
              );
            })}
          </Spaced>
        ) : (
          <Typography>{"No tasks here :')"}</Typography>
        )}

        <Button
          disabled={loading}
          onClick={openTaskModal}
          variant="contained"
          color="primary"
        >
          Add new
        </Button>
      </Spaced>

      {open.taskModal && (
        <TaskModal
          onSubmit={onSubmit}
          handleClose={closeTaskModal}
          open={open.taskModal}
          initialValues={editing}
        />
      )}
    </>
  );
}
