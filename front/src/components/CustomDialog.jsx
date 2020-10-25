import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import ptLocale from "date-fns/locale/pt";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  addButton: {
    color: "white",
    backgroundColor: "#E86240",
    "&:hover": {
      backgroundColor: "#E3431B",
    },
  },
  datePicker: {
    marginTop: "15px",
  },
}));

export default function CustomizedDialogs({ open, handleClose, taskId }) {
  const classes = useStyles();
  const [task, setTask] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

  function handleSaveTask() {
    const formatedDate = `${
      selectedDate.getDate() +
      "/" +
      (selectedDate.getMonth() + 1) +
      "/" +
      selectedDate.getFullYear()
    }`;
    const request = {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        taskId: taskId,
        task: task,
        date: formatedDate,
      }),
    };
    fetch("http://localhost:5000/add", request)
      .then((response) => response.json())
      .then((data) => {
        setTask("");
        handleDateChange(new Date());
        handleClose();
      });
  }

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Adicione uma nova tarefa
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            id="task-body"
            multiline
            rows={2}
            variant="outlined"
            placeholder="Por exemplo: Reunião do Trabalho segunda às 09:00"
            value={task}
            onChange={(event) => {
              setTask(event.target.value);
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
            <KeyboardDatePicker
              className={classes.datePicker}
              value={selectedDate}
              onChange={(date) => handleDateChange(date)}
              format="dd/MM/yyyy"
              invalidDateMessage="Data inválida"
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button className={classes.addButton} onClick={handleSaveTask}>
            Adicionar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
