// Intro.js
import React from 'react';
import Grid from '@mui/material/Grid';

const IntroductionSection = () => {
  return (
    <Grid container style={{ marginTop: '130px', marginBottom: '10%', borderRadius: '5%', padding: '1%', backgroundColor: 'white', maxWidth: '900px', margin: 'auto', height: '207px' }} spacing={3}>
      {/* Grid for <h2> content and text */}
      <Grid item xs={12} sm={8}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'justify', paddingRight: '20px' }}>
          <h2 style={{ color: '#323A6E', textAlign: 'justify', marginBottom: '10px' }}><b>Start Your FREE 2024 Practice Test Now</b></h2>
          <p style={{ textAlign: 'justify', maxWidth: '400px', color: '#323A6E', marginTop: '1%', marginBottom: '5px' }}>
            We are a driver education platform that empowers people to increase their knowledge of how to be safe behind the wheel. Through technology, we’ve simplified the process of preparing for the driver's knowledge exam and made it accessible to anyone who wants to drive.
          </p>
        </div>
      </Grid>

      {/* Grid for image on the right side */}
      <Grid item xs={12} sm={4}>
        <img src="/images/dri.jpg" alt='driving' style={{ marginTop: '1px', marginBottom: '20px', width: '100%', maxWidth: '302px', height: '187px' }} />
      </Grid>
    </Grid>
  );
};

export default IntroductionSection;
