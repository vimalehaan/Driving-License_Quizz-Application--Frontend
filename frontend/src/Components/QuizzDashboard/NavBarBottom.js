import React, { useContext } from 'react';
import { Button, Box, Stack } from '@mui/material';

// import { Link } from 'react-router-dom';
import { ToggleContentContext } from '../Utils/Contexts';

const NavBarBottom = () => {
  const { isCarOpen, isCommercialOpen, setIsCarOpen, setIsCommercialOpen } = useContext(ToggleContentContext);

  const handleCarClick = () => {
    setIsCarOpen(true);
    setIsCommercialOpen(false);
  };

  const handleCommercialClick = () => {
    setIsCarOpen(false);
    setIsCommercialOpen(true);
  };

  return (


    <div className="exam-links" style={{display: 'flex', justifyContent: 'center'}}>
      
      <Box sx={{borderRadius: '20px', backgroundColor: '#e3e3e8', height: '42px', width: '410px',display: 'flex', justifyContent: 'center', alignItem: 'center',  }}>
        <Stack direction={'row'}>
          <Button onClick={handleCarClick} variant="text" color="inherit"
            sx={{
              marginTop: '5px',
              width: '200px',
              height: '32px',
              borderRadius: '20px',
              backgroundColor: isCarOpen ? "#6070D4" : null,
            
              color: isCarOpen ? "white" : "#7C7C91",
              '&:hover': {
                backgroundColor: isCarOpen ? "#6070D4" : null,
                color: isCarOpen ? "white" : "#7C7C91",
              }
            }}>
            Car Test
          </Button>

          <Button onClick={handleCommercialClick} variant="text" color="inherit"
            sx={{
              marginTop: '5px',
              height: '32px',
              width: '200px',
              borderRadius: '20px',
              backgroundColor: isCommercialOpen ? "#6070D4" : null,
              
              color: isCommercialOpen ? "white" : "#7C7C91",
              '&:hover': {
                backgroundColor: isCommercialOpen ? "#6070D4" : null,
                color: isCommercialOpen ? "white" : "#7C7C91",
              }
            }}>
            Commercial Test
          </Button>
        </Stack>

      </Box>


    </div>

  );
};

export default NavBarBottom;
