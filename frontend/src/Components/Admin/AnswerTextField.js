import React from 'react';
import { useContext } from 'react';

import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

import { useStylesOne } from './Q&A_Container';

import { AnswerContext } from './Switch_Component';





export default function AnswerTextField() {
    const classes = useStylesOne();

    const { answers, setAnswers} = useContext(AnswerContext);

    const handleCheckboxChange = (event, index) => {
        const isChecked = event.target.checked;
        setAnswers(prevAnswers => {
          return prevAnswers.map((answer, i) => {
            if (i === index) {
              return { ...answer, isCorrect: isChecked };
            } else {
              return answer;
            }
          });
        });
      };

    const handleTextFieldChange = (event, index) => {
        const newText = event.target.value;
        setAnswers(prevAnswers => {
          return prevAnswers.map((answer, i) => {
            if (i === index) {
              return { ...answer, text: newText };
            } else {
              return answer;
            }
          });
        });
      };
      
    const outerTheme = createTheme({
        palette: {
            primary: {
                main: '#6070D4',
            },
        },
    });

    return (
        <div>
            {answers.map((answer, index) => (
                <Stack direction={'row'} sx={{ display: 'flex', justifyContent: 'center' }} key={index}>
                    <ThemeProvider theme={outerTheme}>
                        <Checkbox
                            icon={<RadioButtonUncheckedOutlinedIcon />}
                            checkedIcon={<TaskAltOutlinedIcon />}
                            sx={{ height: '100%', marginTop: '12px' }}
                            checked={answer.isCorrect}
                            onChange={(event) => handleCheckboxChange(event, index)}
                        />
                        <TextField
                            className={classes.SmallTextField}
                            id={`answer-${index}`}
                            maxRows={2}
                            placeholder={`Answer ${index + 1}`}
                            value={answer.text}
                            inputProps={{ color: 'blue' }}
                            sx={{ marginTop: '5px', marginLeft: '0px', width: '550px' }}
                            InputProps={{ sx: { borderRadius: '20px' } }}
                            onChange={(event) => handleTextFieldChange(event, index)}
                        />
                    </ThemeProvider>
                </Stack>
            ))}
        </div>
    )
}