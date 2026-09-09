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

import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { makeStyles } from '@mui/styles';

import { SideButton } from '../Utils/StyledComponents';
import { handleButtonClick } from './Switch_Q&AField';




const useStyles = makeStyles((theme, clicked) => ({
    drawer: {
        marginLeft: '-10px',
        width: '250px',
        flexShrink: 0,

        '& .MuiDrawer-paper': {
            marginTop: '150px',
            width: '200px',
            height: '595px',
            backgroundColor: '#F0F2F7',
            borderRadius: '0 15px 15px 0'
        },
    },
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



function SideBar() {

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
            <Drawer className={classes.drawer}
                variant="permanent"
                anchor="left"
                PaperProps={{ elevation: '5', }}
            >
                <Grid container marginTop={6} marginLeft={-2}>
                    <Stack direction={"row"} marginLeft={5.5} >
                        <Avatar sx={{ bgcolor: '#323A6E' }}>F</Avatar>
                        <Typography className={classes.NameTypo} color='#323A6E' variant="p" height={40} paddingTop={1.2} marginLeft={1.5}>Fathhy Ahamed</Typography>
                    </Stack>

                    <List sx={{ marginTop: '20px' }}>
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
                        ))}
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
        </Box >
    )
};

export default SideBar;