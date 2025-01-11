import { createTheme } from '@mui/material/styles';
import { Black, Golden, Gray, Primary, Secondary } from '../constants/colors';
import defaultTheme from "commons/styles/themes/defaultTheme.json";

const staticBaseUrl = process.env.NODE_ENV === 'development'
  ? 'https://kamva-minio-storage.darkube.app'
  : 'https://sepid-platform-frontend-statics.s3.ir-thr-at1.arvanstorage.ir';

const fontFamilyName = 'Pinar-FD';
const fontWeights = [
  { weight: 900, name: 'Black' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 700, name: 'Bold' },
  { weight: 400, name: 'Regular' }
];

const styleOverrides = `
  ${fontWeights
    .map(
      ({ weight, name }) => `
      @font-face {
        font-family: '${fontFamilyName}';
        src: url('${staticBaseUrl}/fonts/${fontFamilyName}-${name}.woff2') format('woff2');
        font-weight: ${weight};
        font-style: normal;
        font-display: swap;
      }`
    )
    .join('')}

  * {
    font-family: '${fontFamilyName}', sans-serif !important;
  }
`;

export const customTheme = createTheme({
  ...defaultTheme,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1300,
    },
  },
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
    divider: '#60557E',
    mode: 'dark',
    primary: {
      main: Primary,
    },
    secondary: {
      main: Secondary,
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
      styleOverrides,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          background: 'linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)',
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
          borderRadius: 24,
          color: 'white',
          textTransform: 'none',
        },
        contained: {
          color: Black,
          background: 'linear-gradient(180deg, #FE9C42, #E25100)',
        },
        outlined: {
          color: Golden,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
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