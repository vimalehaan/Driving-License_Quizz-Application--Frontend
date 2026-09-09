import React from 'react'
import { useContext, useState } from 'react';

import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SpecificQuizContext } from "../Utils/Contexts";



function QuizQuestions() {
    const { questionViewData, currentQuestionIndex, setCurrentQuestionIndex, userAnswer, setUserAnswer } = useContext(SpecificQuizContext);

    const currentQuestion = questionViewData.selectedAnswers[currentQuestionIndex];
    const totalQuestions = questionViewData.selectedAnswers.length;
    const answersData = currentQuestion.question_id.answers;

    const handleAnswerChange = (event) => {
        const newAnswers = [...userAnswer];
        newAnswers[currentQuestionIndex] = event.target.value;
        setUserAnswer(newAnswers);
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };
    console.log("image::", currentQuestion)

    return (
        <div>

            <Box key={currentQuestionIndex}
                sx={{
                    // backgroundColor: currentQuestion.selectedAnswer_id.isCorrect ? '#edeff7' : '#FFF7F7',
                    borderRadius: '20px',
                    p: '20px',
                    textAlign: 'left'
                }}>
                <Stack direction={'row'} spacing={2}
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                    <Typography variant="inherit" fontSize={17} fontWeight={600}>
                        Question {currentQuestionIndex + 1}
                    </Typography>
                </Stack>
                {currentQuestion.question_id.imageUrl ?
                    <Box
                        sx={{
                            marginTop: '15px',
                            width: '100%', // Width of the box
                            height: "250px", // Height of the box
                            overflow: 'hidden', // Ensures the image does not overflow the box
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '20px', // Optional: Add border radius for rounded corners
                            // backgroundColor: '#f9f9f9' // Optional: Background color
                        }}
                    >

                        <img src={currentQuestion.question_id.imageUrl}
                            style={{
                                width: '100%',
                                height: '100%', //auto
                                objectFit: 'contain', //cover
                            }}
                        />
                    </Box>
                    : null

                }


                <Typography align='left' fontSize={20} fontWeight={700} sx={{ margin: '15px 0 0 0px', }}>
                    {currentQuestion.question_id.question_text}
                </Typography>
                <FormControl>
                    <RadioGroup value={userAnswer[currentQuestionIndex]} onChange={handleAnswerChange}>
                        <Stack direction={"column"} spacing={1} sx={{ textAlign: 'left', margin: '15px 0 0 10px' }}>
                            {answersData && answersData.map((answer, answerIndex) => (
                                <FormControlLabel
                                    sx={{ width: '600px', borderRadius: '15px', "&:hover": { backgroundColor: '#f2f2f2' } }}
                                    value={answer._id}
                                    control={<Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: "#37407b",
                                            }
                                        }}
                                    />}
                                    label={answer.answer_text} />
                            ))}
                        </Stack>
                    </RadioGroup>
                </FormControl>

            </Box>

            <Box xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                <Stack direction={'row'} spacing={2}>
                    <IconButton size='small' onClick={handlePrevQuestion} sx={{ border: '1px solid #7C7C91' }}> <NavigateBeforeIcon /></IconButton>
                    <IconButton size='small' onClick={handleNextQuestion} sx={{ border: '1px solid #7C7C91' }}> <NavigateNextIcon /></IconButton>
                </Stack>
            </Box>

        </div>
    );
}

export default QuizQuestions;