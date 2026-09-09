import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ComboBox from './FilterBox'


export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>

        <Box sx={{ bgcolor: '#F0F2F7', height: '100%', marginLeft: '90px', marginTop: '15px' }} >

          <ComboBox />

        </Box>


      </Container>
    </React.Fragment>
  );
}
