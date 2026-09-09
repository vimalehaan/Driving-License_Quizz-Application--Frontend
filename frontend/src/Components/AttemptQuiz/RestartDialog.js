import * as React from 'react';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

export default function RestartDialog({ open, onClose, onRestart, timeLeft }) {


    // const handleClose = () => {
    //     setOpen(false);
    // };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={onClose}
                // open = {true}
                // onClose={timeLeft === 0 ? true : handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    ".MuiDialog-paper": {
                        minWidth: '615px',
                        borderRadius: '20px',
                        padding: '20px',
                        backgroundImage: 'url("./Images/restart_icon.png")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '190px',
                        backgroundPositionX: '440px',
                        backgroundPositionY: '27px',

                    }
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '27px', fontWeight: '200', color: '#f57c00' }}>
                    {"Confirm restart?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: '', }}>
                        <Typography sx={{ width: '400px' }}>
                            All your current answers will be lost, and one attempt will be deducted from your 3-attempt limit.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'start', marginLeft: '10px' }}>
                    <Button onClick={onClose} sx={{
                        color: '#37407b',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        fontSize: '17px',
                        borderRadius: '20px',
                        marginRight: '10px'
                    }}>Cancel</Button>
                    <Button onClick={onRestart} sx={{
                        color: '#37407b',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        fontSize: '17px',
                        borderRadius: '20px'
                    }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}