import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Custom styled Dialog to add border radius
const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '20px', // Set border radius
  },
}));

const ErrorBox = ({ state, setOpen, message }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <CustomDialog
      open={state}
      onClose={handleClose}
      aria-labelledby="error-dialog-title"
    >
      <DialogTitle id="error-dialog-title">Error</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </CustomDialog>
  );
};

export default ErrorBox;
