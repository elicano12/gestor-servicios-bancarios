import React from 'react';
import { Modal, Box, Typography, Button, IconButton, } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

const DeleteModal = ({ open, handleClose, handleConfirm }) => {
    
    const handleSubmit = () => {
        handleConfirm();
        handleClose();
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}>

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

        <Typography id="confirm-delete-title" variant="h6" component="h2">
          Confirmar Eliminación
        </Typography>
        <Typography id="confirm-delete-description" sx={{ mt: 2 }}>
          ¿Estás seguro que deseas eliminar esta venta?
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button onClick={handleSubmit} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
