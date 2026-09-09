import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';

const createSimulatorCard = (examNumber, title, image, description, hazards, videoLength) => {
  return (
    <Card key={examNumber} sx={{ width: 345,marginBottom:"10px",paddingBottom:"10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={`Simulator ${examNumber}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="#323A6E" align ="left">
            <b>{title}</b>
          </Typography>
          <Typography variant="body2" color="#323A6E" align ="left">
            {description}
          </Typography>
        </CardContent>
        {/* Grid for Additional Contents */}
        <Grid container spacing={2} direction="row">
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E"  align ="left" marginLeft="15px">
              <b>{hazards}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E"  align ="left">
              <b>{videoLength}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E"  align ="left" marginLeft="15px">
              Hazards
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="#323A6E"  align ="left">
              Video Length
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

const SimuH1 = () => {
  const simulators = [
    createSimulatorCard(1, 'Defensive Driving Hazard Simulator 1', '/images/s5.jpg', 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', 20, '1.30 Min'),
    createSimulatorCard(2, 'Defensive Driving Hazard Simulator 2', '/images/s6.jpg', 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', 20, '2.30 Min'),
    createSimulatorCard(3, 'Defensive Driving Hazard Simulator 3', '/images/s7.jpg', 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', 20, '2.00 Min'),
    createSimulatorCard(4, 'Defensive Driving Hazard Simulator 4', '/images/s8.jpg', 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', 20, '2.58 Min'),
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', overflowX: 'auto' }}>
      {simulators}
    </Box>
  );
};

export default SimuH1;
