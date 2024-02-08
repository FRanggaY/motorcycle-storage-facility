import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

export const ModalConfirmation = ({
  open,
  onClose,
  title,
  description,
  isLoading,
  handleClick
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
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleClick}
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : title}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
