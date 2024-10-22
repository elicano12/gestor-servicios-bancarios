import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSales, fetchSalesByUserId } from "../redux/slices/sales.slices";
import { updateSale } from "../redux/slices/saleUpdate.slices";
import { fetchUsers } from "../redux/slices/users.slices";
import { logout } from "../redux/slices/auth.slices";
import { fetchproducts } from "../redux/slices/products.slices";
import { deleteSale } from "../redux/slices/salesDelete.slices";
import SalesTable from "../components/SalesTable";
import SalesModal from "../components/SalesModal";
import DeleteModal from "../components/SalesDeleteModal";
import { valueFormatted } from "../utils";



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, token } = useSelector((state) => state.auth);

  const { sales, total, loading } = useSelector((state) => state.sales);
  const { users } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    if (user.role_id === 1) {
      dispatch(fetchSales({ token }));
      dispatch(fetchUsers({ token }));
      
    } else {
      dispatch(fetchSalesByUserId({ token, id: user.id }));
      dispatch(fetchUsers({ token }));
    }
  }, [token, user, dispatch, navigate]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleView = (id) => {
    const sale = sales.find((s) => s.id === id);
    setSelectedSale(sale);
    setOpenModal(true);
  };

  const handleEdit = (id) => {
    dispatch(fetchproducts({ token }));
    const sale = sales.find((s) => s.id === id);
    setSelectedSale(sale);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSale(null);
    setIsEditing(false);
  };

  const handleSave = (updatedData) => {
    dispatch(updateSale({token,  id: selectedSale.id, body:updatedData}));
  };

  const handleCloseDeleteModal = () => {
    setSelectedSale(null);
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteSale({token,  id: selectedSale.id}));
  };

  const handleDelete = (id) => {
    const sale = sales.find((s) => s.id === id);
    setSelectedSale(sale);
    setOpenDeleteModal(true); 
  };



  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            <ListItem button onClick={() => navigate("/dashboard")}>
              <ListItemText primary="Sales" />
            </ListItem>
            {user.role_id === 1 && (
              <ListItem button onClick={() => navigate("/users")}>
                <ListItemText primary="Users" />
              </ListItem>
            )}
          </List>
          <Divider />
        </Box>
      </Drawer>

      {loading && <CircularProgress />}

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenido, {user.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography>Total de Ventas: {valueFormatted(total)}</Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography>
            <SalesTable
              sales={sales}
              users={users}
              role={user.role_id}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <SalesModal
              open={openModal}
              handleClose={handleCloseModal}
              sale={selectedSale}
              users={users}
              user={user}
              products={products}
              isEditing={isEditing}
              handleSave={handleSave}
            />
            <DeleteModal
              open={openDeleteModal}
              handleClose={handleCloseDeleteModal}
              handleConfirm={handleConfirmDelete}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
