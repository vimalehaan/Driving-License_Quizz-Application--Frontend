
import React from 'react';
import { AppBar, Typography, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
// import useStyle from "./LoginStyle.jsx";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
//import  '../Components/Loginpg/Appbar.js';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './Login.css';

export const Appbar = () => {
  return (
    <Box sx = {{display:"flex", justifyContent:"center",}} >
   <AppBar position="static" sx={{backgroundColor:"#F0F2F7" , height:"58px", width:"1520px", borderRadius:"20px",marginTop:"-70px" }}>
   <Toolbar>

       <Typography variant="h6" component="div" sx={{paddingLeft:"43px",paddingRight:"850px"}} >
       <span className="inter-font">C</span>
       <span className="inter-font2">obit</span>
       </Typography>


       <Button component="div" variant="h6" >
           
           <span className="inter-font3" >Login</span>
           <span className="inter-font3">Premium Login</span>
           <span className="inter-font3">Help</span>  
       </Button>
      
   </Toolbar>
   </AppBar>
</Box>


  )
}