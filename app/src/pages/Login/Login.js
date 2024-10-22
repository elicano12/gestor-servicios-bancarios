/* eslint-disable no-unused-vars */
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Importar hooks de Redux
import { login } from "../../redux/slices/auth.slices"; // Importar la acción de login
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth); 
  
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/dashboard");
      }
    });
  };

  return (
    <div>
      <CssBaseline />
      {/* Contenedor principal con textura de fondo */}
      <Box
        sx={{
          minHeight: "100vh", // Altura completa de la pantalla
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* Tarjeta de inicio de sesión */}
        <Card
          sx={{
            minWidth: 350,
            padding: 3,
            boxShadow: 5,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semitransparente
            backdropFilter: "blur(5px)", // Desenfoque de fondo
          }}
        >
          <CardContent>
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 3 }}
            >
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <TextField
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Login;
