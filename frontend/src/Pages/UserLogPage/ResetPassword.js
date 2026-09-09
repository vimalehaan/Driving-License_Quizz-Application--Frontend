import React, {useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { AppBar, Typography , Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { Appbar } from '../../Components/UserLog/AppBar.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import useStyle from "../../Components/UserLog/LogStyle.jsx";
import '../../Components/UserLog/Login.css';
import axios from 'axios';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResetPassword() {

    const classes = useStyle();
    const navigate = useNavigate();

    const outerTheme = createTheme({
        palette: {
            primary: {
                main: '#e3f2fd',
                dark: '#e3f2fd'
                // contrastText: '#fff'
            },
            secondary: {
                main: '#6070D4'
            }
        },
    });

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const query = useQuery();
    const token = query.get('token');


    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    

    const handleSubmit = async(event) => {

        event.preventDefault();
        let isValid = true;

        if (!validatePassword(newPassword)) {
            setPasswordError('Password must be at least 8 characters, contain at least one lowercase letter, one uppercase letter, one digit, and one special character');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (isValid) {
            try {
                console.log("Sending request with password and token:" , newPassword, token);
                const response = await axios.post('http://localhost:3001/api/auth/new-password', {
                    password: newPassword,
                    token: token
                });

                if (response.status === 200) {
                    setSuccess(true);
                    setShowSignIn(true);
                } else {
                    setSuccess(false);
                }
                setOpen(true);
            } catch (error) {
                console.error('Error updating password:', error);
                setSuccess(false);
                setOpen(true);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignIn = () => {
        navigate('/login');
    };

    return (

        <div className='ResetPasswordPage'>

            <Grid container className={classes.gridContainer} >
                <Grid item lg={12}>
                    <Appbar />
                </Grid>
                <Grid item lg={6}>
                    <img src="./Images/login.png" alt="Image" className={classes.loginImage} />
                </Grid>

                <Grid item alignItems='center' lg={6}>
                    <ThemeProvider theme={outerTheme}>
                        <Stack className={classes.formContainer} direction="column" spacing={0}>
                            <form onSubmit={handleSubmit}>
                                <Stack direction="column" >
                                    <TextField className={classes.textField}
                                        required
                                        type="password"
                                        label="New Password"
                                        name="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />

                                    <TextField className={classes.textField}
                                        required
                                        type="password"
                                        label="Confirm Password"
                                        name="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />
                                  
                                  
                                        <Button
                                            sx={{ borderRadius: '20px', textTransform: 'none' }}
                                            className={classes.signButton}
                                            variant="contained"
                                            color='secondary'
                                            type="submit"
                                        >
                                            Update
                                        </Button>
                                   

                                    {/* <Button type='submit' sx={{ borderRadius: '20px', textTransform: 'none' }} className={classes.signButton} variant="contained" color='secondary'>Update</Button> */}

                                    {showSignIn && (
                                        <Button
                                            sx={{ borderRadius: '20px', textTransform: 'none', marginTop: '10px' }}
                                            className={classes.signButton}
                                            variant="contained"
                                            color='secondary'
                                            onClick={handleSignIn}
                                        >
                                            Sign in
                                        </Button>
                                    )}
                                </Stack>
                            </form>
                            <br />
                            <Divider className={classes.divider} > or </Divider><br />
                            <Stack direction={'row'} spacing={1.5} marginTop={-1} >
                                <IconButton variant='outlined' size='large'><GoogleIcon color='primary' fontSize='large' /></IconButton>
                                <IconButton variant='outlined' size='large'><FacebookRoundedIcon color='primary' fontSize='large' /></IconButton>
                            </Stack>
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={1.5} width='45vh'>
                                By signing up to create an account I accept <br />Company’s <Link href="#" underline="none" color={'#09BCE0'}> {'Terms of Use and Privacy Policy'} </Link>
                            </Typography> <br />
                        </Stack>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
                    {success ? "Updated successfully" : "Update unsuccessful"}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default ResetPassword;