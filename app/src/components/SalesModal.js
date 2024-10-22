import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { valueFormatted, findUser } from "../utils";


const SaleDetailsModal = ({
  open,
  handleClose,
  sale,
  users,
  user,
  products,
  isEditing,
  handleSave,
}) => {
  const [formData, setFormData] = useState({
    product: sale?.product || "",
    requested_amount: sale?.requested_amount || "",
    franchise: sale?.franchise || "",
    rate: sale?.rate || "",
    updated_by_user_id: user.id,
  });

  const [isCreditCard, setCreditCard] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCreditCard(value === "Tarjeta de Credito");
  };

  const handleSubmit = () => {
    handleSave(formData);
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
          {isEditing ? "Editar Venta" : "Detalles de la Venta"}
        </Typography>
        {sale && (
          <div>
            {isEditing ? (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="product-label">Producto</InputLabel>
                  <Select
                    labelId="product-label"
                    id="product"
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    label="Producto"
                  >
                    {products.map((product) => (
                      <MenuItem value={product.name}>{product.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {isCreditCard && (
                  <TextField
                    fullWidth
                    label="Franquicia"
                    name="franchise"
                    value={formData.franchise}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                )}

                <TextField
                  fullWidth
                  label="Cupo Solicitado"
                  name="requested_amount"
                  value={formData.requested_amount}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Tasa"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </>
            ) : (
              <>
                <Typography>Producto: {sale.product}</Typography>
                <Typography>
                  Cupo Solicitado: {valueFormatted(sale.requested_amount)}
                </Typography>
                {sale.requested_amount !== "null" ? (
                  <Typography>Franquicia: {sale.franchise}</Typography>
                ) : (
                  <> </>
                )}
                <Typography>Tasa: {sale.rate}</Typography>
                <Typography>
                  Creado por el usuario:{" "}
                  {findUser(users, sale.created_by_user_id)}
                </Typography>
                <Typography>
                  Fecha de Creación:{" "}
                  {new Date(sale.created_at).toLocaleDateString()}
                </Typography>
              </>
            )}
          </div>
        )}
        {isEditing ? (
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
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
};

export default SaleDetailsModal;
