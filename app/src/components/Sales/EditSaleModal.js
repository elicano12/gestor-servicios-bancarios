import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const EditSaleModal = ({ open, handleClose, sale, handleSave, user }) => {
  const { products } = useSelector((state) => state.products);

  const [dataToUpdate, setDateToUpdate] = useState({
    ...sale,
  });

  const [productIdSelected, setProductIdSelected] = useState(sale?.product_id);

  const [isCreditCard, setCreditCard] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDateToUpdate({ ...dataToUpdate, [name]: value });
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    setProductIdSelected(e.target.value);
    setCreditCard(e.target.value === 3);
  };

  const handleSubmit = () => {
    handleSave({
      ...dataToUpdate,
      product_id: productIdSelected,
      ...(productIdSelected !== 3 && { franchise: null }),
    });
    handleClose();
  };

  return (
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

        <Typography variant="h6" component="h2">
          Editar Venta
        </Typography>
        {sale && (
          <div>
            {
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="product-label">Producto</InputLabel>
                  <Select
                    labelId="product-label"
                    id="product"
                    name="product"
                    value={productIdSelected}
                    onChange={handleSelectChange}
                    label="Producto"
                  >
                    {products.map((product) => (
                      <MenuItem value={product.id}>{product.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {isCreditCard && (
                  <TextField
                    fullWidth
                    label="Franquicia"
                    name="franchise"
                    value={dataToUpdate.franchise}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                )}

                <TextField
                  fullWidth
                  label="Cupo Solicitado"
                  name="requested_amount"
                  value={dataToUpdate.requested_amount}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tasa"
                  name="rate"
                  value={dataToUpdate.rate}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </>
            }
          </div>
        )}

        <div>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Guardar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditSaleModal;
