import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout'; 
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';


import DiamondIcon from '@mui/icons-material/Diamond';

const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            border: "1.5px solid #6070D4", // Styles the input border when focused
            color: '#6070D4'
        },
    },
    '& label.Mui-focused': {
        color: '#6070D4',
    },
  });


export default function ImgMediaCard() {
    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState('/Images/avatar-placeholder.png');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tempFirstName, setTempFirstName] = useState('');
    const [tempLastName, setTempLastName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/auth/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setFirstName(result.data.firstName);
                    setLastName(result.data.lastName);
                    setTempFirstName(result.data.firstName);
                    setTempLastName(result.data.lastName);
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                alert('An error occurred while fetching the profile. Please try again.');
            }
        };

        fetchProfile();
    }, []);

    

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
      };


    const handleEditClickOpen = () => {
        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEditOpen(true);
    };

    const handlePasswordClickOpen = () => {
        setPasswordOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // remove token from local storage
        navigate('/login');  // redirect to login page
    };

    const handleClose = () => {
        setEditOpen(false);
        setPasswordOpen(false);
    };


    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleSave =async () => {
        
        setEditOpen(false);

        if (tempFirstName.trim() === '' || tempLastName.trim() === '' ) {
            alert("All fields are required");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/auth/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: JSON.stringify({
                    firstName: tempFirstName,
                    lastName: tempLastName,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setFirstName(tempFirstName);
                setLastName(tempLastName);
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again.');
        }

           
        handleClose();
    };

    const handlePasswordSave = async() => {
        if (currentPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
            alert("All fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
            return;
        }

        if (!validatePassword(newPassword)) {
            alert("Password must contain at least 8 characters including 1 uppercase, 1 lowercase, 1 number, and 1 special character");
            return;
          }

          try {
            const response = await fetch('http://localhost:3001/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password. Please try again.');
        }
        handleClose();
    };


    return (
        <>
            <Card sx={{ borderRadius: '20px', boxShadow: '0px 3px 9px rgba(0, 0, 0, 0.1)', }}>
                <CardMedia
                    component="img"
                    alt="cover image"
                    height="220px"
                    image="/Images/Rectangle 60.png"
                />
                <CardContent>

                    <Stack direction={'row'} spacing={3} sx={{ alignItems: 'center', margin: '-130px 0 0 30px' }}>
                        <Avatar sx={{ width: '130px', height: '130px', bgcolor: '#323A6E', fontSize: '40px', border: '2px solid white' }} src={profilePicture} />
                        <Stack direction={'column'} spacing={1} sx={{ alignItems: 'flex-start', }}>
                            <Typography fontWeight='700' sx={{ color: 'white', fontSize: '22px', }}>{firstName} {lastName}</Typography>
                            {/* <Typography sx={{ color: 'white', fontSize: '14px', }}>lehaan1234</Typography> */}
                        </Stack>
                    </Stack>

                </CardContent>
                <CardActions sx={{ height: '40px', justifyContent: 'flex-end', alignItems: 'center', marginTop: '-35px' }}>
                    <Button onClick={handleEditClickOpen} startIcon={<EditIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            color: '#6070D4',
                            borderRadius: '20px'
                        }}>Edit</Button>
                    <Button onClick={handlePasswordClickOpen} startIcon={<LockIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            color: '#6070D4',
                            borderRadius: '20px'
                        }}>Change Password</Button>
                     <Button onClick={handleLogout} startIcon={<LogoutIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            color: '#6070D4',
                            borderRadius: '20px'
                        }}>Logout</Button>
                </CardActions>
            </Card>

            {/* //Edit profile dialog */}
            <Dialog open={editOpen} onClose={handleClose}
                sx={{
                    ".MuiDialog-paper": {
                        borderRadius: '20px'
                    }
                }}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item lg={4} xs={4}>
                            <Box display="flex" justifyContent="center" alignItems="center" >
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="profile-picture-upload"
                                    type="file"
                                    onChange={handleProfilePictureChange}

                                />
                                <label htmlFor="profile-picture-upload">
                                    <IconButton component="span">
                                        <Avatar
                                            src={profilePicture}
                                            sx={{ width: 140, height: 140 }}
                                        />
                                    </IconButton>
                                </label>
                            </Box>
                        </Grid>
                        <Grid item lg={8} xs={8}>
                            <CustomTextField
                                autoFocus
                                margin="dense"
                                id="firstName"
                                label="FirstName *"
                                type="text"
                                fullWidth
                                value={tempFirstName}
                                onChange={(e) => setTempFirstName(e.target.value)}
                                InputProps={{ sx: { borderRadius: '20px', } }}
                            />
                            <CustomTextField
                                margin="dense"
                                id="lastName"
                                label="LastName *"
                                type="text"
                                fullWidth
                                value={tempLastName}
                                onChange={(e) => setTempLastName(e.target.value)}
                                InputProps={{ sx: { borderRadius: '20px' } }}
                            />
                            
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ marginTop: '-10px', marginRight: '10px' }}>
                    <Button onClick={handleClose} startIcon={<ArrowBackIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            fontSize: '16px',
                            borderRadius: '20px',
                            width: '100px',
                            color: '#6070D4',
                        }}>Back</Button>
                    <Button onClick={handleSave} startIcon={<SaveIcon />}
                        sx={{
                            textTransform: 'capitalize',
                            fontSize: '16px',
                            borderRadius: '20px',
                            width: '100px',
                            color: '#6070D4',
                        }}>Save</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={passwordOpen} onClose={handleClose}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                        <CustomTextField
                            autoFocus
                            margin="dense"
                            id="currentPassword"
                            label="Current Password *"
                            type="password"
                            fullWidth
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            InputProps={{ sx: { borderRadius: '20px' } }}
                        />
                        <CustomTextField
                            margin="dense"
                            id="newPassword"
                            label="New Password *"
                            type="password"
                            fullWidth
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{ sx: { borderRadius: '20px' } }}
                        />
                        <CustomTextField
                            margin="dense"
                            id="confirmPassword"
                            label="Confirm Password *"
                            type="password"
                            fullWidth
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{ sx: { borderRadius: '20px' } }}
                        />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} startIcon={<ArrowBackIcon />}>Back</Button>
                    <Button onClick={handlePasswordSave} startIcon={<EditIcon />}>Save</Button>
                </DialogActions>
            </Dialog>

        </>

    );
}