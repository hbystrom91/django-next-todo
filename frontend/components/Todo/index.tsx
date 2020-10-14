import {
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { CSSProperties } from "react";
import { animated, useTransition, UseTransitionResult } from "react-spring";

import { createTask, deleteTask, editTask, getTasks } from "../../api";
import { useAppContext } from "../../contexts/AppContext";
import { useUserContext } from "../../contexts/UserContext";
import Spaced from "../Spaced";
import Task, { CARD_HEIGHT } from "../Task";
import TaskModal, { TaskModalFormValues } from "../TaskModal";

interface TransitionProps extends CSSProperties {
  y?: number;
}

interface EnterUpdateType extends Task {
  height: number;
  y: number;
  opacity: number;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
    },
    tasks: {
      margin: `${theme.spacing(1, 0, -1, 0)} !important`,
    },
    task: {
      padding: theme.spacing(2),
    },
  })
);

export default function Todo() {
  const classes = useStyles();
  const { loading, setLoading } = useAppContext();
  const { user } = useUserContext();

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
    (async () => {
      setLoading(true);
      await fetchTasks();
      setLoading(false);
    })();
  }, [fetchTasks, setLoading]);

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

  const onSubmit = async (values: TaskModalFormValues) => {
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

  let height = 0;

  const transitions = useTransition(
    tasks.map((task: Task) => ({
      ...task,
      y: (height += CARD_HEIGHT) - CARD_HEIGHT,
    })) as EnterUpdateType[],
    (d) => d.id,
    {
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y = 0, height = 0 }: EnterUpdateType) => ({
        y,
        height,
        opacity: 1,
      }),
      update: ({ y = 0, height = 0 }: EnterUpdateType) => ({ y, height }),
    }
  ) as UseTransitionResult<Task, TransitionProps>[];

  const openTaskModal = () => setOpen({ ...open, taskModal: true });

  return (
    <>
      <Spaced spacing={2} className={classes.root}>
        {user && (
          <Typography variant="overline">
            <strong>{`Todos by: ${user.username}`}</strong>
          </Typography>
        )}
        {transitions.length > 0 ? (
          <div style={{ height }} className={classes.tasks}>
            {transitions.map(
              ({ item: task, props: { y, ...rest }, key }, index) => {
                const { title, id, due_date } = task;

                return (
                  <animated.div
                    style={{
                      zIndex: transitions.length - index,
                      transform: y?.interpolate(
                        (y) => `translate3d(0,${y}px,0)`
                      ),
                      ...rest,
                    }}
                    key={key}
                  >
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
                    />
                  </animated.div>
                );
              }
            )}
          </div>
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
