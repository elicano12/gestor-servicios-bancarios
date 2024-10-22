import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";
import { valueFormatted } from "../../utils";

const SaleDetailsModal = ({ open, handleClose, sale, user }) => {
  return (
    sale && (
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" component="h2">
            Detalles de la Venta
          </Typography>
          <Typography>Producto: {sale?.product?.name}</Typography>
          <Typography>
            Cupo Solicitado: {valueFormatted(sale?.requested_amount)}
          </Typography>
          {sale?.requested_amount !== "null" && (
            <Typography>Franquicia: {sale?.franchise || "N/A"}</Typography>
          )}
          <Typography>Tasa: {sale?.rate}</Typography>
          <Typography>Creado por el usuario: {sale?.user?.name}</Typography>
          <Typography>
            Fecha de Creación: {new Date(sale?.created_at).toLocaleDateString()}
          </Typography>
        </Box>
      </Modal>
    )
  );
};

export default SaleDetailsModal;
