import 'commons/styles/App.css';
import React, { ReactNode, useMemo } from 'react';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Helmet } from "react-helmet";

import {
  useGetWebsiteQuery,
} from 'apps/website-display/redux/features/WebsiteSlice';
import { fontsStyles } from 'commons/styles/fonts';

interface WebsiteProviderProps {
  children: ReactNode;
}

const baseOverrides = {
  direction: 'rtl',
  components: {
    MuiCssBaseline: {
      styleOverrides: fontsStyles
    }
  }
};

export default function WebsiteProvider({ children }: WebsiteProviderProps) {

  const { data: website, isLoading } = useGetWebsiteQuery();

  const theme: Theme = useMemo(() => {
    return createTheme(
      website?.theme ?? {},
      baseOverrides
    );
  }, [website?.theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {website?.header &&
        <Helmet>
          <title>{website.header.title}</title>
          <link rel="icon" href={website.header.icon} />
          <meta name="description" content={website.header.description} />
          <meta name="theme-color" content={website.header.theme_color} />

          <meta name="msapplication-TileImage" content={website.header.icon} />
          <meta name="msapplication-TileColor" content={website.header.theme_color} />
        </Helmet>
      }
      {children}

      <Backdrop
        open={isLoading}
        transitionDuration={{ enter: 0, exit: 600 }}
        sx={{
          backgroundColor: 'white',
          zIndex: (t) => t.zIndex.drawer + 1
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </ThemeProvider>
  );
}