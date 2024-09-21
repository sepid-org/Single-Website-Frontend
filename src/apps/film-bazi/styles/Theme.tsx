import { createTheme } from '@mui/material/styles';
import selectTheme from 'commons/configs/themes';
import { DarkSecondary, Gray, PrimaryColor, SecondaryColor } from '../constants/colors';

// Custom theme for specific routes
export const customTheme = createTheme({
  ...selectTheme('rtl'),
  palette: {
    primary: {
      main: PrimaryColor,
    },
    secondary: {
      main: SecondaryColor,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#221F37', // Set Paper background color
          borderRadius: 24,
          borderTop: '2px solid #FFFFFF80', // Set border-top style
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: PrimaryColor, // Set border color to PrimaryColor when not focused
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: Gray, // Set label color to Gray
          '&.Mui-focused': {
            color: Gray, // Keep it Gray when focused
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: '#00000080', // Set background color of TextField to #00000080
        },
        input: {
          color: '#ACACAC', // Set text color of TextField to #ACACAC
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white', // Set Typography color to white
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white', // Set Button text color to white
        },
        contained: {
          background: 'linear-gradient(180deg, #26B7B4 100%, #1986A5 100%)', // Set gradient background for contained buttons
          color: DarkSecondary,
          '&:hover': {
            background: 'linear-gradient(180deg, #1986A5 100%, #26B7B4 100%)', // Optional: Change gradient on hover
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white', // Set MenuItem text color to white
          '&:hover': {
            backgroundColor: '#1986A5', // Optional: Change background color on hover
          },
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: 'white', // Set DialogContentText color to white
        },
      },
    },
  },
});
