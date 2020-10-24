import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomAlert({ statusCode, message }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  let history = useHistory();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    history.push("/");
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        {statusCode == 200 ? (
          <Alert variant="filled" onClose={handleClose} severity="success">
            {message}
          </Alert>
        ) : (
          <Alert variant="filled" onClose={handleClose} severity="error">
            {message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
