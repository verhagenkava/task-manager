import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  DialogContentText,
  Button,
} from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
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
}));

export default function Tasks() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={3}>
            <List component="nav" className={classes.list}>
              <ListItem
                button
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AllInboxIcon />
                </ListItemIcon>
                <ListItemText primary="Todas" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Hoje" />
              </ListItem>
              <ListItem
                button
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText primary="Próxima semana" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={7} />
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
