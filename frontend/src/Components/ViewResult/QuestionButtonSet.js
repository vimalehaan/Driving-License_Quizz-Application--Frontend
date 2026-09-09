import React from 'react'
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

import { SpecificQuizContext } from '../Utils/Contexts';

function QuestionButtons() {

    const {questionViewData, setCurrentQuestionIndex} = useContext(SpecificQuizContext);
    const [ buttonIndex, setButtonIndex ]= useState(null);

    const handleQuestionView = (index) => {
       setCurrentQuestionIndex(index);
       setButtonIndex(index);
    };

   

    return (
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', width: '100%' ,  flexWrap: 'wrap' }}>
            {questionViewData.selectedAnswers.map((question, index) => (
                
                <Button
                key={index}
                variant="contained"
                onClick={() => handleQuestionView(index)}
                sx={{
                    color:  question.selectedAnswer_id && question.selectedAnswer_id.isCorrect ? '#ffffff' : '#272d59',
                    backgroundColor: index !== buttonIndex ? (question.selectedAnswer_id && question.selectedAnswer_id.isCorrect  ? '#37407b' : '#FFD6D6') : (question.selectedAnswer_id && question.selectedAnswer_id.isCorrect  ? '#272d59' : '#FFC2C2'),
                    transform: index === buttonIndex ? 'scale(1.12)' : 'inherit',
                    borderRadius: '8px',
                    boxShadow: index === buttonIndex ? '0px 3px 5px 1px rgba(0, 0, 0, 0.3)' : 'inherit',
                    height: '32px',
                    width: '32px',
                    minWidth: '0',
                    padding: '14px',
                    margin: '4px', // Optional: Add margin between buttons
                    "&:hover": {
                        backgroundColor: question.selectedAnswer_id && question.selectedAnswer_id.isCorrect ? '#272d59' : '#FFC2C2',
                        boxShadow: '0px 3px 5px 1px rgba(0, 0, 0, 0.3)'
                      },
                    
                }}
            >
                {index + 1}
            </Button>
))}

        </Box>
    );
}

export default QuestionButtons;