import * as React from 'react';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';


export default function ConfirmSubmitDialog({ open, onClose, onSubmit }) {


    return (
        <React.Fragment>
            <Dialog
                sx={{
                    ".MuiDialog-paper": {
                        minWidth: '615px',
                        borderRadius: '20px',
                        padding: '20px',
                        backgroundImage: 'url("./Images/upload-solid.png")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '180px',
                        backgroundPositionX: '440px',
                        backgroundPositionY: '18px',

                    }
                }}
                // open={timeLeft === 0 ? true : false}
                open={open}
                
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '27px', fontWeight: '200' }}>
                    {"Confirm Submission"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: '' }}>
                        <Typography sx={{ width: '400px' }}>
                        Are you sure you want to submit your answers?
                        </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'start', marginLeft: '10px' }}>
                    <Button onClick={onClose} sx={{
                        color: '#37407b',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        fontSize: '17px',
                        borderRadius: '20px'
                    }}>Cancel</Button>
                    <Button onClick={onSubmit} sx={{
                        color: '#37407b',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        fontSize: '17px',
                        borderRadius: '20px'
                    }}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}