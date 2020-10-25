import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    marginTop: "50px",
  },
  textField: {
    "& label.Mui-focused": {
      color: "#E86240",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#E86240",
      },
    },
  },
  loginButton: {
    color: "white",
    backgroundColor: "#E86240",
    "&:hover": {
      backgroundColor: "#E3431B",
    },
    width: "100%",
    marginTop: "15px",
  },
}));

export default function LoginForm() {
  const classes = useStyles();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const request = {
      method: "POST",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("http://localhost:5000/login", request)
      .then((response) => response.json())
      .then((data) => {
        history.push("/tasks");
      });
  }

  function handleEmailValidation() {
    setEmailValidation(true);
    if (email !== "" && email.includes("@")) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
      setEmailHelperText("Insira um email válido.");
    }
  }

  function handlePasswordValidation() {
    setPasswordValidation(true);
    if (password !== "") {
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
      setPasswordHelperText("Insira uma senha.");
    }
  }

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Typography className={classes.typography} variant="h5">
              Faça seu login!
            </Typography>
            <form onSubmit={(event) => handleSubmit(event)}>
              <TextField
                className={classes.textField}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                id="email"
                name="email"
                label="Email"
                onBlur={handleEmailValidation}
                error={!emailValidation}
                helperText={emailHelperText}
                required
                variant="outlined"
                margin="normal"
                fullWidth
              />

              <TextField
                className={classes.textField}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                onBlur={handlePasswordValidation}
                error={!passwordValidation}
                helperText={passwordHelperText}
                id="password"
                name="password"
                label="Senha"
                type="password"
                required
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Button
                variant="contained"
                className={classes.loginButton}
                type="submit"
              >
                Login
              </Button>
            </form>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Container>
    </div>
  );
}
