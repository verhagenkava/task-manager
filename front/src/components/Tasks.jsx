import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Typography,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Chip,
} from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomDialog from "./CustomDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  list: {
    marginTop: "20px",
  },
  fab: {
    backgroundColor: "#E86240",
    color: "white",
    "&:hover": {
      backgroundColor: "#E3431B",
    },
    height: "70px",
    width: "70px",
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(7),
  },
  addIcon: {
    height: "50px",
    width: "50px",
  },
  typography: {
    marginTop: "20px",
    marginLeft: "10px",
  },
  chip: {
    backgroundColor: "#E86240",
    color: "white",
  },
  checkedIcon: {
    backgroundColor: "#E86240",
  },
}));

export default function Tasks() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [task, setTask] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [closedDialog, setClosedDialog] = useState(false);
  const selectedCategory = ["Todas as tarefas", "Hoje", "Próxima semana"];

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setIsEditing(false);
    if (closedDialog === false) {
      setClosedDialog(true);
    } else {
      setClosedDialog(false);
    }
  }

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  useEffect(() => {
    const request = {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        index: selectedIndex,
      }),
    };
    fetch("http://localhost:5000/tasks", request)
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        setTaskId(data.lastTaskId + 1);
      });
  }, [selectedIndex, closedDialog, checked]);

  function handleDelete(id) {
    const request = {
      method: "DELETE",
      headers: {
        content_type: "application/json",
      },
    };
    fetch(`http://localhost:5000/task/${id}`, request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (checked === false) {
          setChecked(true);
        } else {
          setChecked(false);
        }
      });
  }

  function handleEdit(task) {
    setTask(task);
    setTaskId(task.taskId);
    setIsEditing(true);
    setOpen(true);
    console.log(task);
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={3}>
            <List component="nav" className={classes.list}>
              <ListItem
                button
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="Todas" />
              </ListItem>
              <ListItem
                button
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Hoje" />
              </ListItem>
              <ListItem
                button
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText primary="Próxima semana" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.typography} variant="h4">
              {selectedCategory[selectedIndex]}
            </Typography>
            <List>
              {tasks.map((res) => {
                const labelId = `checkbox-list-label-${res.taskId}`;

                return (
                  <ListItem
                    key={res.taskId}
                    button
                    onClick={() => handleDelete(res.taskId)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        color="primary"
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={res.task} />
                    <ListItemSecondaryAction>
                      <Chip className={classes.chip} label={res.date} />
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEdit(res)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(res.taskId)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
          <Grid item xs={2}>
            <Fab
              className={classes.fab}
              color="inherit"
              aria-label="add"
              onClick={handleClickOpen}
            >
              <AddIcon className={classes.addIcon} />
            </Fab>
          </Grid>
        </Grid>
        <CustomDialog
          open={open}
          handleClose={handleClose}
          taskId={taskId}
          isEditing={isEditing}
          editingTask={task}
        />
      </Container>
    </div>
  );
}
