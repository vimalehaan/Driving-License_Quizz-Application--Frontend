import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import Container from '@mui/material/Container';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';

import { typographyTheme } from '../Components/Utils/TypographyTheme';
import { WhitePaper, CusButtonPurp } from '../Components/Utils/StyledComponents';
import QuestionButtons from '../Components/ViewResult/QuestionButtonSet';
import QuestionBox from '../Components/UserProfile/QuestionBox';
import QuizResultComponent from '../Components/ViewResult/QuizResultData';
import { SpecificQuizContext } from '../Components/Utils/Contexts';

function ViewResultPage() {
    const { attemptId } = useParams(); 
    const navigate = useNavigate();

    const [questionViewData, setQuestionViewData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isUnavailable, setIsUnavailable] = useState(false);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                // Make a GET request to your backend endpoint
                const response = await axios.get(`http://localhost:3001/viewattempt/${attemptId}`); 
                console.log('Response from backend:', response.data);
                // Set the fetched attempted quiz in state
                setQuestionViewData(response.data);
            } catch (error) {
                console.error('Error fetching attempted quizzes:', error);
                setIsUnavailable(true);
            }
        };

        // Call the fetchAttempts function when the component mounts
        fetchAttempts();
    }, []);

    useEffect(() => {
        const handleNavigation = (event) => {
          event.preventDefault(); // Prevent default behavior
          alert("You can't go back to this page."); // Show a message to the user
          navigate('/carexamdb'); // Navigate to the home page
        };
    
        window.history.pushState(null, null, window.location.pathname); // Ensure current location in history
        window.addEventListener('popstate', handleNavigation); // Listen for back navigation
    
        return () => {
          window.removeEventListener('popstate', handleNavigation); // Cleanup
        };
      }, [navigate]);
    

    if (isUnavailable) {
        return (
            <div>
                <h1>Page is Unavailable</h1>
                <p>You cannot go back to the quiz attempt page after viewing the results. Redirecting to home page...</p>
            </div>
        );
    }

    if (!questionViewData) {
        // If questionViewData is null, render some fallback content or return null
        return <div>Loading...</div>;
    }
    // Check if questions array is not null before accessing its properties
    if (!questionViewData || questionViewData.length === 0) {
        // If questions array is null or empty, render some fallback content or return null
        return <div>No questions available</div>;
    }

    return (
        <div>
            <ThemeProvider theme={typographyTheme}>
                <Container
                    maxWidth={'false'}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '1100px',
                        marginTop: '50px'
                    }}>
                    <Grid container spacing={"30px"}>

                        <SpecificQuizContext.Provider value={{ questionViewData, currentQuestionIndex, setCurrentQuestionIndex }}>
                            <Grid item lg='4' xs='4'>
                                {/* <UserExamView /> */}
                                <WhitePaper sx={{ height: '220px',  maxWidth: '85%' }}>
                                    <QuizResultComponent />
                                </WhitePaper>
                                <Box>
                                    
                                </Box>
                                <WhitePaper sx={{ marginTop: '30px', maxWidth: '85%' }}>

                                    {/* <QuizzDetails /> */}
                                    <QuestionButtons />


                                </WhitePaper>
                            </Grid>
                            <Grid item lg='8' xs='8'>
                                <WhitePaper sx={{maxWidth: '93%'}}>
                                    <QuestionBox />
                                </WhitePaper>
                            </Grid>
                        </SpecificQuizContext.Provider>

                    </Grid>
                </Container>

            </ThemeProvider>
        </div>
    );
}

export default ViewResultPage;