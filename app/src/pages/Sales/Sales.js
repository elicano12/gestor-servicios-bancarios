import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Skeleton } from "@mui/material";
import SalesTable from "../../components/Sales/SalesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales, fetchSalesByUserId } from "../../redux/slices/sales.slices";
import { valueFormatted } from "../../utils";
import DeleteModal from "../../components/Sales/SalesDeleteModal";
import ViewSaleModal from "../../components/Sales/ViewSaleModal";
import EditSaleModal from "../../components/Sales/EditSaleModal";
import { updateSale } from "../../redux/slices/saleUpdate.slices";
import { deleteSale } from "../../redux/slices/salesDelete.slices";

function Sales() {
  const dispatch = useDispatch();

  const { token, user } = useSelector((state) => state.auth);
  const { sales, total, loading } = useSelector((state) => state.sales);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedSale, setSelectedSale] = useState({});

  useEffect(() => {
    if (user.role_id === 1) {
      dispatch(fetchSales({ token }));
      
    } else {
      dispatch(fetchSalesByUserId({ token, id: user.id }));
    }  }, [dispatch, token, user.id, user.role_id]);

  const selectSale = (id) => {
    const sale = sales.find((s) => s.id === id);
    setSelectedSale(sale);
  };

  const handleView = (id) => {
    selectSale(id);
    setOpenModal(true);
  };

  const handleEdit = (id) => {
    selectSale(id);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenEditModal(false);
  };

  const handleSave = (data) => {
    dispatch(updateSale({ token, id: selectedSale.id, body: data })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(fetchSales({ token }));
        }
      }
    );
  };

  const handleCloseDeleteModal = () => {
    setSelectedSale(null);
    setOpenDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteSale({ token, id: selectedSale.id })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchSales({ token }));
      }
    });
  };

  const handleDelete = (id) => {
    selectSale(id);

    setOpenDeleteModal(true);
  };

  return loading ? (
    <Skeleton variant="rectangular" width={210} height={118} />
  ) : (
    <Typography variant="h4">
      {user.role_id === 1
        ? "Gestor de todas las ventas"
        : "Gestor de tus ventas"}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography>Total de Ventas: {valueFormatted(total)}</Typography>
      </Box>
      <Box>
        <SalesTable
          sales={sales}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ViewSaleModal
          open={openModal}
          handleClose={handleCloseModal}
          sale={selectedSale}
        />
        <EditSaleModal
          open={openEditModal}
          handleClose={handleCloseModal}
          handleSave={handleSave}
          sale={selectedSale}
        />
        <DeleteModal
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleConfirm={handleConfirmDelete}
        />
      </Box>
    </Typography>
  );
}

export default Sales;
