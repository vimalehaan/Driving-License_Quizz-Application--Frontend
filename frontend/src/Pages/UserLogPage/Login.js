import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';


import { AppBar, Typography, Snackbar, Alert } from '@mui/material';
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
import { useAuth } from '../../Components/AuthContext_Handle/Auth_Context.js';


function Login() {

    const classes = useStyle();
    const navigate = useNavigate();
    const {isAuthenticated,setIsAuthenticated,login} = useAuth();

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);


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
        } else { //
            setPasswordError('');
        }
        console.log(isValid)

        if (isValid) {
            try {
                const response = await axios.post('http://localhost:3001/api/auth/password', { email, password });

                if (response.data.data.accessToken) {
                    const token = response.data.data.accessToken;
                    localStorage.setItem("token", token);
                    login(token);

                    const decodedToken = jwtDecode(token);
                    const userID = decodedToken.userId;

                    if (isAuthenticated) {
                        if (decodedToken.userRole === "user") {
                            navigate('/carexamdb');
                        } else if (decodedToken.userRole === "admin") {
                            navigate('/addTest');
                        }
                    }
                } else {
                    console.error('No token received');
                    setErrorOpen(true);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setErrorOpen(true);
            }
        }

    };

    const handleForgotPassword = async () => {
        try {
            await axios.post('http://localhost:3001/api/auth/reset-password', { email });
            setSuccessOpen(true);
        } catch (error) {
            console.error('Error requesting password reset:', error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
        setErrorOpen(false);

    };

    const handleSignupLinkClick = () => {
        navigate('/social-login');
    };


    return (

        <div className='loginPage'>

            <Grid container className={classes.gridContainer} >
                {/* <Grid item lg={12}>
                    <Appbar />
                </Grid> */}
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
                                    />

                                    <Typography variant='h10' className={classes.typo} marginBottom={3} marginTop={-2} marginRight={34}><br></br>
                                        <Link
                                            href="#" underline="none" color='#09BCE0' onClick={handleForgotPassword}> {'Forget Password ?'} </Link>
                                    </Typography>

                                    <Button type="submit" sx={{ borderRadius: '20px', textTransform: 'none' }} className={classes.signButton} variant="contained" color='secondary'>Sign in</Button>
                                </Stack>
                            </form>
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={2}>

                                Don't you have an account? <Link href="#" underline="none" color='#09BCE0' onClick={handleSignupLinkClick }> {'Signup'} </Link>

                            </Typography> <br />
                            <Divider className={classes.divider} > or </Divider><br />
                            <Stack direction={'row'} spacing={1.5} marginTop={-1} >
                                <IconButton href = {'/social-login'} variant='outlined' size='large'><GoogleIcon color='primary' fontSize='large' /></IconButton>
                                <IconButton href = {'/social-login'} variant='outlined' size='large'><FacebookRoundedIcon color='primary' fontSize='large' /></IconButton>
                            </Stack>
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={1.5} width='45vh'>
                                By signing up to create an account I accept <br />Company’s <Link href="#" underline="none" color={'#09BCE0'}> {'Terms of Use and Privacy Policy'} </Link>
                            </Typography> <br />
                        </Stack>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    We have sent a link to your email address you provided. Click the link and change your password.
                </Alert>
            </Snackbar>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Unsuccessful login. Try again!
                </Alert>
            </Snackbar>

        </div>
    );
}


export default Login;