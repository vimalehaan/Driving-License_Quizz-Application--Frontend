import React from 'react'
import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';

import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';


import { WhitePaper } from '../Utils/StyledComponents';
import { QuizDataContext } from '../../Pages/UserProfile';
import { ExamViewContext } from '../../Pages/UserProfile';

export const useStylesOne = makeStyles((theme) => ({

}));



function QuizCard() {
    const { data, setCurrentQuestionIndex } = useContext(QuizDataContext);
    const {setShowExamView, setQuestionViewData} = useContext(ExamViewContext);

    const handleViewQuizContent = () => {
        setShowExamView(true);
        setQuestionViewData(data);
        setCurrentQuestionIndex(0)
    }
    console.log('key' +data._id)
   

    return (
        <WhitePaper 
        key={data._id}
        onClick={handleViewQuizContent}
        sx={{
            // backgroundColor:
            height: '160px',
            width: '285px',
            padding: '0px',
            backgroundImage: data.result ? 'url("./Images/circle-check-regular.png")' : 'url("./Images/circle-xmark-regular.png")',
            backgroundColor: data.result ? '#fcfffa' : '#fffafa',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '250px',
            backgroundPositionX: '120px',
            backgroundPositionY: '-15px',
            transition: 'transform 0.4s, box-shadow 0.4s, margin-top 0.4s',
            cursor: 'pointer',
            ":hover": {
                marginTop: '-10px',
                transform: 'scale(1.1)', // Enlarge the component on hover
                zIndex: 1, // Bring the component slightly forward
                boxShadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.1)',
            }
        }}>

            <Box sx={{ width: '300px', }}>
                <Box sx={{ margin: '15px', display: 'flex', justifyContent: 'start', }} >
                    <Stack direction={'column'} spacing={1}>
                        <Typography
                            align='left'
                            sx={{
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            {data.quiz_id.quizName}
                            <LocalFireDepartmentIcon
                                sx={{
                                    color:
                                        data.quiz_id.difficulty === 'Easy' ? '#09BCE0' :
                                            data.quiz_id.difficulty === 'Hard' ? '#9F69D5' :
                                                data.quiz_id.difficulty === 'Hardest' ? '#6070D4' : null,
                                    marginLeft: '1px',
                                    fontSize: '19px'
                                }} />
                        </Typography>

                        <Typography
                            align='left'
                            fontSize={'15px'}
                            sx={{
                                display: 'flex', alignItems: 'center'
                            }}>
                            <CalendarMonthIcon sx={{ fontSize: '17px', marginRight: '5px' }} />
                            {data.quiz_date.split("T")[0]}
                        </Typography>
                        {data.quiz_id.quizType ? <DirectionsCarIcon sx={{ fontSize: '80px' }} /> :
                            <DirectionsBusIcon sx={{ fontSize: '80px' }} />}
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}>
                    </Box>
                </Box>
            </Box>
        </WhitePaper>
    );
}

export default QuizCard;