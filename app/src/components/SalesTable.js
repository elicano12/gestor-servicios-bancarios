import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"

import { findUser, valueFormatted } from "../utils";

const SalesTable = ({ sales, users, role, onView, onEdit, onDelete }) => {

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" align="center">
        {role === 1 ? "Gestor de todas las ventas" : "Gestor de tus ventas"}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="sales table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Producto</TableCell>
              <TableCell align="center">Cupo Solicitado</TableCell>
              <TableCell align="center">Franquicia</TableCell>
              <TableCell align="center">Tasa</TableCell>
              <TableCell align="center">Creado por el Usuario</TableCell>
              <TableCell align="center">Fecha de Creación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {  sales.length && sales.map((sale) => (

              <TableRow key={sale.id}>
                <TableCell align="center">{sale.id}</TableCell>
                <TableCell align="center">{sale.product}</TableCell>
                <TableCell align="center">{valueFormatted(sale.requested_amount)}</TableCell>
                <TableCell align="center">{sale.franchise || "N/A"}</TableCell>
                <TableCell align="center">{sale.rate || "N/A"}</TableCell>
                <TableCell align="center">{findUser(users, sale.created_by_user_id)}</TableCell>
                <TableCell align="center">
                  {new Date(sale.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                <IconButton
                    aria-label="view"
                    color="primary"
                    onClick={() => onView(sale.id)} 
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => onEdit(sale.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => onDelete(sale.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
