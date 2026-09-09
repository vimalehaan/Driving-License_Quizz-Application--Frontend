import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { delay, motion } from "framer-motion";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, Box, Stack, Grid } from '@mui/material';
import Slide from '@mui/material/Slide';

import { useAuth } from '../AuthContext_Handle/Auth_Context';
import { QuizCardContext2 } from '../../Pages/QuizzDashboardPage/CarExamDashboard';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const MotionTypography = motion(Typography);

export default function QuizDialog({ open, close }) {
    const { userId } = useAuth();

    const { clickedQuiz, userDetail } = useContext(QuizCardContext2);
    const navigate = useNavigate();
    // console.log(clickedQuiz.quizName)

    const handleClick = async () => {
        // View result logic here

        if (clickedQuiz && clickedQuiz.difficulty !== 'Easy' && !userDetail.isPremium) {
            navigate(`/premium`);
        }
        else {
            try {
                const response = await axios.post(`http://localhost:3001/newattempt`, {
                    candidate_id: userId,
                    quiz_id: clickedQuiz._id
                });

                const attemptId = response.data._id;
                navigate(`/quiz/${attemptId}`);

            } catch (error) {
                console.error('Error submitting answers:', error);

            }
        }


    };

    return (
        <React.Fragment>
            <Dialog
                TransitionComponent={Transition}
                sx={{
                    ".MuiDialog-paper": {
                        minWidth: '1000px',
                        minHeight: '520px',
                        // width: '1000px',
                        borderRadius: '20px',
                        padding: '20px',
                        // position: 'relative'

                    }
                }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <motion.Box
                    initial={{ x: '-100%' }}
                    animate={{ x: 0, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '600px',
                        height: '560px',
                        backgroundColor: '#7380d9',
                        borderRadius: '0 0px  600px 0',
                        zIndex: 0
                    }}
                />
                <IconButton
                    // aria-label="close"
                    onClick={close}
                    sx={{
                        // display:'flex',
                        // justifyContent: 'end',


                        position: 'absolute',
                        right: 8,
                        top: 8,

                    }}
                >
                    <CloseIcon />
                </IconButton>
                {/* <DialogTitle id="alert-dialog-title"
                    >

                    Pass the driver's exam
                </DialogTitle> */}
                <DialogContent sx={{ zIndex: 1 }}>


                    <DialogContentText id="alert-dialog-description" sx={{ color: 'white', }}>

                        <Grid container>
                            <Grid item lg={6} xs={6}>
                                <MotionTypography
                                    initial={{ x: '-40%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginTop: '15px',
                                        zIndex: 1
                                    }}
                                >
                                    Pass the driver's exam
                                </MotionTypography>

                                <MotionTypography fontSize={'16px'}
                                    initial={{ x: '-40%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.7 }}
                                    style={{ width: '450px', zIndex: '1', fontWeight: 'bold', margin: '15px 0 0 0' }}>
                                    Even if you haven’t taken a test in 10 years. And taking tests makes your hands sweat. With Premium, you’re 100% guaranteed to pass.
                                </MotionTypography>
                                <Stack direction={'column'} spacing={1}
                                    sx={{ width: '420px', margin: '45px 0 0 25px' }}>

                                    <MotionTypography fontSize={'15px'} fontWeight={500}
                                        initial={{ x: '-40%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.9 }}
                                    >
                                        Perfect for learner’s permit and full adult driver’s licence
                                    </MotionTypography>

                                    <MotionTypography fontSize={'15px'} fontWeight={500}
                                        initial={{ x: '-40%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 1.1 }}
                                    >
                                        Triple-checked for accuracy
                                    </MotionTypography>

                                    <MotionTypography fontSize={'15px'} fontWeight={500}
                                        initial={{ x: '-40%', opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 1.3 }}
                                    >
                                        Updated for July 2024
                                    </MotionTypography>

                                </Stack>
                            </Grid>
                            <Grid item lg={6} xs={6} sx={{}}>
                                <Typography
                                    sx={{
                                        textAlign: 'right',
                                        fontSize: '30px',
                                        fontWeight: 'bold',
                                        color: 'black',
                                        marginTop: '15px',
                                        zIndex: 1

                                    }}>
                                    {clickedQuiz ? clickedQuiz.quizName : null}

                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'end', margin: '15px 0 0 0' }}>

                                    <img src='/images/img8.jpg' style={{ borderRadius: '20px', width: '70%' }} />
                                </Box>

                                <Typography fontSize={'16px'} textAlign={'right'} sx={{ width: '450px', zIndex: '1', fontWeight: 'bold', margin: '15px 0 0 0', color: 'black' }}>

                                </Typography>
                                <Stack direction={'column'} spacing={1} sx={{ width: '420px', margin: '45px 0 0 0px' }}>
                                    <Typography fontSize={'15px'} fontWeight={500} sx={{}}>
                                        Perfect for learner’s permit and full adult driver’s licence
                                    </Typography>
                                    <Typography fontSize={'15px'} fontWeight={500} sx={{}}>
                                        Triple-checked for accuracy
                                    </Typography>
                                    <Typography fontSize={'15px'} fontWeight={500} sx={{}}>
                                        Updated for July 2024
                                    </Typography>

                                </Stack>
                            </Grid>

                        </Grid>

                    </DialogContentText>



                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', marginLeft: '10px' }}>
                    <Button onClick={handleClick} sx={{
                        display: 'flex',
                        borderRadius: "20px",
                        height: '40px',
                        width: '220px',
                        backgroundColor: '#6070D4',
                        marginTop: '20px',
                        color: 'white',
                        transition: 'transform 0.4s, box-shadow 0.4s',
                        ":hover": {
                            zIndex: 1,
                            transform: 'translateY(-2.5px)',
                            backgroundColor: '#6070D4',

                        }
                    }}>
                        {clickedQuiz && clickedQuiz.difficulty !== 'Easy' && !userDetail.isPremium ? 'Get Premium' : 'Attempt Quiz'}

                    </Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}