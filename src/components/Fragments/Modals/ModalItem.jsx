import { Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

export const ModalItem = ({
  open,
  onClose,
  title,
  buttonTitle,
  formData,
  handleSubmit,
  handleChange,
  isLoading
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="brand"
                name="brand"
                label="Brand Motor"
                type="text"
                value={formData.brand}
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="title"
                name="title"
                label="Tipe Motor"
                type="text"
                value={formData.title}
                fullWidth
                variant="standard"
                onChange={handleChange}
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
