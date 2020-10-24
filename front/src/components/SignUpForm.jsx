import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Container,
  Typography,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CustomAlert from "./CustomAlert";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [statusCode, setStatusCode] = useState();
  const [message, setMessage] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(true);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] = useState("");

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
    fetch("http://localhost:5000/signup", request)
      .then((response) => response.json())
      .then((data) => {
        setShowAlert(true);
        setStatusCode(data.statusCode);
        setMessage(data.message);

      });
  }

  function handleEmailValidation() {
    setEmailValidation(true);
    if (email != "" && email.includes("@")){
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
      setEmailHelperText("Insira um email válido.");
    }
  };

  function handlePasswordValidation() {
    setPasswordValidation(true);
    if (password != ""){
      setPasswordValidation(true);
    } else {
      setPasswordValidation(false);
      setPasswordHelperText("Insira uma senha.");
    }
  };

  function handleConfirmPasswordValidation() {
    setConfirmPasswordValidation(true);
    if (confirmPassword != ""){
      if (password === confirmPassword) {
        setConfirmPasswordValidation(true);
      } else {
        setConfirmPasswordValidation(false);
        setConfirmPasswordHelperText("As senhas devem ser iguais.");
      }
    } else {
      setConfirmPasswordValidation(false);
      setConfirmPasswordHelperText("Insira uma senha.");
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Typography className={classes.typography} variant="h5">
              Realize seu cadastro!
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
              <TextField
                className={classes.textField}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                onBlur={handleConfirmPasswordValidation}
                error={!confirmPasswordValidation}
                helperText={confirmPasswordHelperText}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirme sua senha"
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
                Cadastrar
              </Button>
            </form>
          </Grid>
          <Grid item xs={4} />
        </Grid>
        {showAlert ? (
        <CustomAlert statusCode={statusCode} message={message} />
      ) : (
        <></>
      )}
      </Container>
    </div>
  );
}
