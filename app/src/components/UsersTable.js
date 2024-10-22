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

import { findRole } from "../utils";

const SalesTable = ({ users, role, onView, onEdit, onDelete }) => {

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
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Fecha de Creación</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {  users.length && users.map((user) => (

              <TableRow key={user.id}>
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.franchise || "N/A"}</TableCell>
                <TableCell align="center">{user.rate || "N/A"}</TableCell>
                <TableCell align="center">{findRole(users, user.role_id)}</TableCell>
                <TableCell align="center">
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                <IconButton
                    aria-label="view"
                    color="primary"
                    onClick={() => onView(user.id)} 
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    onClick={() => onEdit(user.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => onDelete(user.id)}
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
