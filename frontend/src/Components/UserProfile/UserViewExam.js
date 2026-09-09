import React from 'react'
import { useState, useContext } from 'react';

import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import { Gauge } from '@mui/x-charts/Gauge';

import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckIcon from '@mui/icons-material/Check';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// import { SpecificQuizContext } from '../../Pages/UserProfile';
import { SpecificQuizContext } from '../Utils/Contexts';

import QuestionBox from './QuestionBox';
import QuizzDetails from './QuizDetailComponent';
import { WhitePaper } from '../Utils/StyledComponents';

const getBackgroundColor = (answers) => {
    const hasWrongAnswer = answers.some(answer => !answer.isSelected && answer.isCorrect);
    return hasWrongAnswer ? '#ffeff1' : '#f3f9ed';
};

function UserExamView() {

    const { questionViewData, currentQuestionIndex, setCurrentQuestionIndex } = useContext(SpecificQuizContext);

    console.log("QQQQ " +questionViewData.quiz_id.questions)





    return (
        <Grid item xs ={12} lg={12} sx={{display: 'flex'}}>
            
        <Box sx={{display: 'flex'}}>
            <WhitePaper
                sx={{
                    padding: '50px 50px 20px 50px',

                }}>
                <Stack direction={"column"} spacing={2} sx={{ textAlign: 'left' }}>
                    <Grid container justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <QuizzDetails />
                            <Box sx={{marginTop: '25px'}}>
                                <QuestionBox />
                            </Box>
                        </Grid>

                    </Grid>
                </Stack>
            </WhitePaper>
        </Box>

        </Grid>
    );
}

export default UserExamView;