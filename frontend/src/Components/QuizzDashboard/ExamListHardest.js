import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const ExamListH2 = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePremiumClick = () => {
    // Implement the action when "Go to Premium" is clicked
    // For now, let's just close the dialog
    handleClose();
  };

  const createExamCard = (examNumber, title, image, description, questionRange, allowedMistakes) => {
    return (
      <Card key={examNumber} sx={{ width: 345, display: 'flex', flexDirection: 'column', marginBottom: '10px', paddingBottom: '10px' }}>
        <CardActionArea onClick={handleClickOpen}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={`Exam ${examNumber}`}
          />
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Lock Icon in the top-right corner */}
            <Box sx={{ position: 'absolute', top: 0, right: 0, padding: '8px' }}>
              <LockIcon />
            </Box>
          </Box>
        </CardActionArea>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" color="#323A6E" align="left">
              <b>{title}</b>
            </Typography>
            <Typography variant="body2" color="#323A6E" align="left">
              {description}
            </Typography>
          </CardContent>
          {/* Grid for Additional Contents */}
          <Grid container spacing={2} direction="row" sx={{ mt: 'auto' }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
                <b>{questionRange}</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
                <b>{allowedMistakes} Mistakes</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
                Questions
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="#323A6E" align="left" marginLeft="15px">
                Allowed to Pass
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', overflowX: 'auto' }}>
      {/* Use createExamCard function for each exam */}
      {createExamCard(1, 'Road Rules', '/images/img9.jpg', 'Covers more complex road situations: driving in fog, uncontrolled intersections, reporting an accident to the police, and more. We\'ve simplified the explanations to make each sign easier to understand and recall.', '1-50', '10')}
      {createExamCard(2, 'G1 Fines, Limits and Demerit Points', '/images/img10.jpg', 'Covers must-know topics such as fines, demerit points, traffic violations and speed limits. These are the toughest questions you’re likely to see on your exam. Make sure you\'ve mastered these before attempting your G1.', '1-50', '9')}
      {createExamCard(3, 'Hardest Marathon', '/images/img11.jpg', 'The Hardest Marathon is literally the hardest step. It contains all questions from this level. It’ll cycle through your missed questions until you answer each one correctly.', '1-60', '10')}
      {createExamCard(4, 'G1 Fines, Limits and Demerit Points', '/images/img12.jpg', 'Covers must-know topics such as fines, demerit points, traffic violations and speed limits. These are the toughest questions you’re likely to see on your exam. Make sure you\'ve mastered these before attempting your G1.', '51-90', '8')}

      {/* Dialog for Premium Message */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Wanna try premium?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unlock more features and content with our premium subscription.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePremiumClick} style={{ backgroundColor: '#6070D4', color: '#fff' }}>
            Go to Premium
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExamListH2;
