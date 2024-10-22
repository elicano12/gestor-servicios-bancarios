import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";

import { valueFormatted } from "../../utils";

const SalesTable = ({ sales, onView, onEdit, onDelete }) => {
  return (
    <Box sx={{ mt: 4 }}>
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
            {sales.length &&
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell align="center">{sale.id}</TableCell>
                  <TableCell align="center">{sale.product?.name}</TableCell>
                  <TableCell align="center">
                    {valueFormatted(sale.requested_amount)}
                  </TableCell>
                  <TableCell align="center">
                    {sale.franchise || "N/A"}
                  </TableCell>
                  <TableCell align="center">{sale.rate || "N/A"}</TableCell>
                  <TableCell align="center">{sale.user.name}</TableCell>
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
