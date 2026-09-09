import React from "react";
import { useState, createContext, useContext } from 'react';

import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckIcon from '@mui/icons-material/Check';

import { handleButtonClick } from './Switch_Q&AField';
import { CusButtonPurp } from "../Utils/StyledComponents";
import TestIdComponent from './TestIDContainer';
import CustomizedDialogs from './SaveDialog';
import AddQA from "./Q&A_Container";


export const QuestionContext = createContext();
export const AnswerContext = createContext();
export const Test_ButtonContext = createContext();
export const Difficulty_ButtonContext = createContext();

export const SwitchCompo = (activeButton, id, setActiveButton, selectedButton_Tests,selectedButtons_Difficulty) => {


    const [questionText, setQuestionText] = useState('');
    

    const [answers, setAnswers] = useState([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ]);

    const resetAnswers = () => setAnswers([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    //id value is passed from "AddTest.js"... 
    //This function is to switch the AddQustion and AddAnswer Text fields...

    if (activeButton['addQuestions']) {
        return (
            <AnswerContext.Provider value={{ answers, setAnswers, resetAnswers }}>
                <QuestionContext.Provider value={{ questionText, setQuestionText }}>
                    {/* <ButtonContext.Provider value={{ selectedButtons }}> */}
                    {/* <ButtonContext.Provider value={{ selectedButtons }}> */}

                        <Stack direction={'column'} spacing={1.5} sx={{ marginTop: '-45px' }}>
                            <TestIdComponent testid={id} />
                            <AddQA index='addQuestions' />
                            <div style={{ display: 'flex', justifyContent: 'end' }}>

                                <CusButtonPurp
                                    disabled={questionText === ''}
                                    onClick={() => handleButtonClick('addAnswers', setActiveButton)}
                                    sx={{ width: '120px', fontWeight: '40px', }}
                                >
                                    <Typography fontSize={16} sx={{ margin: '-2px -6px 0px 0px' }}>Answers</Typography>
                                    <NavigateNextIcon sx={{ marginRight: '-8px' }} />
                                </CusButtonPurp>

                            </div>
                        </Stack>
                    {/* </ButtonContext.Provider/> */}
                </QuestionContext.Provider>

            </AnswerContext.Provider>

        );
    } else if (activeButton['addAnswers']) {
        return (
            <AnswerContext.Provider value={{ answers, setAnswers }}>
                <QuestionContext.Provider value={{ questionText, setQuestionText }}>
                    <Test_ButtonContext.Provider value={{ selectedButton_Tests }}>
                        <Difficulty_ButtonContext.Provider value={{selectedButtons_Difficulty}}>
                        <Stack direction={'column'} spacing={1.5} sx={{ marginTop: '-45px' }}>
                            <TestIdComponent testid={id} />
                            <AddQA index='addAnswers' />
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                <CusButtonPurp
                                    onClick={() => handleButtonClick('addQuestions', setActiveButton)}
                                    sx={{
                                        width: '120px',
                                        fontWeight: '40px',
                                    }}
                                >
                                    <NavigateBeforeIcon sx={{ margin: '0px 0 0 -10px' }} />
                                    <Typography fontSize={16} sx={{ margin: '0px 0px 0px -4px' }}>Question</Typography>
                                </CusButtonPurp>

                                <CusButtonPurp
                                    disabled={
                                        questionText === '' ||
                                        answers.some(answer => answer.text.trim() === '') ||
                                        answers.every(answer => !answer.isCorrect) || selectedButton_Tests === '' || selectedButtons_Difficulty === ''
                                    }
                                    sx={{
                                        width: '100px',
                                        fontWeight: '40px',
                                    }}
                                    onClick={handleClickOpen}
                                >
                                    <CheckIcon sx={{ fontSize: '20px', margin: '-2px 0 0 -4px' }} />
                                    <Typography fontSize={16} sx={{ margin: '-1px 0px 0px 3px' }}>Save</Typography>
                                </CusButtonPurp>

                                <CustomizedDialogs state={open} setOpen={setOpen} />
                            </Stack>

                        </Stack>
                        </Difficulty_ButtonContext.Provider>
                    </Test_ButtonContext.Provider>
                </QuestionContext.Provider>
            </AnswerContext.Provider>
        );
    }
    return (<img src="./Images/Sentiment analysis-rafiki 1.png" />);
}