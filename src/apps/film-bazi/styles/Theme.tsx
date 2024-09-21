import { createTheme } from '@mui/material/styles';
import selectTheme from 'commons/configs/themes';
import { DarkSecondary, Gray, PrimaryColor, SecondaryColor } from '../constants/colors';

export const customTheme = createTheme({
  ...selectTheme('rtl'),
  palette: {
    mode: 'dark', // Set the theme to dark mode
    primary: {
      main: PrimaryColor,
    },
    secondary: {
      main: SecondaryColor,
    },
    background: {
      default: '#221F37', // Set default background color
      paper: '#221F37', // Set Paper background color
    },
    text: {
      primary: '#FFFFFF', // Set primary text color to white
      secondary: Gray, // Set secondary text color to Gray
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#221F37',
          borderRadius: 24,
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: PrimaryColor,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: PrimaryColor,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: PrimaryColor,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: Gray,
          '&.Mui-focused': {
            color: Gray,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        input: {
          color: '#ACACAC',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          textTransform: 'none', // Prevent automatic uppercase transformation
        },
        contained: {
          background: 'linear-gradient(180deg, #26B7B4 0%, #1986A5 100%)',
          color: DarkSecondary,
          '&:hover': {
            background: 'linear-gradient(180deg, #1986A5 0%, #26B7B4 100%)',
          },
        },
        outlined: {
          borderColor: PrimaryColor,
          '&:hover': {
            borderColor: SecondaryColor,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(25, 134, 165, 0.08)', // Slightly transparent hover effect
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 134, 165, 0.16)', // Selected item background
            '&:hover': {
              backgroundColor: 'rgba(25, 134, 165, 0.24)',
            },
          },
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#221F37',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.12)', // Light divider color
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
  },
});