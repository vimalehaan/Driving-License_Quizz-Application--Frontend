import * as React from 'react';
import { useContext } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';


export default function PostSubmitDialog({ open, onClose, onViewResult }) {


    return (
        <React.Fragment>
            <Dialog
                sx={{
                    ".MuiDialog-paper": {
                        minWidth: '615px',
                        borderRadius: '20px',
                        padding: '20px',
                        backgroundImage: 'url("./Images/circle-check.png")',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '190px',
                        backgroundPositionX: '440px',
                        backgroundPositionY: '13px',

                    }
                }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '27px', fontWeight: '200', color: '#388e3c' }}>
                Submission Successful
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ color: '' }}>
                        <Typography sx={{ width: '400px' }}>
                        Your answers have been submitted successfully!
                        </Typography>

                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'start', marginLeft: '10px' }}>
                    <Button onClick={onViewResult} sx={{
                        color: '#37407b',
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        fontSize: '17px',
                        borderRadius: '20px'
                    }}>View Result</Button>
                    
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}