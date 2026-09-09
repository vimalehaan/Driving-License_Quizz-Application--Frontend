import React, { useState, useEffect, createContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DiamondIcon from '@mui/icons-material/Diamond';
import KeyIcon from '@mui/icons-material/Key';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import IntroductionSection1 from '../../Components/QuizzDashboard/intro1';
import IntroductionSection2 from '../../Components/QuizzDashboard/intro2';
import NavBarBottom from '../../Components/QuizzDashboard/NavBarBottom';
import ExamListE from '../../Components/QuizzDashboard/ExamListEasy';

import '../../Components/QuizzDashboard/ContainerStyles.css'
import NavBarTop from '../../Components/Utils/NavBarTop';
import Footer from '../../Components/Utils/Footer';
import QuizDialog from '../../Components/QuizzDashboard/QuizDialog';

import { Box, Grid } from '@mui/material';
import { typographyTheme } from '../../Components/Utils/TypographyTheme';
import { useAuth } from '../../Components/AuthContext_Handle/Auth_Context';
import { ToggleContentContext } from '../../Components/Utils/Contexts';

export const QuizCardContext = createContext();
export const QuizCardContext2 = createContext();





function QuizSection({ title, quizzes }) {
  const scrollRef = useRef(null);
  const cardWidth = 300; // Set the card width to your card's actual width
  const cardsToShow = 3;



  // console.log("id", clickedQuiz)

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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '95%' }}>
        <Stack direction={'row'} sx={{ display: 'glow', alignItems: 'center', margin: '0 0 -17px 40px' }}>

          <Typography align='left' fontSize='26px' fontWeight={'bold'}> {title}</Typography>
          {/* <DiamondIcon sx={{ color: '#37407b' }} /> */}
        </Stack>
        <Stack direction={'row'} spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          {quizzes.length > 3
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
              {quizzes.map((quiz, index) => (
                <Box key={index} sx={{ minWidth: `${cardWidth}px` }}>
                  <QuizCardContext.Provider value={{ quiz }}>
                    <ExamListE />
                  </QuizCardContext.Provider>
                </Box>
              ))}
            </Stack>
          </Box>
          {quizzes.length > 3
            ? <IconButton sx={{ color: '#6070D4' }} onClick={() => scroll('right')}> <NavigateNextIcon fontSize='large' /> </IconButton>
            : <IconButton></IconButton>}

          {/* <Button onClick={() => scroll('right')}>Next</Button> */}
        </Stack>
      </Box>
    </Box>
  );
}


