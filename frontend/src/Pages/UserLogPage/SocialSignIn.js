import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Typography ,Snackbar,Alert} from '@mui/material';
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
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function SocialSignIn() {

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
                main: '#F0F2F7'

            }
        },
    });

    const [errorOpen, setErrorOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
    };

    const componentClicked = (event) => {
        console.log(event)
    }

    const responseFacebook = async (response) => {
        if (response.accessToken) {
            try {
                const res = await axios.post('http://localhost:3001/api/auth/token/exchange', {
                    socialAccessToken: response.accessToken,
                    platform: 'facebook'
                });

                if (res.data.data.accessToken) {
                    localStorage.setItem("token", res.data.data.accessToken);
                    navigate('/carexamdb');
                } else {
                    console.error('No token received from Facebook signup');
                    
                    setErrorOpen(true);
                }

            } catch (error) {
                if (error.response && error.response.data.message === 'user_exists_password_auth') {
                    console.error('User already exists with email and password');
                    setAlertMessage('User already exists with email and password');
                    setErrorOpen(true);
                } else {
                    console.error('Error during Facebook signup:', error);
                    
                    setErrorOpen(true);
                }
            }}
    };

    const responseGoogle = async (response) => {
        console.log(response);
        if (response.access_token) {
            try {
                const res = await axios.post('http://localhost:3001/api/auth/token/exchange', {
                    socialAccessToken: response.access_token,
                    platform: 'google'
                });

                if (res.data.data.accessToken ) {
                    localStorage.setItem("token",res.data.data.accessToken);
                    navigate('/carexamdb');
                } else {
                    console.error('No token received from Google signup');
                    setErrorOpen(true);
                }

            } catch (error) {
                if (error.response && error.response.data.message === 'user_exists_password_auth') {
                    console.error('User already exists with email and password');
                    setAlertMessage('User already exists with email and password');
                    setErrorOpen(true);
                } else {
                    console.error('Error during Google signup:', error);
                    setErrorOpen(true);
                }
            }
        }
    };

    const handleEmailClick = () => {
        navigate('/signup');
    };

    const openGoogleWindow = useGoogleLogin({
        onSuccess: tokenResponse => responseGoogle(tokenResponse),
        onFailure: tokenResponse => responseGoogle(tokenResponse),
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);

    };

    const handleLogInLinkClick = () => {
        navigate('/login');
    };


    return (

        <div className='loginPage'>
                
            <Grid container className={classes.gridContainer} >
                <Grid item lg={6}>
                    <img src="./Images/login.png" alt="Image" className={classes.loginImage} />
                </Grid>

                <Grid item alignItems='center' lg={6}>
                    <ThemeProvider theme={outerTheme}>
                        <Stack className={classes.formContainer} direction="column" spacing={0}>
                            <form onSubmit={handleSubmit}>
                                <Stack direction="column" spacing={4}>

                                            <Button
                                                onClick={() => openGoogleWindow()}
                                                sx={{ borderRadius: '20px', textTransform: 'none', color: '#323A6', fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
                                                className={classes.signButton}
                                                variant="contained"
                                                color='secondary'
                                            >
                                                <img src='\Images\google icon.png' style={{ marginRight: '20px' }} alt="Google icon" />
                                                Signup with Google
                                            </Button>
                                    

                                    <FacebookLogin
                                        appId="2855786357905495"
                                        autoLoad={false}
                                        fields="name,email"
                                        onClick={componentClicked}
                                        callback={responseFacebook}
                                        render={renderProps => (
                                            <Button
                                                onClick={renderProps.onClick}
                                                sx={{ borderRadius: '20px', textTransform: 'none', color: '#323A6', fontSize: '20px', fontFamily: 'Inter, sans-serif' }}
                                                className={classes.signButton}
                                                variant="contained"
                                                color='secondary'
                                            >
                                                <img src='\Images\facebook icon.png' style={{ marginRight: '20px' }} alt="Facebook icon" />
                                                Signup with Facebook
                                            </Button>



                                        )}
                                    />


                                </Stack>
                            </form>

                            <Divider className={classes.divider} sx={{ marginTop: '40px', marginBottom: '20px' }}> or </Divider><br />
                            <Button 
                            onClick={handleEmailClick}
                            sx={{ border: '1px solid #F0F2F7', borderRadius: '17px', textTransform: 'none', color: '#F0F2F7', fontSize: '20px', fontFamily: 'Inter, sans-serif', backgroundColor: 'transparent' }}
                             className={classes.signButton} 
                             variant="contained" 
                             >Continue with E-mail
                             </Button>

                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={1}>

                                Already have an account? <Link href="#" underline="none" color='#09BCE0' onClick={handleLogInLinkClick}> {'Login'} </Link>

                            </Typography> <br />
                            <Typography variant='h9' className={classes.typo} marginBottom={0} marginTop={1.5} width='45vh'>
                                By signing up to create an account I accept <br />Company’s <Link href="#" underline="none" color={'#09BCE0'}> {'Terms of Use and Privacy Policy'} </Link>
                            </Typography> <br />
                        </Stack>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                User already exists with email and password
                </Alert>
            </Snackbar>
        </div>
    );
}

export default SocialSignIn;