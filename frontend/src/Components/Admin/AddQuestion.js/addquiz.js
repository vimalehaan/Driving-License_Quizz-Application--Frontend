import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { CusButtonPurp } from "../../Utils/StyledComponents";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const AddQuiz = ({ state, setOpen, selectedRows }) => {
  const [quizName, setQuizName] = useState('');
  const [quizType, setQuizType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [description, setDescription] = useState('');


  const handleQuizTypeChange = (event) => {
    const selectedType = event.target.value;
    const isCar = selectedType === 'Car';
    setQuizType(isCar);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateQuizClick = async () => {
    const questions = selectedRows.map(row => row.id);

    const data = {
      quizName,
      difficulty,
      quizType,
      questions,
      description
    };

    try {
      const response = await axios.post('http://localhost:3001/quiz/createQuiz', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Quiz created successfully:', response.data);
      handleClose();
    } catch (error) {
      console.error('There was an error creating the quiz:', error);
    }
  };

  return (
    <div>
      <Dialog open={state} onClose={handleClose}>
        <DialogTitle>Create a New Quiz</DialogTitle>
        <DialogContent>
          {selectedRows.length > 0 ? (
            selectedRows.map(row => (
              <ul key={row.id}>
                <li>
                  <Typography>{row.questionText}</Typography>
                </li>
              </ul>
            ))
          ) : (
            <Typography>No questions selected.</Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="Quiz Name"
            label="Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
          <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '0.1px' }} size="large">
            <InputLabel id="quiz-type-label">Quiz Type</InputLabel>
            <Select
              labelId="quiz-type-label"
              id="quiz-type"
              value={quizType ? 'Car' : 'Commercial Vehicle'}
              label="Quiz Type"
              onChange={handleQuizTypeChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Commercial Vehicle">Commercial Vehicle</MenuItem>
              <MenuItem value="Car">Car</MenuItem>
            </Select>
          </FormControl>


          <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '0.1px' }} size="large">
            <InputLabel id="difficulty-label">Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              value={difficulty}
              label="Difficulty"
              onChange={handleDifficultyChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Easy">Easy</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            name="Quiz Description"
            label="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <CusButtonPurp
            onClick={handleCreateQuizClick}
            disabled={quizName === '' || quizType === '' || difficulty === ''}
            sx={{ width: '120px', fontWeight: '40px', marginTop: '80px' }}
          >
            <Typography fontSize={16} sx={{ margin: '-2px -6px 0px 0px' }}>Create Quiz</Typography>
            <NavigateNextIcon sx={{ marginRight: '-8px' }} />
          </CusButtonPurp>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuiz;
