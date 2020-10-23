import React, { useState } from "react";
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
      width: "100%",
      marginTop: "15px"
  }
}));

export default function LoginForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <Typography className={classes.typography} variant="h5">
              Faça seu login!
            </Typography>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                console.log("opa");
              }}
            >
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
