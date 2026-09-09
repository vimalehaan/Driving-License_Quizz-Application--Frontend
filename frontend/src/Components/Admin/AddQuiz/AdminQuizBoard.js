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

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import QuizCardAdmin from './QuizCardAdmin';
import NavBarBottom from '../../QuizzDashboard/NavBarBottom';

// import '../../Components/QuizzDashboard/ContainerStyles.css'
import { ToggleContentContext } from '../../Utils/Contexts';



import { Box, Grid } from '@mui/material';
import AdminNavBar from '../../Utils/AdminNavBar';


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
                    <QuizCardAdmin />
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


function AdminQuizBoard() {
  
  const [quizSet, setQuizSet] = useState([]);
  const [userDetail, setUserDetail] = useState({});

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [clickedQuiz, setClickedQuiz] = useState(null);

  const [isCarOpen, setIsCarOpen] = useState(true);
  const [isCommercialOpen, setIsCommercialOpen] = useState(false);

  console.log('Car', isCarOpen);
  console.log('Com', isCommercialOpen);

  

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
        const response = await axios.get('http://localhost:3001/allquizzes')
        
        setQuizSet(response.data);
        
        console.log('Second API response:', quizSet);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchQuizzes();
  }, []);


  return (

    <div style={{ backgroundColor: '#F0F2F7' }}>
<AdminNavBar />

        <Container sx={{}}>


          <div style={{ marginTop: '100px' }}>

           
          <ToggleContentContext.Provider value={{ isCarOpen, isCommercialOpen, setIsCarOpen, setIsCommercialOpen }}>
              <NavBarBottom />
            </ToggleContentContext.Provider>


            <Grid container sx={{ marginTop: '50px' }}>
              

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



                  
                </QuizCardContext2.Provider>


              </Grid>

            </Grid>
          </div>
        </Container>
        
      
    </div>
  )
}

export default AdminQuizBoard;