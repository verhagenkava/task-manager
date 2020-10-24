import React from "react";
import "fontsource-roboto";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@material-ui/core/Container";
import Routes from "./Routes";

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <ButtonAppBar />
      <Routes />
    </Container>
  );
}

export default App;
