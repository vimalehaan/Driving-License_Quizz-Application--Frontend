import React from "react";
import { useState, createContext } from "react";
import { ThemeProvider } from '@emotion/react';

import { Grid } from "@mui/material";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";

import Typography from '@mui/material/Typography';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Item, CusBigButton } from "../../Components/Utils/StyledComponents";
import { SwitchCompo } from "../../Components/Admin/Switch_Component";
import { handleButtonClick } from "../../Components/Admin/Switch_Q&AField";
import { TopButton_Difficulty, TopButton_Tests } from "../../Components/Admin/TopButtons";
import SideBar from "../../Components/Admin/SideBar";
import { typographyTheme } from "../../Components/Utils/TypographyTheme";
import UserSideBar from "../../Components/UserProfile/UserSideBar";
import AdminNavBar from "../../Components/Utils/AdminNavBar";

export const rerenderContext = createContext();
export const imageHandleContext = createContext();


function AddTest() {

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleRefresh = () => {
    // setSnackBarState({open: true, message: "Question added Successfully", alert: 'success'})
    setTimeout(() => {
      window.location.reload();
    }, 4500); // Add delay to show the snackbar
  };

  const [activeButton, setActiveButton] = useState(
    { addQuestions: false, addAnswers: false, correctAnswer: false, timeSetting: false, removeTest: false }
  );


  const [selectedButton_Tests, setSelectedButtons_Tests] = React.useState();

  const handleSelectedButtons_Tests = (selectedItem) => {
    // Append the newly selected item to the existing selectedButtons array
    setSelectedButtons_Tests(selectedItem);
  };

  const [selectedButtons_Difficulty, setSelectedButtons_Difficulty] = React.useState();

  const handleSelectedButtons_Difficulty = (selectedItem) => {
    // Append the newly selected item to the existing selectedButtons array
    setSelectedButtons_Difficulty(selectedItem);
  };



  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.not('md'));

  return (
    <div style={{backgroundColor: 'white', height: '100vh'}}>
      <ThemeProvider theme={typographyTheme}>
        <rerenderContext.Provider value={(handleRefresh)}>
          <imageHandleContext.Provider value={{ image, setImage, preview, setPreview }}>
    <AdminNavBar />
            <Container
              maxWidth={false}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '1550px'
              }}>

              <Box sx={{ display: 'flex' }}>
                {/* <SideBar /> */}
                {/* <UserSideBar /> */}

                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    height: '650px',
                    p: 3,
                    marginTop: '75px',
                    marginRight: '50px',
                  }}
                >
                  <Grid container spacing='20px' sx={{ marginTop: '30px' }}>

                    <Grid item lg='12' sx={{ marginBottom: '45px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'left',
                          width: '498px',
                          borderRadius: '20px',
                          backgroundColor: '#F0F2F7'
                        }}>


                        <TopButton_Tests buttons={['Tests', 'Car', 'Commercial Vehicle']} sx={{ width: '250px' }} handleSelectedButtons_Tests={handleSelectedButtons_Tests} />

                        <TopButton_Difficulty buttons={['Difficulty', 'Easy', 'Hard', 'Hardest']} handleSelectedButtons_Difficulty={handleSelectedButtons_Difficulty} />


                        {/* <TopButtons buttons={['User Type', 'Normal', 'Premium']}/*/}

                      </Box>
                    </Grid>

                    <Grid item lg='3.8' xs='12'>
                      <Item elevation={0}
                        sx={{
                          height: "180px",
                          justifyContent: "center",
                          marginBottom: '23px'
                        }}
                      >

                        <Stack
                          direction={matches ? "column" : "row"}
                          spacing={matches ? 3 : 1}
                          sx={{ width: "100%", alignItems: "center" }}>

                          <CusBigButton variant="outlined"
                            disableTouchRipple
                            clicked={activeButton['addQuestions']}
                            onClick={() => handleButtonClick('addQuestions', setActiveButton)}
                            startIcon={<AddCircleOutlinedIcon fontSize="small" />}>
                            <Typography fontSize={matches ? '15px' : '13px'}>Questions</Typography>
                          </CusBigButton>

                          <CusBigButton variant="outlined"
                            disableTouchRipple
                            clicked={activeButton['addAnswers']}
                            onClick={() => handleButtonClick('addAnswers', setActiveButton)}
                            startIcon={<AddCircleOutlinedIcon />}>
                            <Typography fontSize={matches ? '15px' : '13px'}>Answers</Typography>
                          </CusBigButton>


                        </Stack>

                      </Item>
                      <Item elevation={0}
                        sx={{
                          height: "90px",
                          justifyContent: "center",
                          marginTop: '100px'
                        }}
                      >

                        <Stack
                          direction={matches ? "column" : "row"}
                          spacing={matches ? 3 : 1}
                          sx={{ width: "100%", alignItems: "center" }}>

                          <CusBigButton variant="outlined"
                            disableTouchRipple
                            clicked={activeButton['addQuestions']}
                           href="/questions"
                            >
                            <Typography fontSize={matches ? '15px' : '13px'}>View Questions</Typography>
                          </CusBigButton>

                          


                        </Stack>

                      </Item>


                    </Grid>

                    <Grid item lg='8' xs='12'>

                      <Item elevation={0} sx={{ height: '493px', justifyContent: 'center' }}>

                        <Stack direction={'column'} spacing={1.5} sx={{ marginTop: 'px' }}>

                          {SwitchCompo(activeButton, "CEG_023", setActiveButton, selectedButton_Tests, selectedButtons_Difficulty)}

                        </Stack>
                      </Item>

                    </Grid>

                  </Grid>
                </Box>
              </Box>
            </Container>
          </imageHandleContext.Provider>
        </rerenderContext.Provider>
      </ThemeProvider>
    </div>
  );

}

export default AddTest;