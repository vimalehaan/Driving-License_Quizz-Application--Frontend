import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography,Snackbar, Alert,Checkbox,FormControlLabel} from '@mui/material';
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

function Signup() {

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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState('');


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password must be at least 8 characters and satisfy the following rules
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        let isValid = true;
        console.log('asdas');
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must contain at least 8 characters including 1 uppercase, 1 lowercase, 1 number, and 1 special character');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (firstName.trim() === '' || lastName.trim() === '') {
            // Display error message or handle as appropriate
            isValid = false;
        }

        if (!termsAccepted) {
            setTermsError('You must accept the terms and conditions');
            isValid = false;
        } else {
            setTermsError('');
        }

        if (isValid) {

            try {
                const response = await axios.post('http://localhost:3001/api/auth/create', {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                console.log('User registered successfully:', response.data);
                navigate('/login');

            } catch (error) {
                if (error.response && error.response.data.message === 'user_exists_social_auth') {
                    console.error('User already exists with social account');
                    setAlertMessage('User already exists with social account');
                    setErrorOpen(true);
                } else {
                    console.error('Error registering user:', error);
                    setErrorOpen(true);
                }
            }
        }

    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const handleLoginLinkClick = () => {
        navigate('/login');
    };



    return (

        <div className='SignupPage'>

            <Grid container className={classes.gridContainer} >
                
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
                                        label="FirstName"
                                        name="FirstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />

                                    <TextField className={classes.textField}
                                        required
                                        label="LastName "
                                        name="LastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />
                                    <TextField className={classes.textField}
                                        required
                                        label="Email "
                                        name="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!emailError}
                                        helperText={emailError}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />

                                    <TextField className={classes.textField}
                                        required
                                        type="password"
                                        label="Password"
                                        name="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    /> <br></br>

                                    <TextField
                                        className={classes.textField}
                                        required
                                        type="password"
                                        label="Confirm Password"
                                        name="ConfirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        error={!!confirmPasswordError}
                                        helperText={confirmPasswordError}
                                        InputProps={{ sx: { borderRadius: '20px' } }}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={termsAccepted}
                                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                                name="terms"
                                                color="primary"
                                            />
                                        }
                                        label="I accept the terms and conditions"
                                    />
                                    {termsError && (
                                        <Typography color="error" variant="body2">
                                            {termsError}
                                        </Typography>
                                    )}

                                    <Button type="submit" sx={{ borderRadius: '20px', textTransform: 'none' }} className={classes.signButton} variant="contained" color='secondary'>Sign up</Button>
                                </Stack>
                            </form>
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={2}>

                                Already have an account? <Link href="#" underline="none" color='#09BCE0' onClick={handleLoginLinkClick}> {'Login'} </Link>

                            </Typography> <br />
                            <Divider className={classes.divider} > or </Divider><br />
                            <Stack direction={'row'} spacing={1.5} marginTop={-1} >
                                <IconButton href='/social-login' variant='outlined' size='large'><GoogleIcon color='primary' fontSize='large' /></IconButton>
                                <IconButton href='/social-login' variant='outlined' size='large'><FacebookRoundedIcon color='primary' fontSize='large' /></IconButton>
                            </Stack>
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={1.5} width='45vh'>
                                By signing up to create an account I accept <br />Company’s <Link href="#" underline="none" color={'#09BCE0'}> {'Terms of Use and Privacy Policy'} </Link>
                            </Typography> <br />
                        </Stack>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                User already exists with social account
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Signup;