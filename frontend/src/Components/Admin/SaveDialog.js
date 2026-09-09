import * as React from 'react';
import { useContext, useState } from 'react';

import { styled } from '@mui/material/styles';
import { Box, Slide } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

import { CusButtonPurp } from '../Utils/StyledComponents';
import { QuestionContext, AnswerContext, Test_ButtonContext, Difficulty_ButtonContext } from './Switch_Component';
import { rerenderContext, imageHandleContext } from '../../Pages/AdminPage/AddTest';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import ErrorBox from './ErrorBox';

const CusDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ state, setOpen }) {
  const { questionText } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);
  const { selectedButton_Tests } = useContext(Test_ButtonContext);
  const { selectedButtons_Difficulty } = useContext(Difficulty_ButtonContext);
  const { image, preview } = useContext(imageHandleContext);

  const handleRefresh = useContext(rerenderContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackBarState, setSnackBarState] = useState({ open: false, message: '', alert: 'success' });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (message) => {
    setErrorMessage(message);
    setError(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarState({
      ...snackBarState,
      open: false,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const formattedAnswers = answers.map(answer => ({
        answer_text: answer.text,
        isCorrect: answer.isCorrect,
      }));

      let imageUrl = '';
      if (image) {
        const storage = getStorage();
        const imageRef = ref(storage, `questions/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);

        console.log('image url works')
      }

      const data = {
        question_text: questionText,
        answers: formattedAnswers,
        questionType: selectedButton_Tests === 'Car' ? true : false,
        difficulty: selectedButtons_Difficulty,
        imageUrl : imageUrl,
      };

      if (!questionText || !formattedAnswers.length || !selectedButton_Tests || !selectedButtons_Difficulty) {
        handleError('Please fill out all required fields.');
        return;
      }

      const res = await axios.post(
        'http://localhost:3001/questions/createQuestion',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status !== 201) {
        console.error('Error in saving');
        return;
      }

      setIsSubmitted(true);
      handleClose();
      setSnackBarState({ open: true, message: "Question added Successfully", alert: 'success' });
      handleRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <CusDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={state}
        maxWidth={false}
        PaperProps={{ sx: { backgroundColor: '#F0F2F7', borderRadius: '20px', padding: '0 30px 0 30px', maxWidth: '600px', minWidth: '500px' } }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Are you sure to add this Question?
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Stack direction={'column'} spacing={0}>

            <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography >Test type: </Typography>
              <Typography fontWeight={600} sx={{ marginLeft: '10px' }}>{selectedButton_Tests}</Typography>
            </Stack>

            <Stack direction={'row'} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography >Difficulty: </Typography>
              <Typography fontWeight={600} sx={{ marginLeft: '10px' }}>{selectedButtons_Difficulty}</Typography>
            </Stack>

          </Stack>

          <Stack direction={'column'} spacing={0.2} sx={{ display: 'flex', alignItems: 'left ', marginTop: '15px' }}>
            <Typography >Question: </Typography>
            <Box sx={{ maxWidth: '500px' }}>
              <Typography fontWeight={600} sx={{ marginLeft: '10px' }}>{questionText}</Typography>
            </Box>
          </Stack>

          {preview && (
            <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
              <img src={preview} alt="Selected" style={{ width: 'auto', height: '250px', borderRadius: '20px' }} />
            </Box>
          )}

          <Stack direction={'column'} spacing={0.2} sx={{ display: 'flex', alignItems: 'left', marginTop: '15px' }}>
            <Typography >Answers:</Typography>
            <Box>
              {answers.map((answer, index) => (
                <Typography
                  sx={{
                    margin: "10px 30px 15px 15px", display: 'flex', alignItems: 'center',
                    textDecoration: answer.isCorrect ? 'none' : 'line-through',
                    textDecorationColor: 'red',
                  }}
                  key={index}
                >
                  {answer.isCorrect ? <CheckCircleIcon sx={{ color: 'green', marginRight: '10px' }} /> : <UnpublishedIcon sx={{ color: 'red', marginRight: '10px' }} />}
                  {answer.text}
                </Typography>
              ))}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{}}>
          <CusButtonPurp onClick={handleSaveChanges} sx={{ width: '150px', fontWeight: '40px' }}>
            <Typography fontSize={16} sx={{ margin: '-2px 5px 0px 0px' }}>Save changes</Typography>
            <CheckCircleOutlinedIcon sx={{ marginRight: '-8px', fontSize: '17px' }} />
          </CusButtonPurp>
        </DialogActions>
      </CusDialog>

      <ErrorBox state={error} setOpen={setError} message={errorMessage} />

      <Snackbar
        open={snackBarState.open}
        onClose={handleSnackBarClose}
        TransitionComponent={Slide}
        autoHideDuration={4000}
        sx={{}}
      >
        <Alert severity={snackBarState.alert} sx={{}}>
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
