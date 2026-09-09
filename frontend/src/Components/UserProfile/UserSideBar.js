import React from 'react';
import { useState } from 'react';

import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { makeStyles } from '@mui/styles';

import { SideButton } from '../Utils/StyledComponents';
import { handleButtonClick } from '../Admin/Switch_Q&AField';




const useStyles = makeStyles((theme, clicked,) => ({
    drawer: ({
        marginLeft: '-10px',

        // width: '250px',
        // width: '80px',
        flexShrink: 0,

        '& .MuiDrawer-paper': {
            // marginTop: '150px',
            borderRight: '1px dashed #bdbdbd', // Adding border line
            backgroundColor: 'transparent', // Removing background color
            // width: '220px',
            // width: '70px',
            boxShadow: 'none'
            // height: '595px',
            // backgroundColor: '#F0F2F7',
            // borderRadius: '0 15px 15px 0'
        },
    }),

    editImage: {
        width: '480px',
    },

    buttonNav: {
        width: '800px',
        height: '100px',
        borderRadius: '50px',
    },

    SideBarButton: {
        color: clicked ? 'primary' : undefined,
        '&:hover': {
            backgroundColor: 'transparent',
        }
    },

}));



function UserSideBar() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(prevState => !prevState);
    };

    const buttonsData = [
        { name: 'Dashboard', num: 'a', icon: <GridViewOutlinedIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> },
        { name: 'Add Test', num: 'b', icon: <AddCircleOutlinedIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> },
        { name: 'Result', num: 'c', icon: <CreditScoreOutlinedIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> },
        { name: 'User Register', num: 'd', icon: <PersonOutlinedIcon sx={{ fontSize: '20px', marginRight: '5px' }} /> },

    ];
    const [activeButton, setActiveButton] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    });


    const classes = useStyles();
    return (
        <Box sx={{ display: 'flex' }}>
            <Box >


                <Drawer className={classes.drawer}
                    variant="permanent"
                    anchor="left"
                    sx={{ width: isDrawerOpen ? '250px' : '110px', }}
                    PaperProps={{
                        elevation: '5',
                        sx: { width: isDrawerOpen ? '240px' : '90px', },
                    }}

                >
            
                    {/* <Divider orientation='vertical'
                        sx={{
                            
                            position: 'absolute',
                            right: '-20px',
                            borderStyle: 'dashed',
                            
   
                            

                        }}>
                        CENTER</Divider> */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '10%',
                            transform: 'translateY(50%)',
                            right: '-20px', // Adjust the position based on drawer width
                            zIndex: 999,
                            backgroundColor: 'transparent',
                        }}
                        onClick={toggleDrawer}
                    >

                        <GridViewOutlinedIcon />
                    </IconButton>
                    <Grid container marginTop={10} marginLeft={-2}>
                        <Stack direction={"row"} marginLeft={5.5} >
                            <Avatar sx={{ bgcolor: '#323A6E' }}>L</Avatar>
                            <Typography className={classes.NameTypo} color='#323A6E' variant="p" height={40} paddingTop={1.2} marginLeft={1.5}>Lehaan</Typography>

                        </Stack>

                        <List sx={{ marginTop: '20px' }}>
                            {isDrawerOpen ? (
                                <div>
                                    {buttonsData.map((button, index) => (

                                        <ListItem disablePadding sx={{ marginLeft: '35px' }} >

                                            <SideButton disableElevation disableTouchRipple disableFocusRipple
                                                clicked={activeButton[button.num]}
                                                onClick={() => handleButtonClick(button.num, setActiveButton)}
                                            >
                                                <>{button.icon}</>
                                                <Typography variant='h9' fontSize={15} fontWeight={600}>{button.name}</Typography>
                                            </SideButton>

                                        </ListItem>

                                    ))
                                    }
                                </div>
                            ) :
                                <div>
                                    {buttonsData.map((button, index) => (

                                        <ListItem disablePadding sx={{ marginLeft: '35px' }} >

                                            <SideButton disableElevation disableTouchRipple disableFocusRipple
                                                clicked={activeButton[button.num]}
                                                onClick={() => handleButtonClick(button.num, setActiveButton)}
                                            >
                                                <>{button.icon}</>

                                            </SideButton>

                                        </ListItem>
                                    ))
                                    }
                                </div>}

                            <ListItem disablePadding >

                                <SideButton
                                    sx={{
                                        marginTop: '140px',
                                        marginLeft: '35px'
                                    }}
                                    disableElevation
                                    disableTouchRipple
                                    disableFocusRipple
                                >
                                    <LogoutOutlinedIcon />
                                    <Typography variant='h9' fontSize={15} fontWeight={600}>Logout</Typography>
                                </SideButton>
                            </ListItem>
                        </List>
                    </Grid>


                </Drawer>


            </Box>
        </Box >
    )
};

export default UserSideBar;