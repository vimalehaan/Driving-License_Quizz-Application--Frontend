import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Box, CardActionArea, Grid } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const SimulatorCard = ({ examNumber, title, image, description, hazards, videoLength }) => {
  const [open, setOpen] = useState(false);

  const handlePremiumClick = () => {
    setOpen(false);
    // Add your logic for navigating to the premium page here
  };

  return (
    <Card sx={{ width: 345, marginBottom: '10px', paddingBottom: '10px' }}>
      <CardActionArea onClick={() => setOpen(true)}>
        <CardMedia component="img" height="140" image={image} alt={`Simulator ${examNumber}`} />
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Lock Icon in the top-right corner */}
          <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
            <LockIcon />
          </Box>
        </Box>
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="#323A6E" align="left">
          <b>{title}</b>
        </Typography>
        <Typography variant="body2" color="#323A6E" align="left">
          {description}
        </Typography>
      </CardContent>
      {/* Grid for Additional Contents */}
      <Grid container spacing={2} direction="row">
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
            <b>{hazards}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align="left">
            <b>{videoLength}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
            Hazards
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align="left">
            Video Length
          </Typography>
        </Grid>
      </Grid>

      {/* Dialog for premium message */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{"Wanna try premium?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upgrade to premium to unlock additional features and benefits!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePremiumClick} style={{ backgroundColor: '#6070D4', color: '#fff' }}>
            Go to Premium
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

const SimuH2 = () => {
  const simulators = [
    { examNumber: 1, title: 'Defensive Driving Hazard Simulator 1', image: '/images/s9.jpg', description: 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', hazards: 21, videoLength: '1.59 Min' },
    { examNumber: 2, title: 'Defensive Driving Hazard Simulator 2', image: '/images/s10.jpg', description: 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', hazards: 21, videoLength: '1.33 Min' },
    { examNumber: 3, title: 'Defensive Driving Hazard Simulator 3', image: '/images/s11.jpg', description: 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', hazards: 21, videoLength: '2.34 Min' },
    { examNumber: 4, title: 'Defensive Driving Hazard Simulator 4', image: '/images/s12.jpg', description: 'Watch a live action videoclip of real traffic situations and click (or tap) on the developing hazards. You’ll get points for spotting them as soon as they start to happen.', hazards: 21, videoLength: '2.00 Min' },
  ];

  const handlePremiumClick = () => {
    // Handle the redirection to premium
    alert("Redirecting to Premium");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', overflowX: 'auto' }}>
      {simulators.map((simulator) => (
        <SimulatorCard key={simulator.examNumber} {...simulator} handlePremiumClick={handlePremiumClick} />
      ))}
    </Box>
  );
};

export default SimuH2;
