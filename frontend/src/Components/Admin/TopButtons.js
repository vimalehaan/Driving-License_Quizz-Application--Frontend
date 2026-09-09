import React from "react";
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { CusButton } from '../Utils/StyledComponents';

const CusMenuButton = styled(MenuItem)({
    width:'200px',
    border: '1px solid #323A6E', 
    borderRadius: '20px' ,
});

const CusMenu = styled(Menu)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    '& .MuiMenu-paper': {
        width: '260px',
        backgroundColor: '#F0F2F7',
        borderRadius: '20px'
    },
})

export const TopButton_Tests = ({buttons , sx , handleSelectedButtons_Tests}) => {
    const [anchor, setAnchor] = React.useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };
    const handleMenuItemClick = (itemName) => {
        handleSelectedButtons_Tests(itemName)
        setSelectedMenuItem(itemName);
        console.log("Tests "+ itemName);
        handleClose();
    };
    
    return (
        <div>
            <CusButton
                sx={{width: '250px'}}
                onClick={handleClick}
            >
                {selectedMenuItem || buttons[0]}
            </CusButton>
            <CusMenu
                id="basic-menu"
                sx={{ width: '300px',height: '1600px', borderRadius: '0px',  '& .MuiMenu-paper': {
                    height: `${((buttons.length-1) * 35) + (buttons.length-1)*5 +10}px`}, }}
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
            >
                {buttons.slice(1).map((button, index) => (
                    <CusButton
                        variant="outlined"
                        sx={{ marginBottom: '5px', height: '35px', marginLeft: '30px', width: '200px', marginTop: '0px' }}
                        onClick={() => handleMenuItemClick(button)}
                    >
                        {button}
                    </CusButton>
                ))}
            </CusMenu>
        </div>
    )
}

export const TopButton_Difficulty = ({buttons , sx , handleSelectedButtons_Difficulty}) => {
    const [anchor, setAnchor] = React.useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
    const open = Boolean(anchor);

    const handleClick = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleClose = () => {
        setAnchor(null);
    };
    const handleMenuItemClick = (itemName) => {
        handleSelectedButtons_Difficulty(itemName)
        setSelectedMenuItem(itemName);
        console.log("Difficulty "+ itemName);
        handleClose();
    };
    
    return (
        <div>
            <CusButton
                sx={{width: '250px'}}
                onClick={handleClick}
            >
                {selectedMenuItem || buttons[0]}
            </CusButton>
            <CusMenu
                id="basic-menu"
                sx={{ width: '300px',height: '1600px', borderRadius: '0px',  '& .MuiMenu-paper': {
                    height: `${((buttons.length-1) * 35) + (buttons.length-1)*5 +10}px`}, }}
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
            >
                {buttons.slice(1).map((button, index) => (
                    <CusButton
                        variant="outlined"
                        sx={{ marginBottom: '5px', height: '35px', marginLeft: '30px', width: '200px', marginTop: '0px' }}
                        onClick={() => handleMenuItemClick(button)}
                    >
                        {button}
                    </CusButton>
                ))}
            </CusMenu>
        </div>
    )
}