import { createTheme } from '@mui/material/styles';
import selectTheme from 'commons/configs/themes';
import { DarkSecondary, Gray, PrimaryColor, SecondaryColor } from '../constants/colors';

export const customTheme = createTheme({
  ...selectTheme('rtl'),
  typography: {
    allVariants: {
      fontFamily: 'Pinar-FD, iranyekan',
    },
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 800,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 700,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryColor,
    },
    secondary: {
      main: SecondaryColor,
    },
    background: {
      default: '#221F37',
      paper: '#221F37',
    },
    text: {
      primary: '#FFFFFF',
      secondary: Gray,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Pinar-FD';
          src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Black.woff2') format('woff2');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Pinar-FD';
          src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-ExtraBold.woff2') format('woff2');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Pinar-FD';
          src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Pinar-FD';
          src: url('https://kamva-minio-storage.darkube.app/fonts/Pinar-FD-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        * {
          font-family: 'Pinar-FD';
        }
      `
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          background: 'linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)',
          backdropFilter: 'blur(5.822803020477295px)',
          boxShadow: '0px 5.82px 5.82px 0px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "#60557E",
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "#60557E",
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: "#60557E",
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
          textTransform: 'none',
        },
        contained: {
          background: 'linear-gradient(180deg, #26B7B4 0%, #1986A5 100%)',
          color: DarkSecondary,
        },
        outlined: {
          borderColor: PrimaryColor,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(25, 134, 165, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 134, 165, 0.16)',
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
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
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