import React, { useState } from "react";
import "fontsource-roboto";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from "@material-ui/core/Container";
import Routes from "./Routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
  }

  return (
    <Container maxWidth={false} disableGutters>
      <ButtonAppBar handleLogin={handleLogin} handleLogout={handleLogout} />
      <Routes
        handleLogin={handleLogin}
        isAuthenticated={isAuthenticated}
      />
    </Container>
  );
}

export default App;
