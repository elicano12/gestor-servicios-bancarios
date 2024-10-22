import React from "react";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  return (
    <Typography variant="h3">
      Bienvenido, ¿qué quieres hacer hoy?
      <Container>
        <ButtonGroup variant="contained" aria-label="Basic button group">
          {user.role_id === 1 && (
            <Button onClick={() => navigate("/dashboard/users")}>
              Ver Usuarios
            </Button>
          )}
          <Button onClick={() => navigate("/dashboard/sales")}>
            Ver Ventas
          </Button>
        </ButtonGroup>
      </Container>
    </Typography>
  );
}

export default Home;
