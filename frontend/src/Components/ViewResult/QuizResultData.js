import React from 'react'
import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";


import CircleIcon from '@mui/icons-material/Circle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayIcon from '@mui/icons-material/Replay';

import { SpecificQuizContext } from '../Utils/Contexts';

function QuizResultComponent() {

    const { questionViewData } = useContext(SpecificQuizContext);
    const correctQuestions = questionViewData.selectedAnswers.filter(
        question => question.selectedAnswer_id && question.selectedAnswer_id.isCorrect
    ).length;
    const inCorrectQuestions = questionViewData.selectedAnswers.length - correctQuestions;

    const correctPercentage = Math.round(correctQuestions / questionViewData.selectedAnswers.length * 100)
    const incorrectPercentage = 100 - correctPercentage;
    console.log('per: ' + questionViewData.quiz_id.quizName)



    return (
        <Stack direction={'column'} spacing={3} sx={{ alignItems: 'center', textAlign: 'left' }}>
            <Box sx={{ display: 'flex', alignItems: 'start', width: '90%' }}>
                <Stack direction={'column'} spacing={2} sx={{ alignItems: 'start', }}>
                    <Stack direction={'row'} spacing={0.5} sx={{ alignItems: 'center' }}>
                        <Typography fontSize={23} fontWeight={700} >{questionViewData.quiz_id.quizName}</Typography>
                        {/* <DirectionsCar sx={{ fontSize: '27px' }} /> */}
                        {questionViewData.result
                            ? <CheckCircleIcon fontSize='medium'
                                sx={{
                                    color: '#37407b',
                                }} />
                            : <CancelIcon fontSize='medium'
                                sx={{
                                    color: '#FF8585',
                                }} />
                        }
                    </Stack>
                    <Stack direction={'column'} sx={{ alignItems: 'start', }}>
                        <Typography fontSize={'16px'}><CircleIcon sx={{ fontSize: '12px', color: '#37407b' }} /> {correctQuestions} Correct</Typography>
                        <Typography fontSize={'16px'}><CircleIcon sx={{ fontSize: '12px', color: '#FFD6D6' }} /> {inCorrectQuestions} Incorrect</Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box sx={{ width: '90%', position: 'relative' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '-20px' }}>
                    <Paper sx={{ backgroundColor: '#37407b', height: '30px', width: `${correctPercentage}%`, borderRadius: '8px', marginRight: '3px', boxShadow: 'none' }} />
                    <Paper sx={{ backgroundColor: '#FFD6D6', height: '30px', width: `${incorrectPercentage}%`, borderRadius: '8px', boxShadow: 'none', position: 'relative' }} />
                </Box>

                {!questionViewData.result ?
                    <Divider orientation="vertical" variant="middle" sx={{ height: '17px', position: 'absolute', left: '80%', top: '-2px', border: '1px solid #37407b' }} />
                    : null
                }

                <Box sx={{ position: 'absolute', marginLeft: '-55px', left: `${correctPercentage}%`, top: '25px', textAlign: 'right' }}>
                    <ArrowDropUpIcon />
                    <Typography fontSize={'15px'}
                        sx={{
                            fontWeight: 'bold',
                            position: 'relative',
                            right: correctPercentage <= 15 ? '-6px' : '8px',
                            top: '-10px'
                        }}> {correctPercentage}%</Typography>
                    <Typography fontSize={'13px'}
                        sx={{
                            color: '#7C7C91',
                            position: 'relative',
                            right: correctPercentage <= 15 ? '-40px' : '8px',
                            top: '-14px'
                        }}> Your Score</Typography>
                </Box>

                {!questionViewData.result ?
                    <Box sx={{ position: 'absolute', marginLeft: '-11px', left: "80%", top: '25px', textAlign: 'left' }}>
                        <ArrowDropUpIcon />
                        <Typography fontSize={'15px'} sx={{ fontWeight: 'bold', position: 'relative', left: '10px', top: '-10px' }}> 80%</Typography>
                        <Typography fontSize={'13px'} sx={{ color: '#7C7C91', position: 'relative', left: '10px', top: '-14px' }}>To pass</Typography>
                    </Box>
                    : null
                }
                {/* <ExamViewCauge /> */}

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'start', width: '100%',  }}>
                <Button endIcon={<ReplayIcon sx={{ marginLeft: '-6px', }} />} disableRipple variant="text" sx={{
                    marginTop: '25px' ,
                    fontSize: '16px', width: '80px', borderRadius: '20px', textTransform: 'none', color: '#37407b', "&:hover": {
                        backgroundColor: 'inherit', color: '#2C3BA0'
                    }
                }}>Retry</Button>
            </Box>
        </Stack>


    );
}

export default QuizResultComponent;