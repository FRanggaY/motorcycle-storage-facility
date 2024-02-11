import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getLPTheme from '../utils/getLPTheme';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../redux/slices/transactionSlice';
import { TableTransaction } from '../components/Fragments/TableTransaction';
import { fetchTransaction, fetchTransactions } from '../api/transactionApi';
import { fetchItems } from '../api/itemApi';
import { fetchCustomers } from '../api/customerApi';
import { Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import NavAppBar from '../components/Common/NavAppBar';
import { toast } from 'react-hot-toast';
import { ModalConfirmation } from '../components/Fragments/Modals/ModalGeneral';
import Footer from '../components/Common/Footer';
import { ModalEditTransaction, ModalAddTransaction } from '../components/Fragments/Modals/ModalTransaction';
import { getCurrentDateTimeFormatted } from '../utils/generateDatetime';

function TransactionPage() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const LPtheme = createTheme(getLPTheme(mode));
  const [formData, setFormData] = useState({
    item_id: '',
    customer_id: '',
    date_come: getCurrentDateTimeFormatted(),
    date_out: getCurrentDateTimeFormatted(1),
    cost_hourly: 0,
    cost_daily: 0,
    notes: '',
    plat_number: '',
    status: '',
    attachment: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);
  const [deleteTransactionId, setDeleteTransactionId] = useState(null);
  const currentPage = useSelector((state) => state.transaction.currentPage);
  const itemsPerPage = useSelector((state) => state.transaction.itemsPerPage);
  const itemsPerPageList = [5, 10, 50, 100];

  const dataItem = useSelector((state) => state.item.data);
  const dataCustomer = useSelector((state) => state.customer.data);
  const transactionStatus = useSelector((state) => state.transaction.transactionStatus);

  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  useEffect(() => {
    fetchItems(dispatch);
    fetchCustomers(dispatch);
  }, [dispatch]);

  const customParams = {
    size: itemsPerPage,
    offset: currentPage,
  };

  const handleDialogAdd = () => {
    setOpenDialogAdd(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogAdd(false);
    setOpenDialogEdit(false);
    // clear data
    setFormData({
      id: '',
      item_id: '',
      customer_id: '',
      date_come: getCurrentDateTimeFormatted(),
      date_out: getCurrentDateTimeFormatted(1),
      cost_hourly: 0,
      cost_daily: 0,
      notes: '',
      plat_number: '',
      status: '',
      attachment: []
    });
    setEditTransactionId(null);
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

  const handleChangeDatetime = (e) => {
    let formattedValue = e.target.value.replace("T", " ");

    if (formattedValue.length === 16 && formattedValue.indexOf(":") === 13) {
      formattedValue += ":00";
    }

    setFormData({ ...formData, [e.target.name]: formattedValue });
  };

  async function updateTransaction() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction/${editTransactionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        fetchTransactions(dispatch, customParams);
        setEditTransactionId(null);
        toast.success('data berhasil diubah');

        // clear data
        setFormData({
          item_id: '',
          customer_id: '',
          date_come: getCurrentDateTimeFormatted(),
          date_out: getCurrentDateTimeFormatted(1),
          cost_hourly: 0,
          cost_daily: 0,
          notes: '',
          plat_number: '',
          status: '',
          attachment: []
        });
        setOpenDialogEdit(false);
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
      console.error('Error editing transaction:', error);
    }
    setIsLoading(false);
  }

  async function createTransaction() {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        fetchTransactions(dispatch, customParams);
        toast.success('data berhasil disimpan');
        // clear data
        setFormData({
          item_id: '',
          customer_id: '',
          date_come: getCurrentDateTimeFormatted(),
          date_out: getCurrentDateTimeFormatted(1),
          cost_hourly: 0,
          cost_daily: 0,
          notes: '',
          plat_number: '',
          status: '',
          attachment: []
        });
        setOpenDialogAdd(false);
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
      console.error('Error creating transaction:', error);
    }
    setIsLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editTransactionId) {
      updateTransaction()
    } else {
      createTransaction()
    }
  };

  const handleEdit = async (data) => {
    const detail = await fetchTransaction(data.id);
    setFormData({
      id: detail.id,
      item_id: detail.item.id,
      customer_id: detail.customer.id,
      date_come: detail.date_come,
      date_out: detail.date_out ? detail.date_out : '',
      cost_hourly: detail.cost_hourly,
      cost_daily: detail.cost_daily,
      notes: detail.notes,
      plat_number: detail.plat_number,
      status: detail.status,
      attachment: detail.attachment
    });
    setEditTransactionId(data.id);
    setOpenDialogEdit(true);
  };

  const handleConfirmationDelete = async (itemId) => {
    handleDialogDelete();
    setDeleteTransactionId(itemId);
  };

  const handleDelete = async (TransactionId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction/${TransactionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteTransaction(TransactionId));
        toast.success('data berhasil dihapus');
        setDeleteTransactionId(null);
        setOpenDialogDelete(false);
      } else {
        toast.error('ada masalah saat menghapus data');
        console.error('Failed to delete transaction:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
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
            Transaksi
          </Typography>

          <Button onClick={() => handleDialogAdd()} variant="contained" sx={{ marginTop: '20px' }}>
            (+) Tambah
          </Button>

          <TableTransaction onEdit={handleEdit} onDelete={handleConfirmationDelete} itemsPerPageList={itemsPerPageList} />

        </Container>
      </Box>
      {/* modal for create */}
      <ModalAddTransaction
        open={openDialogAdd}
        onClose={handleCloseDialog}
        title={editTransactionId ? 'Update' : 'Tambah'}
        buttonTitle={editTransactionId ? 'Update' : 'Submit'}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={{
          general: handleChange,
          datetime: handleChangeDatetime
        }}
        setIsLoading={isLoading}
        items={{
          dataItem: dataItem,
          dataCustomer: dataCustomer,
          transactionStatus: transactionStatus
        }}
        editId={editTransactionId}
      />
      {/* modal for edit */}
      <ModalEditTransaction
        open={openDialogEdit}
        onClose={handleCloseDialog}
        title={'Update'}
        buttonTitle={'Update'}
        formData={formData}
        handleSubmit={handleSubmit}
        handleChange={{
          general: handleChange,
          datetime: handleChangeDatetime
        }}
        setIsLoading={isLoading}
        items={{
          dataItem: dataItem,
          dataCustomer: dataCustomer,
          transactionStatus: transactionStatus
        }}
        setFormData={setFormData}
      />
      {/* modal delete */}
      <ModalConfirmation
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        title={'Hapus'}
        description={'Apakah anda yakin ingin menghapus data ini?'}
        isLoading={isLoading}
        handleClick={() => handleDelete(deleteTransactionId)}
      />
      <Footer />
    </ThemeProvider>
  );
}
export default TransactionPage;
