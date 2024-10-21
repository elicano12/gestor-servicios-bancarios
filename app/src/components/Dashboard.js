import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Componente para las tarjetas del resumen
const SummaryCard = ({ title, value }) => (
  <Card sx={{ minWidth: 250, bgcolor: "primary.main", color: "white" }}>
    <CardContent>
      <Typography variant="h5" component="div" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

function Dashboard() {
  const navigate = useNavigate();

  // Valores ficticios, puedes reemplazarlos con datos de la API.
  const totalSales = 120;
  const totalUsers = 15;
  const advisorSales = 45; // Por ejemplo, si el usuario es un asesor

  return (
    <Box sx={{ padding: 4 }}>
      {/* Título del dashboard */}
      <Typography variant="h3" gutterBottom sx={{ mb: 3, textAlign: "center" }}>
        Dashboard
      </Typography>

      {/* Resumen en tarjetas */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <SummaryCard title="Total de Ventas" value={totalSales} />
        </Grid>
        <Grid item>
          <SummaryCard title="Total de Usuarios" value={totalUsers} />
        </Grid>
        <Grid item>
          <SummaryCard title="Tus Ventas" value={advisorSales} />
        </Grid>
      </Grid>

      {/* Botones para redirigir a diferentes secciones */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => navigate("/ventas")}
        >
          Gestionar Ventas
        </Button>
        <Button
          variant="outlined"
          sx={{ mr: 2 }}
          onClick={() => navigate("/usuarios")}
        >
          Gestionar Usuarios
        </Button>
      </Box>

      {/* Lugar para futuras visualizaciones como gráficos */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Visualización de Ventas (Gráfico)
        </Typography>
        {/* Aquí podrías agregar un gráfico, por ahora es un placeholder */}
        <Card sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="h6">Gráfico de ventas vendrá aquí</Typography>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;
