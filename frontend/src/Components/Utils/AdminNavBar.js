// NavBarTop.js (Top Navigation Bar)
import React from 'react';
import { createContext } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';



const AdminNavBar = () => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>


      <AppBar
        position='fixed'
        sx={{
          backgroundColor: "#F0F2F7",
          borderRadius: '20px',
          border: '2px solid white',
          marginTop: '0px',
          width: '100%',
        }}>
        {/* <Container> */}


          <Toolbar >
            <Typography variant="h6" component="div" className="brand" sx={{ marginRight: 'auto', marginLeft: '20px' }}>
              <span style={{ color: '#09BCE0', fontWeight: 'bold' }}>C</span>
              <span style={{ color: '#323A6E', fontWeight: 'bold' }}>oBit</span>
            </Typography>
            <div className="links">
              <Link href="/addTest" color="inherit" underline="none" sx={{ marginRight: 2, color: '#323A6E' }}>
                <b>Questions</b>
              </Link>
              <Link href="/quizedit" color="inherit" underline="none" sx={{ marginRight: 2, color: '#323A6E' }}>
                <b>Quizzes</b>
              </Link>
              <Link href="/transaction" color="inherit" underline="none" sx={{ marginRight: 2, color: '#323A6E' }}>
                <b> Transactions</b>
              </Link>
              <Link href="/profile" color="inherit" underline="none" sx={{ marginRight: 2, color: '#323A6E' }}>
                <b> UserLog</b>
              </Link>
            </div>
          </Toolbar>
        {/* </Container> */}
      </AppBar>
    </Box>

  );
};

export default AdminNavBar;
