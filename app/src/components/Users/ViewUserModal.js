import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import React from "react";

const UserDetailsModal = ({ open, handleClose, user }) => {
  return (
    user && (
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
            Detalles del usuario
          </Typography>
          <Typography>Nombre: {user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Role: {user?.role?.name}</Typography>
          <Typography>
            Fecha de Creación: {new Date(user?.created_at).toLocaleDateString()}
          </Typography>
        </Box>
      </Modal>
    )
  );
};

export default UserDetailsModal;
