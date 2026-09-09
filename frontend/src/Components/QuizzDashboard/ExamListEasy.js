import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, Stack } from '@mui/material';
import { Button, CardActionArea, CardActions } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';

import { QuizCardContext } from '../../Pages/QuizzDashboardPage/CarExamDashboard';
import { QuizCardContext2 } from '../../Pages/QuizzDashboardPage/CarExamDashboard';
import { SignalCellularNullRounded } from '@mui/icons-material';


const ExamListE = () => {

  const navigate = useNavigate();

  const { quiz } = useContext(QuizCardContext);
  const {setClickedQuiz, setDialogOpen, userDetail} = useContext(QuizCardContext2)

  const handleClick = () => {
    
    setClickedQuiz(quiz);
    setDialogOpen(true);
  };

  const handlePremiumOpen = () => {
    navigate(`/premium`)
  };

  console.log("lehaan", quiz.difficult)
  return (
    <Box>


      <Card
        onClick={ handleClick }


        sx={{
          width: '300px',
          marginBottom: "10px",
          borderRadius: '20px',
          height: '360px',
          transition: 'transform 0.4s, box-shadow 0.4s, margin-top 0.4s',
          ":hover": {
            marginTop: '-4px',
            transform: 'scale(1)', // Enlarge the component on hover
            zIndex: 1, // Bring the component slightly forward
            boxShadow: '2px 4px 10px 0px rgba(0, 0, 0, 0.1)',
          }
        }} >
        <CardActionArea sx={{ height: '100%' }}>

          <CardMedia
            component="img"
            height="140"
            image="/images/img8.jpg"
            alt="green iguana"
            sx={{ height: '160px', marginTop: '-20px' }}
          />
          <CardContent sx={{ padding: '20px 20px 0 20px' }}>
            <Typography textAlign={'left'} fontSize={'22px'} fontWeight={600} component="div">
              {quiz.quizName}
            </Typography>
            <Typography textAlign={'left'} variant="body2" color="text.secondary" sx={{ marginTop: '10px', color: '#7c7c91' }}>
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species.
            </Typography>
            <Stack direction={'row'} sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

              <Stack spacing={-0.5} sx={{ flexGrow: 1 }}>
                <Typography textAlign={'left'} fontSize={'19px'} fontWeight={600} >
                  {quiz.questions.length}
                </Typography>
                <Typography textAlign={'left'} fontSize={'13px'} fontWeight={500} sx={{ color: '#7c7c91' }}>
                  Questions
                </Typography>
              </Stack>
              {quiz.difficulty !== "Easy" && !userDetail.isPremium 
                ? <LockIcon sx={{ color: '#7c7c91' }} /> : null}

            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};



export default ExamListE;
