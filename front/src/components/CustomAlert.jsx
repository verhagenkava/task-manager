import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {statusCode == 200 ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}
