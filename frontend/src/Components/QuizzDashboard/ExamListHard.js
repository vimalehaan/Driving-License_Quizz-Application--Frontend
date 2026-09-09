import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

const createExamCard = (examNumber, title, image, description, rangeStart, rangeEnd, mistakes) => {
  return (
    <Card key={examNumber} sx={{ width: 345, display: 'flex', flexDirection: 'column',marginBottom:"10px",paddingBottom:"10px"}}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={`Exam ${examNumber}`}
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
      <Grid container spacing={2} direction="row" sx={{ mt: 'auto' }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align ="left" marginLeft="15px">
            <b>{`${rangeStart} - ${rangeEnd}`}</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align ="left">
            <b>{mistakes} Mistakes</b>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align ="left" marginLeft="15px">
            Questions
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="#323A6E" align ="left">
            Allowed to pass
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

const ExamListH1 = () => {
  const exams = [
    createExamCard(1, 'Road Rules', '/images/im5.jpg', 'Covers more complex road situations: driving in fog, uncontrolled intersections, reporting an accident to the police, and more. We\'ve simplified the explanations to make each sign easier to understand and recall.', 1, 50, 10),
    createExamCard(2, 'G1 Fines, Limits and Demerit Points', '/images/img6.jpg', 'Covers must-know topics such as fines, demerit points, traffic violations, and speed limits. These are the toughest questions you’re likely to see on your exam. Make sure you\'ve mastered these before attempting your G1.', 1, 50, 8),
    createExamCard(3, 'Hardest Marathon', '/images/img7.jpg', 'The Hardest Marathon is literally the hardest step. It contains all questions from this level. It’ll cycle through your missed questions until you answer each one correctly.', 1, 90, 0),
    createExamCard(4, 'G1 Fines, Limits and Demerit Points', '/images/img8.jpg', 'Covers must-know topics such as fines, demerit points, traffic violations, and speed limits. These are the toughest questions you’re likely to see on your exam. Make sure you\'ve mastered these before attempting your G1.', 51, 90, 8),
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', width: '80vw', overflowX: 'auto' }}>
      {exams}
    </Box>
  );
};

export default ExamListH1;
