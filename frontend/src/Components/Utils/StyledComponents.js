import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { IconButton } from '@mui/material';




export const CusButton = styled(Button)(({ clicked }) => ({
  borderRadius: '20px',
  borderColor: clicked ? '#6070D4' : '#9196B2',
  //Set Inline Height and Width into "sx = {{}}"..
  color: clicked ? '#F0F2F7' : '#9196B2',
  backgroundColor: clicked ? '#6070D4' : null,
  "&:hover": {
    color: clicked ? '#F0F2F7' : '#6070D4',
    borderColor: "#6070D4",
    backgroundColor: clicked ? '#6070D4' : null,
  },
}));

export const CusBigButton = styled(Button)(({ clicked }) => ({
  width: '280px',
  height: '50px',
  borderRadius: '20px',
  borderColor: clicked ? '#6070D4' : '#9196B2',
  color: clicked ? '#F0F2F7' : '#9196B2',
  backgroundColor: clicked ? '#6070D4' : null,
  "&:hover": {
    color: clicked ? '#F0F2F7' : '#6070D4',
    borderColor: "#6070D4",
    backgroundColor: clicked ? '#6070D4' : null,
  },
}));

export const CusButtonPurp = styled(IconButton)(({ clicked }) => ({
  borderRadius: '20px',
  height: '35px',
  color: '#F0F2F7',
  backgroundColor: '#6070D4',
  "&:hover": {
    backgroundColor: '#5c6bc0',
  },
}));

export const SideButton = styled(Button)(({ theme, clicked }) => ({
  border: '0px',
  color: '#9196B2',
  marginBottom: '25px',
  "&:hover": {
    color: '#6070D4',
    border: '0px solid #6070D4',
    backgroundColor: 'transparent ! important',
  },
  color: clicked ? '#6070D4' : '#9196B2',
  transition: '10ms',
}));

export const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0F2F7',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  borderRadius: '20px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const WhitePaper = styled(Paper)(({ theme }) => ({
  // display: 'flex',
  boxShadow: '2px 1px 10px 0px rgba(0, 0, 0, 0.1)',
  // alignItems: 'center',
  // backgroundColor: '#F0F2F7',
  // ...theme.typography.body2,
  padding: '20px',
  borderRadius: '20px',
  textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

export const ItemOne = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '670px',
  backgroundColor: '#FFF',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  border: '0.8px solid #9196B2',
  borderRadius: '20px',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const SmallButton = styled(Button)(({ theme, clicked }) => ({
  border: clicked ? '1px solid #6070D4' : '1px solid #9196B2',
  width: '27px',
  height: '27px',
  minWidth: '0',
  borderRadius: '7px',
  color: clicked ? '#fff' : '#9196B2',
  backgroundColor: clicked ? '#6070D4' : 'transparent',
  "&:hover": {
    color: clicked ? '#fff' : '#6070D4',
    border: '1px solid #6070D4',
    backgroundColor: clicked ? '#6070D4' : 'transparent !important'
  },
}));
