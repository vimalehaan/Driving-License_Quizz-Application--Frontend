import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

const UpdateBox = ({
  state,
  setOpen,
  selectedQuestion,
  newQuestion,
  setNewQuestion,
  handleUpdate,
  handleAnswerChange,
  updatedAnswers,
  setUpdatedAnswers // Receive setUpdatedAnswers prop
}) => {
  const [difficulty, setDifficulty] = useState('');
  const [quizType, setQuizType] = useState(false); // Assuming quizType is boolean

  useEffect(() => {
    if (selectedQuestion) {
      setNewQuestion(selectedQuestion.questionText);
      setUpdatedAnswers(selectedQuestion.answers.map(answer => answer.answer_text));
      setDifficulty(selectedQuestion.difficulty);
      setQuizType(selectedQuestion.questionType === 'Car');
    }
  }, [selectedQuestion, setNewQuestion, setUpdatedAnswers]); // Include setNewQuestion and setUpdatedAnswers in dependencies

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleUpdate(selectedQuestion.id, newQuestion, updatedAnswers, quizType, difficulty);
  };

  return (
    <Dialog open={state} onClose={handleClose}>
      <DialogTitle>Update Question</DialogTitle>
      <DialogContent>
        <TextField
          label="Question"
          fullWidth
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          margin="dense"
        />
        {updatedAnswers.map((answer, index) => (
          <TextField
            key={index}
            label={`Answer ${index + 1}`}
            fullWidth
            value={answer}
            onChange={(e) => handleAnswerChange(e, index)}
            margin="dense"
          />
        ))}
        <FormControl component="fieldset" margin="dense" sx={{marginLeft:'14px',marginTop:'15px'}}>
          <FormLabel component="legend">Difficulty</FormLabel>
          <RadioGroup
            row
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <FormControlLabel value="Easy" control={<Radio />} label="Easy" />
            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
            <FormControlLabel value="Hard" control={<Radio />} label="Hard" />
          </RadioGroup>
        </FormControl>


        <FormControl component="fieldset" margin="dense" sx={{marginTop:'5px', marginLeft:'14px'}}>
          <FormLabel component="legend">Question Type</FormLabel>
          <RadioGroup
            row
            value={quizType}
            onChange={(e) => setQuizType(e.target.value === 'true')}
          >
            <FormControlLabel value={true} control={<Radio />} label="Car" />
            <FormControlLabel value={false} control={<Radio />} label="Commercial Vehicle" />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateBox;
