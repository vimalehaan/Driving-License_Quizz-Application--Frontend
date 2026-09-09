import React from 'react'
import { useContext } from 'react';

import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';

import CircleIcon from '@mui/icons-material/Circle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ExamViewCauge from './ExamViewGauge';
import { CusButtonPurp } from '../Utils/StyledComponents';
import DirectionsCar from '@mui/icons-material/DirectionsCar';


// import { SpecificQuizContext } from '../../Pages/UserProfile';
import { SpecificQuizContext } from '../Utils/Contexts';
import DirectionsBus from '@mui/icons-material/DirectionsBus';


function QuizzDetails() {

    const { questionViewData } = useContext(SpecificQuizContext);
    console.log("grandChild: " + questionViewData._id)

    // if (!questionViewData) {
    //     // If questionViewData is null, render some fallback content or return null
    //     return <div>Loading...</div>;
    // }
    // // Check if questions array is not null before accessing its properties
    // if (!questionViewData || questionViewData.length === 0) {
    //     // If questions array is null or empty, render some fallback content or return null
    //     return <div>No questions available</div>;
    // }

    const correctQuestions = questionViewData.selectedAnswers.filter(question => question.selectedAnswer_id && question.selectedAnswer_id.isCorrect ).length;
    const inCorrectQuestions = questionViewData.selectedAnswers.length - correctQuestions;

    return (
        <div>
            <Grid container  >
                <Grid item xs={12} sx={{}}>
                    <Box sx={{ borderRadius: '20px', marginTop: '-20px' }} >
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

                        {/* <Rating name="size-medium" defaultValue={2} /> */}
                    </Box>
                </Grid>
                <Grid item xs={5} marginTop={'20px'}>
                    <Stack direction={'column'} spacing={1} sx={{ alignItems: 'left' }}>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocalFireDepartmentIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> {questionViewData.quiz_id.difficulty}
                        </Typography>
                        <Typography
                            sx={{ display: 'flex', alignItems: 'center' }}>
                            {questionViewData.quiz_id.quizType ?
                                <><DirectionsCar sx={{ fontSize: '20px', marginRight: '5px' }} /> Car </>:
                                <><DirectionsBus sx={{ fontSize: '20px', marginRight: '5px' }} /> Commercial </>}    
                        </Typography>
                        <Typography
                            sx={{ fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                            <CalendarMonthIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> {questionViewData.quiz_date.split("T")[0]}
                        </Typography>

                    </Stack>
                    <Box sx={{ marginTop: '10px' }}>
                        <Stack direction={'row'} sx={{ alignItems: 'center' }}>
                            <Stack direction={'column'}>
                                <Typography fontSize={'16px'}><CircleIcon sx={{ fontSize: '12px', color: '#37407b' }} /> {correctQuestions} Correct</Typography>
                                <Typography fontSize={'16px'}><CircleIcon sx={{ fontSize: '12px', color: '#FFD6D6' }} /> {inCorrectQuestions} Incorrect</Typography>
                            </Stack>
                            <Box>
                                <ExamViewCauge />
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={7} spacing={1} sx={{ color: '#7C7C91' }}>
                    <Typography fontFamily={"Passion One"} fontSize={70}>"</Typography>
                    <Typography sx={{ marginTop: '-45px' }}>
                        It’s not the worst thing that could happen. Getting
                        chased by a bull down a narrow street is quite possibly the worst thing that could happen.
                        Let’s give this another shot.
                    </Typography>
                    <Button href={'/carexamdb'} variant='filled' sx={{height: '30px',color: 'white', backgroundColor: '#6070d4', fontSize: '15px', borderRadius: '20px', marginTop: '15px', padding: '20px', ':hover': {color: 'white', backgroundColor: '#6070d4',} }}>Retry the quiz</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default QuizzDetails;