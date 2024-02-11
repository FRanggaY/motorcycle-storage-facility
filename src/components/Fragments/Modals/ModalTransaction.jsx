import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, styled, Typography, Stack, Card, CardMedia, CardActions, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Divider } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-hot-toast';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { fetchTransaction } from '../../../api/transactionApi';
import { useState } from 'react';
import { ModalConfirmation } from './ModalGeneral';

export const ModalAddTransaction = ({
  open,
  onClose,
  title,
  buttonTitle,
  formData,
  handleSubmit,
  handleChange,
  isLoading,
  items,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <span>{title}</span>
        <IconButton style={{ float: "right" }} onClick={onClose}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-label-customer-id">Customer*</InputLabel>
                <Select
                  required
                  labelId="select-label-customer-id"
                  name="customer_id"
                  id="select_customer_id"
                  value={formData.customer_id}
                  onChange={handleChange.general}
                >
                  {items.dataCustomer?.length > 0 &&
                    items.dataCustomer?.map((data, i) => {
                      return <MenuItem value={data.id} key={data.id}>
                        {data.name}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-label-item-id">Kategori Motor*</InputLabel>
                <Select
                  required
                  labelId="select-label-item-id"
                  name="item_id"
                  id="select_item_id"
                  value={formData.item_id}
                  onChange={handleChange.general}
                >
                  {items.dataItem?.length > 0 &&
                    items.dataItem?.map((data, i) => {
                      return <MenuItem value={data.id} key={data.id}>
                        {data.title}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="date_come"
                name="date_come"
                type="datetime-local"
                value={formData.date_come}
                fullWidth
                variant="standard"
                onChange={handleChange.datetime}
                helperText="Tanggal Datang*"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date_out"
                name="date_out"
                type="datetime-local"
                value={formData.date_out}
                fullWidth
                variant="standard"
                onChange={handleChange.datetime}
                helperText="Tanggal Keluar*"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cost_hourly"
                name="cost_hourly"
                type="number"
                value={formData.cost_hourly}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="Harga Per Jam"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cost_daily"
                name="cost_daily"
                type="number"
                value={formData.cost_daily}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="Harga Per Hari"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="plat_number"
                name="plat_number"
                value={formData.plat_number}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="No Plat"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="notes"
                name="notes"
                value={formData.notes}
                fullWidth
                type="textarea"
                variant="standard"
                onChange={handleChange.general}
                label="Catatan"
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <Button type="submit" variant='contained' disabled={isLoading}>
                {isLoading ? 'Loading...' : buttonTitle}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const ModalEditTransaction = ({
  open,
  onClose,
  title,
  buttonTitle,
  formData,
  handleSubmit,
  handleChange,
  isLoading,
  items,
  setFormData
}) => {
  const [deleteTransactionImageId, setDeleteTransactionImageId] = useState(null);
  const [openDialogDeleteImage, setOpenDialogDeleteImage] = useState(false);
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleInputPhotoChange = async (event) => {
    const file = event.target.files[0];
    const reqFormData = new FormData();
    reqFormData.append('image', file);
    reqFormData.append('title', `${formData.item_id}-${formData.customer_id}-${Math.random().toString(36).slice(2, 7)}`);
    reqFormData.append('transaction_id', formData.id);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction-photo-location`, {
        method: 'POST',
        body: reqFormData,
      });

      if (response.status === 201) {
        toast.success('data berhasil ditambahkan');

        const detail = await fetchTransaction(formData.id);

        // clear data
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
      } else if (response.status === 400) {
        const message = await response.json();
        toast.error(message?.detail);
      } else if (response.status === 404) {
        toast.error('data tidak ditemukan');
      } else if (response.status === 422) {
        toast.error('ada kesalahan saat menambah data');
      } else {
        toast.error('ada masalah saat menambah data');
      }
    } catch (error) {
      console.error('Error adding transaction image:', error);
    }
  };

  const handleRemovePhoto = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/v1/transaction-photo-location/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('data berhasil dihapus');

        const detail = await fetchTransaction(formData.id);

        // clear data
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
        setDeleteTransactionImageId(null);
        setOpenDialogDeleteImage(false);
      } else {
        toast.error('ada masalah saat menghapus data');
      }
    } catch (error) {
      console.error('Error deleting transaction image:', error);
    }
  };

  const handleConfirmationDelete = async (itemId) => {
    setOpenDialogDeleteImage(true);
    setDeleteTransactionImageId(itemId);
  };

  const handleCloseDialogDeleteImage = () => {
    setOpenDialogDeleteImage(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <span>{title}</span>
        <IconButton style={{ float: "right" }} onClick={onClose}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-label-customer-id">Customer*</InputLabel>
                <Select
                  required
                  labelId="select-label-customer-id"
                  name="customer_id"
                  id="select_customer_id"
                  value={formData.customer_id}
                  onChange={handleChange.general}
                >
                  {items.dataCustomer?.length > 0 &&
                    items.dataCustomer?.map((data, i) => {
                      return <MenuItem value={data.id} key={data.id}>
                        {data.name}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="select-label-item-id">Kategori Motor*</InputLabel>
                <Select
                  required
                  labelId="select-label-item-id"
                  name="item_id"
                  id="select_item_id"
                  value={formData.item_id}
                  onChange={handleChange.general}
                >
                  {items.dataItem?.length > 0 &&
                    items.dataItem?.map((data, i) => {
                      return <MenuItem value={data.id} key={data.id}>
                        {data.title}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="date_come"
                name="date_come"
                type="datetime-local"
                value={formData.date_come}
                fullWidth
                variant="standard"
                onChange={handleChange.datetime}
                helperText="Tanggal Datang*"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="date_out"
                name="date_out"
                type="datetime-local"
                value={formData.date_out}
                fullWidth
                variant="standard"
                onChange={handleChange.datetime}
                helperText="Tanggal Keluar*"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cost_hourly"
                name="cost_hourly"
                type="number"
                value={formData.cost_hourly}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="Harga Per Jam"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cost_daily"
                name="cost_daily"
                type="number"
                value={formData.cost_daily}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="Harga Per Hari"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="plat_number"
                name="plat_number"
                value={formData.plat_number}
                fullWidth
                variant="standard"
                onChange={handleChange.general}
                label="No Plat"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="notes"
                name="notes"
                value={formData.notes}
                fullWidth
                type="textarea"
                variant="standard"
                onChange={handleChange.general}
                label="Catatan"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label-status">Status</InputLabel>
                <Select
                  labelId="select-label-transaction_status"
                  name="status"
                  id="select_status"
                  value={formData.status}
                  onChange={handleChange.general}
                >
                  {items.transactionStatus?.length > 0 &&
                    items.transactionStatus?.map((data, i) => {
                      return <MenuItem value={data.id} key={data.id}>
                        {data.id}
                      </MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Attachment
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                useFlexGap flexWrap="wrap"
              >
                {
                  formData.attachment?.length > 0 && formData.attachment.map((data) => {
                    return <Card key={data.id}>
                      <CardMedia
                        sx={{ width: 250, height: 250 }}
                        image={data.url_photo}
                        title={data.title}
                      />
                      <CardActions>
                        <Button variant='contained' color='error' onClick={() => handleConfirmationDelete(data.id)} >Delete</Button>
                      </CardActions>
                    </Card>
                  })
                }
              </Stack>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload Image
                <VisuallyHiddenInput type="file" onChange={handleInputPhotoChange} />
              </Button>
            </Grid>
            <Grid item xs={8} sm={4}>
              <Button type="submit" variant='contained' disabled={isLoading}>
                {isLoading ? 'Loading...' : buttonTitle}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      {/* modal delete image */}
      <ModalConfirmation
        open={openDialogDeleteImage}
        onClose={handleCloseDialogDeleteImage}
        title={'Hapus'}
        description={'Apakah anda yakin ingin menghapus data ini?'}
        isLoading={isLoading}
        handleClick={() => handleRemovePhoto(deleteTransactionImageId)}
      />
    </Dialog>
  );
};

export const ModalViewTransaction = ({
  open,
  onClose,
  title,
  formData,
  isLoading,
}) => {
  const columns = [
    { id: 1, label: 'Harga Per Jam' },
    { id: 2, label: 'Harga Per Hari' },
    { id: 3, label: 'Harga Akhir' },
  ]

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <span>{title}</span>
        <IconButton style={{ float: "right" }} onClick={onClose}>
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {formData.customer?.name}
            </Typography>
            <Typography variant="h5" component="div">
              {formData.item?.title} {formData.plat_number && `- ${formData.plat_number}`}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formData.date_come} - {formData.date_out}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {
                formData.status === 'taken' ?
                  <Button variant='contained' color='success'>taken</Button> :
                  <Button variant='contained' color='primary'>reserved</Button>
              }
            </Typography>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {
                      columns.map((column) => {
                        return <TableCell key={column.id}>{column.label}</TableCell>
                      })
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{formData.cost_hourly}</TableCell>
                    <TableCell>{formData.cost_daily}</TableCell>
                    <TableCell>{formData.cost_final}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Divider/>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Catatan :
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {formData.notes}
            </Typography>
          </CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            useFlexGap flexWrap="wrap"
          >
            {
              formData.attachment?.length > 0 && formData.attachment.map((data) => {
                return <Card key={data.id}>
                  <CardMedia
                    sx={{ width: 250, height: 250 }}
                    image={data.url_photo}
                    title={data.title}
                  />
                </Card>
              })
            }
          </Stack>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
