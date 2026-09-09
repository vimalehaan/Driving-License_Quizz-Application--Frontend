// Intro2.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const IntroductionSection = () => {
  return (
    <Grid container style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '120px', borderRadius: '10%', padding: '20px', backgroundColor: 'white', maxWidth: '800px' }} spacing={3}>
      {/* Grid for h2 content on top */}
      <Grid item xs={12}>
        <h2 style={{ color: '#323A6E', textAlign: 'left', marginLeft: 0, marginBottom: '-40px' }}><b>Diagnostic Test</b></h2>
      </Grid>

      {/* Image on the left side */}
      <Grid item xs={12} sm={7}>
        <img src="/images/diag.jpg" alt='driving' style={{ marginTop: '40px', width: '100%', maxWidth: '700px', marginRight: '20px', height: '100%' }} />
      </Grid>

      {/* Grid for additional content in the right column */}
      <Grid item container xs={12} sm={5} spacing={2} direction="column" style={{ marginTop: '10px' }}>
        <Grid item>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'justify' }}>
            <h3 style={{ color: '#323A6E', marginBottom: '5px' }}><b>G1 Diagnostic Test</b></h3>
            <p style={{ textAlign: 'justify', marginBottom: '40px' }}>
              Just starting to prepare for the exam and not sure where to begin? Quickly identify gaps in your knowledge of driving in Ontario, Canada with this G1 Diagnostic Test. It contains the questions that are most often missed by our users.
            </p>
          </div>
        </Grid>
        {/* Additional content sections */}
        <Grid item container spacing={2}>
          {/* Adjust the styles accordingly */}
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left">
              <b>15</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left">
              <b>3 Mistakes</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left">
              Questions
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left">
              Allowed to Pass
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IntroductionSection;
