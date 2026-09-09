import React from 'react'
import { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';


import Namecard from '../Components/UserProfile/NameCard'
import SideBar from '../Components/Admin/SideBar';
import UserSideBar from '../Components/UserProfile/UserSideBar';
import { WhitePaper } from '../Components/Utils/StyledComponents';
import BasicPie from '../Components/UserProfile/PieChart';
import PassRatioChart from '../Components/UserProfile/PassRatioChart';
import ExamTable from '../Components/UserProfile/ExamTable';
import { typographyTheme } from '../Components/Utils/TypographyTheme';
import UserExamView from '../Components/UserProfile/UserViewExam';
import QuizCard from '../Components/UserProfile/QuizCard';
import SimpleLineChart from '../Components/UserProfile/LineChart';
import Footer from '../Components/Utils/Footer';

import { QuizData } from '../Components/UserProfile/ExamTable';

import { SpecificQuizContext } from '../Components/Utils/Contexts';
import { useAuth } from '../Components/AuthContext_Handle/Auth_Context';

import NavBarTop from '../Components/Utils/NavBarTop';


export const RatioChartContext = createContext();
export const ChartDataContext = createContext();
export const ExamViewContext = createContext();
export const QuestionViewContext = createContext();
export const QuizDataContext = createContext();
// export const SpecificQuizContext = createContext();



function UserProfilePage() {
    const { userId } = useAuth();
    const [userDetail, setUserDetail] = useState({});

    const [attemptsData, setAttemptsData] = useState([]);
    const [questionViewData, setQuestionViewData] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    console.log('questionViewData:: ' + questionViewData._id)
    console.log('dataQst: ' + questionViewData.questions)

    const scrollRef = useRef(null);
    const cardWidth = 285; // Set the card width to your card's actual width
    const cardsToShow = 3
        ;
    const attempts = attemptsData.length;
    const completed = attemptsData.filter(data => data.result).length;

    const [showExamView, setShowExamView] = useState(false);
    const userExamViewRef = useRef(null);

    useEffect(() => {

        const fetchQuizzes = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get(`http://localhost:3001/user/${userId}`),
                    axios.get(`http://localhost:3001/getattempts/user/${userId}`)
                ]);
                setUserDetail(response1.data);
                setAttemptsData(response2.data);
                console.log('First API response:', userDetail);
                console.log('Second API response:', response2.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchQuizzes();
    }, []);

    console.log("attempt Data length: " + attemptsData.length)
    {
        attemptsData.map(attempts => (
            console.log("attempt Data: " + attempts.quiz_id.difficulty)
        ))
    }

    useEffect(() => {
        if (showExamView && userExamViewRef.current) {
            userExamViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showExamView]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollAmount = cardWidth * cardsToShow;
            scrollRef.current.scrollTo({
                left: scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
                behavior: 'smooth',
            });
        }
    };

    return (
        <ThemeProvider theme={typographyTheme}>
            <ChartDataContext.Provider value={{ attemptsData }}>
                <NavBarTop />
                <Container> 
                    {/* <Box sx={{ display: 'flex' }}>
                        {/* <UserSideBar /> */}


                    <Grid container spacing='30px' sx={{ marginTop: '0px', justifyContent: 'center', padding: '0 50px 0 50px'}}>
                        <Grid item lg='12' xs='12' sx={{ marginTop: '60px' }}>
                            <Typography fontSize={'25px'} fontWeight={600} textAlign={'left'}>Profile</Typography>
                        </Grid>
                        <Grid item lg='12' xs='12' sx={{marginTop:'-40px'}}>
                            <Namecard />
                        </Grid>
                        <Grid item lg='4.5' xs='4.5'>
                            <WhitePaper sx={{ height: '60px', display: 'flex', }}>
                                <Stack direction={'row'} flexGrow={1} >
                                    <Stack direction={'column'} sx={{ alignItems: 'center', justifyContent: 'center', flexBasis: '50%', textAlign: 'center' }}>
                                        <Typography fontSize={'32px'} fontWeight={650} sx={{ marginTop: '-6px' }}>{attempts}</Typography>
                                        <Typography fontSize={'15px'}>Attempts</Typography>
                                    </Stack>
                                    <Divider orientation="vertical" />
                                    <Stack direction={'column'} sx={{ alignItems: 'center', justifyContent: 'center', flexBasis: '50%' }}>
                                        <Typography fontSize={'32px'} fontWeight={650} sx={{ marginTop: '-6px' }}>{completed}</Typography>
                                        <Typography fontSize={'15px'}>Completed</Typography>
                                    </Stack>
                                </Stack>
                            </WhitePaper>
                            <WhitePaper sx={{ height: '230px', marginTop: '20px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
                                    <BasicPie />
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '0px', marginTop: '-50px' }}>
                                    <PassRatioChart difficulty='easy' />
                                    <PassRatioChart difficulty='hard' />
                                    <PassRatioChart difficulty='hardest' />
                                </Box>
                            </WhitePaper>


                        </Grid>
                        <ExamViewContext.Provider value={{ setShowExamView, setQuestionViewData }}>
                            <Grid item lg='7.5' xs='7.5'>
                                {/* <ExamTable /> */}
                                {/* <WhitePaper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '350px' }}> */}
                                {/* <SimpleLineChart /> */}
                                <img height='400px' src='./Images/progress.png' />
                                {/* </WhitePaper> */}
                            </Grid>

                            <Grid item lg='12' xs='12' sx={{ marginTop: '20px' }}>
                               
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <Stack direction={'row'} sx={{ display: 'glow', alignItems: 'center', margin: '0 0 -17px 40px' }}>

                                            <Typography align='left' fontSize='26px' fontWeight={'bold'}> Your Attempts   </Typography>
                                            {/* <DiamondIcon sx={{ color: '#37407b' }} /> */}
                                        </Stack>
                                        <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '-100px' }}>
                                            {attemptsData.length > 2
                                                ? <IconButton sx={{ color: '#6070D4' }} onClick={() => scroll('left')}> <NavigateBeforeIcon fontSize='large' /> </IconButton>
                                                : <IconButton></IconButton>}
                                            {/* <Button onClick={() => scroll('left')}>Prev</Button> */}
                                            <Box
                                                ref={scrollRef}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    overflow: 'hidden',
                                                    width: `${(cardWidth * cardsToShow) + 60}px`,
                                                    height: '420px'
                                                }}
                                            >
                                                <Stack direction={'row'} spacing={'30px'}>
                                                    {attemptsData.map((data) => (
                                                        <QuizDataContext.Provider value={{ data, setCurrentQuestionIndex }}>
                                                            <QuizCard />
                                                        </QuizDataContext.Provider>
                                                    ))}
                                                </Stack>
                                            </Box>
                                            {attemptsData.length > 2
                                                ? <IconButton sx={{ color: '#6070D4' }} onClick={() => scroll('right')}> <NavigateNextIcon fontSize='large' /> </IconButton>
                                                : <IconButton></IconButton>}

                                            {/* <Button onClick={() => scroll('right')}>Next</Button> */}
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid>
                        </ExamViewContext.Provider>

                        {showExamView ? (
                            <SpecificQuizContext.Provider value={{ questionViewData, currentQuestionIndex, setCurrentQuestionIndex }}>
                                <Grid item lg='12' xs='12' sx={{ display: 'flex', marginTop: '-70px' }}>
                                    <div ref={userExamViewRef}></div>
                                    <UserExamView />
                                </Grid>
                            </SpecificQuizContext.Provider>
                        ) : null}


                    </Grid>



                </Container>
            </ChartDataContext.Provider>
            <Footer />
        </ThemeProvider>


    );
}

export default UserProfilePage;