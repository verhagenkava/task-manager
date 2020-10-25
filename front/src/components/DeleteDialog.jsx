import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
    deleteButton: {
      color: "white",
      backgroundColor: "#E86240",
      "&:hover": {
        backgroundColor: "#E3431B",
      },
    },
  }));

export default function AlertDialog({ open, handleClose, deletingTaskId }) {
    const classes = useStyles();
  
    function handleDeleteTask() {
    const request = {
      method: "DELETE",
      headers: {
        content_type: "application/json",
      },
    };
    fetch(`http://localhost:5000/task/${deletingTaskId}`, request)
      .then((response) => response.json())
      .then((data) => {
        handleClose();
      });
  }

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Tem certeza que deseja excluir?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa tarefa será excluída e essa ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button className={classes.deleteButton} onClick={handleDeleteTask} autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
