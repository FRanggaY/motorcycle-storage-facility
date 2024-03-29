import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../utils/getLPTheme';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer } from '../redux/slices/customerSlice';
import { TableCustomer } from '../components/Fragments/TableCustomer';
import { fetchCustomers } from '../api/customerApi';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import NavAppBar from '../components/Common/NavAppBar';
import { toast } from 'react-hot-toast';
import { ModalCustomer } from '../components/Fragments/Modals/ModalCustomer';
import { ModalConfirmation } from '../components/Fragments/Modals/ModalGeneral';
import Footer from '../components/Common/Footer';

function CustomerPage() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const LPtheme = createTheme(getLPTheme(mode));
  const [formData, setFormData] = useState({ name: '', no_hp: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const currentPage = useSelector((state) => state.customer.currentPage);
  const itemsPerPage = useSelector((state) => state.customer.itemsPerPage);
  const itemsPerPageList = [5, 10, 50, 100];

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const handleDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // clear data
    setFormData({ name: '', no_hp: '' });
  };

  const handleDialogDelete = () => {
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function updateCustomer() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer/${editCustomerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        fetchCustomers(dispatch, customParams);
        setEditCustomerId(null);
        toast.success('data berhasil diubah');

        // clear data
        setFormData({ name: '', no_hp: '' });
        setOpenDialog(false);
      } else if (response.status === 400) {
        const message = await response.json();
        toast.error(message?.detail);
      } else if (response.status === 404) {
        toast.error('data tidak ditemukan');
      } else if (response.status === 422) {
        toast.error('ada kesalahan saat menginput data');
      } else {
        toast.error('ada masalah saat mengubah data');
      }
    } catch (error) {
      console.error('Error editing customer:', error);
    }
    setIsLoading(false);
  }

  async function createCustomer() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        fetchCustomers(dispatch, customParams);
        toast.success('data berhasil disimpan');
        // clear data
        setFormData({ name: '', no_hp: '' });
        setOpenDialog(false);
      } else if (response.status === 400) {
        const message = await response.json();
        toast.error(message?.detail);
      } else if (response.status === 404) {
        toast.error('data tidak ditemukan');
      } else if (response.status === 422) {
        toast.error('ada kesalahan saat menginput data');
      } else {
        toast.error('ada masalah saat menyimpan data');
      }
    } catch (error) {
      console.error('Error creating customer:', error);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editCustomerId) {
      updateCustomer()
    } else {
      createCustomer()
    }
  };

  const handleEdit = (customer) => {
    setOpenDialog(true);
    setFormData({ name: customer.name, no_hp: customer.no_hp });
    setEditCustomerId(customer.id);
  };

  const handleConfirmationDelete = async (itemId) => {
    handleDialogDelete();
    setDeleteCustomerId(itemId);
  };

  const handleDelete = async (CustomerId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/customer/${CustomerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteCustomer(CustomerId));
        toast.success('data berhasil dihapus');
        setDeleteCustomerId(null);
        setOpenDialogDelete(false);
      } else {
        toast.error('ada masalah saat menghapus data');
        console.error('Failed to delete customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <NavAppBar />
      <Box sx={{ bgcolor: 'background.default', pt: { xs: 4, sm: 12 }, pb: { xs: 8, sm: 16 }, }}>
        <Container>
          <Typography component="h2" variant="h4">
            Customer
          </Typography>

          <Button onClick={() => handleDialog()} variant="contained" sx={{ marginTop: '20px' }}>
            (+) Tambah
          </Button>

          <TableCustomer onEdit={handleEdit} onDelete={handleConfirmationDelete} itemsPerPageList={itemsPerPageList} />

        </Container>
      </Box>
      {/* modal for create and edit */}
      <ModalCustomer
        open={openDialog}
        onClose={handleCloseDialog}
        title={editCustomerId ? 'Update' : 'Tambah'}
        buttonTitle={editCustomerId ? 'Update' : 'Submit'}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setIsLoading={isLoading}
      />
      {/* modal delete */}
      <ModalConfirmation
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        title={'Hapus'}
        description={'Apakah anda yakin ingin menghapus data ini?'}
        isLoading={isLoading}
        handleClick={() => handleDelete(deleteCustomerId)}
      />
      <Footer />
    </ThemeProvider>
  );
}
export default CustomerPage;
