import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './Login.css';

const useStyle = makeStyles((theme) => ({
  
    gridContainer: {
        alignItems:'center',
        spacing:'0',
        height: '100vh',
        background: 'linear-gradient(180deg, #6070D4 0%, #323A6E 99.99%, #323A6E 100%)'
    },
    formContainer: {
        // marginRight: '60%'
        alignItems: 'center',
        justifyItems: 'center',
        height: '100%',
        marginLeft: '-15%'
        
    }, 
    textField: {
        textDecorationColor: 'white',
        width: '45vh',
        height: '9vh',
        marginBottom: '0px',
        "& .MuiInputLabel-root": {
            color: '#fff' // Styles the label
            
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#fff",
                // Styles the input border
            },
            "&:hover fieldset": {
                
                borderColor: "#fff" // Styles the input border on hover
            }
        }
    },
    
    loginImage: {
        width: '50%',
        height: 'auto'
    },
    signButton: {
        width: '45vh',
        height: '6vh',
        marginBottom: '0vh',
        borderRadius: '20px',
        
    },

   
    divider: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '45vh',
        color: '#fff',
        paddingBottom: '0',
        marginTop: '1px',
        marginBottom: '0px',
        margin: '0',
        "&.MuiDivider-root": {
            "&::before": {
              borderTop: "thin solid #fff"
            },
            "&::after": {
              borderTop: "thin solid #fff"
            }
          },
    },
    typo: {
        fontSize:'17px',
        color: '#fff'
    }


}));

export default useStyle;