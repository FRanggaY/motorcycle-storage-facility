import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../utils/getLPTheme';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, setItemsPerPage } from '../redux/slices/itemSlice';
import { TableItem } from '../components/Fragments/TableItem';
import { fetchItems } from '../api/itemApi';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import NavAppBar from '../components/Common/NavAppBar';
import { toast } from 'react-hot-toast';
import { ModalItem } from '../components/Fragments/Modals/ModalItem';
import { ModalConfirmation } from '../components/Fragments/Modals/ModalGeneral';

function ItemPage() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const LPtheme = createTheme(getLPTheme(mode));
  const [formData, setFormData] = useState({ brand: '', title: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const currentPage = useSelector((state) => state.item.currentPage);
  const itemsPerPage = useSelector((state) => state.item.itemsPerPage);
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
    setFormData({ brand: '', title: '' });
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

  async function updateItem() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item/${editItemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        fetchItems(dispatch, customParams);
        setEditItemId(null);
        toast.success('data berhasil diubah');

        // clear data
        setFormData({ brand: '', title: '' });
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
      console.error('Error editing item:', error);
    }
    setIsLoading(false);
  }

  async function createItem() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        fetchItems(dispatch, customParams);
        toast.success('data berhasil disimpan');
        // clear data
        setFormData({ brand: '', title: '' });
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
      console.error('Error creating item:', error);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editItemId) {
      updateItem()
    } else {
      createItem()
    }
  };

  const handleEdit = (item) => {
    setOpenDialog(true);
    setFormData({ brand: item.brand, title: item.title });
    setEditItemId(item.id);
  };

  const handleConfirmationDelete = async (itemId) => {
    handleDialogDelete();
    setDeleteItemId(itemId);
  };

  const handleDelete = async (itemId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/item/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteItem(itemId));
        toast.success('data berhasil dihapus');
        setDeleteItemId(null);
        setOpenDialogDelete(false);
      } else {
        toast.error('ada masalah saat menghapus data');
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
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
            Kategori Motor
          </Typography>

          <Button onClick={() => handleDialog()} variant="contained" sx={{ marginTop: '20px' }}>
            (+) Tambah
          </Button>

          <TableItem onEdit={handleEdit} onDelete={handleConfirmationDelete} itemsPerPageList={itemsPerPageList} />

        </Container>
      </Box>
      {/* modal for create and edit */}
      <ModalItem
        open={openDialog}
        onClose={handleCloseDialog}
        title={editItemId ? 'Update' : 'Tambah'}
        buttonTitle={editItemId ? 'Update' : 'Submit'}
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
        handleClick={() => handleDelete(deleteItemId)}
      />
    </ThemeProvider>
  );
}
export default ItemPage;
