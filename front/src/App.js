import React from "react";
import "fontsource-roboto";
import ButtonAppBar from "./components/ButtonAppBar";
import LoginForm from "./components/LoginForm";
import Container from "@material-ui/core/Container";

function App() {
  return (
    <Container maxWidth="false" disableGutters>
      <ButtonAppBar />
      <LoginForm />
    </Container>
  );
}

export default App;
