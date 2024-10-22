import { useNavigate, Outlet } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as UsersIcon,
  ShoppingCart as SalesIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproducts } from "../../redux/slices/products.slices";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchproducts({ token }));
  }, [dispatch, token]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        sx={{ width: 250 }}
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List>
          <ListItem button onClick={() => navigate("/dashboard/home")}>
            <HomeIcon />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/dashboard/users")}>
            <UsersIcon />
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem button onClick={() => navigate("/dashboard/sales")}>
            <SalesIcon />
            <ListItemText primary="Ventas" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <main>
          <Outlet />
        </main>
      </Box>
    </Box>
  );
};

export default Dashboard;
