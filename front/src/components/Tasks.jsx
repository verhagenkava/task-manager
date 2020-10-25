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
  IconButton
} from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
}));

export default function Tasks() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCategory = ["Todas", "Hoje", "Próxima semana"];

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  useEffect(() => {
    const request = {
      method: "GET",
      headers: {
        content_type: "application/json",
      },
    };
    fetch("http://localhost:5000/tasks", request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Tarefa ${value + 1}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
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
        <CustomDialog open={open} handleClose={handleClose} />
      </Container>
    </div>
  );
}
