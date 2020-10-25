import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Link from "@material-ui/core/Link";
import { useHistory, Link as RouterLink, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#363635",
  },
  checkCircleIcon: {
    display: "inline-block",
    verticalAlign: "middle",
    color: "#E86240",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  function handleButton() {
    if (location.pathname === "/") {
      history.push("/signup");
    } else {
      history.push("/");
    }
  }

  function handleLogOut() {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              underline="none"
            >
              Task Manager
              <CheckCircleIcon className={classes.checkCircleIcon} />
            </Link>
          </Typography>
          {location.pathname === "/tasks" ? (
            <Button color="inherit" onClick={handleLogOut}>
              Sair
            </Button>
          ) : (
            <Button color="inherit" onClick={handleButton}>
              {location.pathname === "/" ? "Cadastro" : "Entrar"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
