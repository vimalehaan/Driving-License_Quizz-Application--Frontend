import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const Answerbox = ({ open, questionDetails, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ borderRadius: '40px' }}>
      <DialogTitle>Question Details</DialogTitle>
      <DialogContent>
        <Typography variant="body1"><strong>Question:</strong> {questionDetails?.Questions}</Typography>
        <Typography variant="body1"><strong>Difficulty:</strong> {questionDetails?.difficulty}</Typography>
        <Typography variant="body1"><strong>Type:</strong> {questionDetails?.questionType}</Typography>
        
        {/* Display answers if they exist */}
        {questionDetails?.answers && (
          <div>
            <Typography variant="body1"><strong>Answers:</strong></Typography>
            <ul>
              {questionDetails.answers.map((answer, index) => (
                <li key={index}>
                  {answer.answer_text} - 
                  <Typography component="span" color={answer.isCorrect ? 'green' : 'red'}>
                    {answer.isCorrect ? 'Correct' : 'Wrong'}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Answerbox;
