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
                type="email"
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
                //onBlur={validarCampos}
                //error={!erros.password.valido}
                //helperText={erros.password.texto}
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
                //onBlur={validarCampos}
                //error={!erros.password.valido}
                //helperText={erros.password.texto}
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
