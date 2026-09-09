// DeleteBox.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteBox = ({ state, setOpen, selectedRows, handleDeleteConfirm }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={state} onClose={handleClose}>
      <DialogTitle>Delete Questions</DialogTitle>

      <DialogTitle>Totally {selectedRows.length} Questions Selected</DialogTitle>

      <DialogContent>
        {selectedRows.length > 0 ? (
          selectedRows.map(row => (
            <ul>
              <li>
              <Typography key={row.id}>{row.questionText}</Typography>
              </li>
            </ul>
          ))
        ) : (
          <Typography>No questions selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDeleteConfirm} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBox;
