import React from "react";
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { SpecificQuizContext } from '../Utils/Contexts';
import { Typography } from "@mui/material";

function QuizQuestionButtons() {

    const { questionViewData, currentQuestionIndex, setCurrentQuestionIndex, userAnswer } = useContext(SpecificQuizContext);

    const handleQuestionView = (index) => {
        setCurrentQuestionIndex(index)
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', }}>
            <Stack direction={"column"} spacing={'20px'}>
                <Typography variant="inherit" fontSize={20} fontWeight={600} sx={{display:'flex', alignItems: 'start', color: '#37407b'}}>
                    {questionViewData.quiz_id.quizName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%', flexWrap: 'wrap', }}>

                {questionViewData.quiz_id.questions.map((question, index) => (
                    <Button
                        disableRipple
                        key={index}
                        variant="contained"
                        onClick={() => handleQuestionView(index)}
                        sx={{
                            color: userAnswer[index] === ''  ? '#37407b' : '#ffffff',
                            backgroundColor: userAnswer[index] === '' ? '#ffffff' : '#37407b',
                            border: "1.5px solid #37407b",
                            transform: index === currentQuestionIndex ? 'scale(1.12)' : 'inherit',
                            borderRadius: '8px',
                            boxShadow: index === currentQuestionIndex ? '0px 3px 5px 1px rgba(0, 0, 0, 0.3)' : 'inherit',
                            height: '32px',
                            width: '32px',
                            minWidth: '0',
                            padding: '14px',
                            margin: '4px', // Optional: Add margin between buttons
                            "&:hover": {
                                backgroundColor: userAnswer[index] === '' ? '#f2f2f2' : '#37407b'
                            },

                        }}
                    >
                        {index + 1}
                    </Button>
                ))}
                </Box>
            </Stack>

        </Box>
    );
}

export default QuizQuestionButtons;