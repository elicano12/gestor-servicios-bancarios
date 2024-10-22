import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Skeleton } from "@mui/material";
import {fetchUsers} from "../../redux/slices/users.slices";
import { useDispatch, useSelector } from "react-redux";
import ViewUserModal from "../../components/Users/ViewUserModal";
import UsersTable from "../../components/Users/UsersTable";

function Users() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const { users, loading } = useSelector((state) => state.users);

  const [openModal, setOpenModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    dispatch(fetchUsers({ token }));
  }, [dispatch, token]);

  const selectUser = (id) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user);
  };

  const handleView = (id) => {
    selectUser(id);
    setOpenModal(true);
  };

  const handleEdit = (id) => {

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = (id) => {

  };

  return loading ? (
    <Skeleton variant="rectangular" width={210} height={118} />
  ) : (
    <Typography variant="h4">
      Gestión de Usuarios

      <Box>
        <UsersTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ViewUserModal
          open={openModal}
          handleClose={handleCloseModal}
          user={selectedUser}
        />
      </Box>
    </Typography>
  );
}

export default Users;
