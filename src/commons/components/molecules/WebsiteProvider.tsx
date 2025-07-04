import 'commons/styles/App.css';
import React, { ReactNode, useMemo } from 'react';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import {
  useGetWebsiteQuery,
  useGetPageMetadataQuery
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

  const { data: website, isLoading: loadingWebsite } = useGetWebsiteQuery();
  const { data: pageMetadata, isLoading: loadingPage } =
    useGetPageMetadataQuery({ pageAddress: window.location.pathname });

  const isLoading = loadingWebsite || loadingPage;

  const theme: Theme = useMemo(() => {
    return createTheme(
      website?.theme ?? {},
      pageMetadata?.theme ?? {},
      baseOverrides
    );
  }, [website?.theme, pageMetadata?.theme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}

      <Backdrop
        open={isLoading}
        transitionDuration={{ enter: 0, exit: 800 }}
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