function CarExamDashboard() {
  const { userId } = useAuth();
  const [quizSet, setQuizSet] = useState([]);
  const [userDetail, setUserDetail] = useState({});

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [clickedQuiz, setClickedQuiz] = useState(null);

  const [isCarOpen, setIsCarOpen] = useState(true);
  const [isCommercialOpen, setIsCommercialOpen] = useState(false);

  console.log('Car', isCarOpen);
  console.log('Com', isCommercialOpen);

  console.log('userId:', userId)

  const navigate = useNavigate();

  const easyQuizzesCar = quizSet.filter(quiz => quiz.difficulty === 'Easy' && quiz.quizType);
  const hardQuizzesCar = quizSet.filter(quiz => quiz.difficulty === 'Hard' && quiz.quizType);
  const hardestQuizzesCar = quizSet.filter(quiz => quiz.difficulty === 'Hardest' && quiz.quizType);

  const easyQuizzesCom = quizSet.filter(quiz => quiz.difficulty === 'Easy' && !quiz.quizType);
  const hardQuizzesCom = quizSet.filter(quiz => quiz.difficulty === 'Hard' && !quiz.quizType);
  const hardestQuizzesCom = quizSet.filter(quiz => quiz.difficulty === 'Hardest' && !quiz.quizType);

  const handlePremiumOpen = () => {
    navigate(`/premium`)
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {

    const fetchQuizzes = async () => {
      try {
        const [response1, response2] = await Promise.all([
          axios.get(`http://localhost:3001/user/${userId}`),
          axios.get('http://localhost:3001/allquizzes')
        ]);
        setQuizSet(response2.data);
        setUserDetail(response1.data);
        console.log('First API response:', userDetail);
        console.log('Second API response:', response2.data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchQuizzes();
  }, []);


  return (

    <div style={{ backgroundColor: '#F0F2F7' }}>
      <ThemeProvider theme={typographyTheme}>


        <NavBarTop />


        <Container sx={{}}>


          <div style={{ marginTop: '100px' }}>

            <ToggleContentContext.Provider value={{ isCarOpen, isCommercialOpen, setIsCarOpen, setIsCommercialOpen }}>
              <NavBarBottom />
            </ToggleContentContext.Provider>



            <Grid container sx={{ marginTop: '50px' }}>
              <Grid Item lg={12} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>


                <Box sx={{ width: '90%', padding: '10px' }}>
                  <Typography textAlign={'left'} fontSize={'30px'} fontWeight={'bold'}>Welcome to Your Ultimate License Practice Quiz!</Typography>
                  <Stack direction={'row'} spacing={1} sx={{ marginTop: '10px', }}>
                    <Typography textAlign={'left'} sx={{ maxWidth: '700px', color: '#7c7c91' }}>
                      Before getting your learner driver's licence (Class 7 Licence) in Alberta, you will need to take a knowledge exam that tests your knowledge of Alberta’s traffic laws. The official 30-question multiple-choice test can be taken at any registry agent office (no appointment is required) and costs $17. The test will be completed on a computer and you are expected to complete it within 60 minutes. You must score a minimum of 25 questions to pass. If you fail the knowledge test, you'll need to wait 24h before you are allowed to retake it. Once you've successfully passed the knowledge exam and the vision test, you'll have to pay an additional fee to purchase your actual Class 7 learner’s licence card.
                      These driving practice tests have been updated for July 2024 and will help you prepare for the real thing from the comfort of your home. Once you've passed the knowledge exam, you'll be ready for the final step: your Alberta road test.
                    </Typography>
                    <img src="/images/dri.jpg" alt='driving' style={{ width: '100%', height: '100%', borderRadius: '20px' }} />

                  </Stack>

                  {!userDetail.isPremium ?
                    <Button variant="contained"
                      onClick={handlePremiumOpen}
                      endIcon={<KeyIcon className="key-icon" sx={{ transition: 'transform 0.4s' }} />}
                      sx={{
                        display: 'flex',
                        borderRadius: "20px",
                        height: '40px',
                        width: '250px',
                        backgroundColor: '#6070D4',
                        marginTop: '20px',
                        transition: 'transform 0.4s, box-shadow 0.4s',
                        ":hover": {
                          zIndex: 1,
                          transform: 'translateY(-2px)',
                          backgroundColor: '#6070D4',
                          '.key-icon': {
                            transform: 'rotate(-180deg)',
                          }
                        }
                      }}> Get full access now
                    </Button>
                    : null
                  }

                </Box>


              </Grid>
              <Grid Item lg={4} xs={4} >

              </Grid>

              <Grid Item lg={12} xs={12} spacing={2} sx={{ marginTop: '20px' }}>

                <QuizCardContext2.Provider value={{ clickedQuiz, setClickedQuiz, setDialogOpen, userDetail }}>
                  {isCarOpen ?
                    (<>
                      <QuizSection title="Easy" quizzes={easyQuizzesCar} />
                      <QuizSection title="Hard" quizzes={hardQuizzesCar} />
                      <QuizSection title="Hardest" quizzes={hardestQuizzesCar} />

                    </>)
                    :
                    (<>
                      <QuizSection title="Easy" quizzes={easyQuizzesCom} />
                      <QuizSection title="Hard" quizzes={hardQuizzesCom} />
                      <QuizSection title="Hardest" quizzes={hardestQuizzesCom} />

                    </>)
                }

                  <QuizDialog
                    // open= {!userDetail.isPremium && dialogOpen && clickedQuiz.difficulty === 'Easy' ? dialogOpen : false}
                    open={dialogOpen}
                    close={handleClose} />
                </QuizCardContext2.Provider>


              </Grid>

            </Grid>
          </div>
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default CarExamDashboard;