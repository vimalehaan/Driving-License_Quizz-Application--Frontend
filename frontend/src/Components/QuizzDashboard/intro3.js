// intro3.js
import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const IntroductionSection = () => {
  return (
    <Grid container style={{ marginTop: '20px', marginBottom: '20px', marginLeft: '120px', borderRadius: '10%', padding: '20px', backgroundColor: 'white', maxWidth: '800px' }} spacing={3}>
      {/* Grid for h2 content on top */}
      <Grid item xs={12}>
        <h2 style={{ color: '#323A6E', textAlign: 'left', marginLeft: 0 }}><b>Exam Simulator</b></h2>
      </Grid>

      {/* Image on the left side */}
      <Grid item xs={12} sm={7}>
        <img src="/images/simu.jpg" alt='driving' style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      </Grid>

      {/* Grid for additional content in the right column */}
      <Grid item container xs={12} sm={5} spacing={2} direction="column">
        <Grid item>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'justify' }}>
            <h3 style={{ color: '#323A6E' ,marginLeft:'10px'}}><b>G1 Exam Simulator</b></h3>
            <p style={{ textAlign: 'justify', marginTop: '-10px', marginLeft: '10px' }}>
              Just like the real G1 test: mimics the experience of a G1 exam, pulling random questions from a huge database. The same number of
              questions and passing score. No hints or explanations, new questions every time you restart. Stops when you've reached the passing or failing score
            </p>
          </div>
        </Grid>
        {/* Additional content sections */}
        <Grid item container spacing={2}>
          {/* Adjust the styles accordingly */}
          <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align="left" style={{ marginLeft: "10px" }}>

              <b>20 Random</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left" style={{ marginLeft: "10px" }}>
              <b>4 Mistakes</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left" style={{ marginLeft: "10px" }}>
              Questions
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E" align="left"style={{ marginLeft: "10px" }}>
              Allowed to pass
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default IntroductionSection;
