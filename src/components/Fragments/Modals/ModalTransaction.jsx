import { Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

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
