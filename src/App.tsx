import 'commons/configs/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';
import React, { Suspense, useEffect } from 'react';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';

import createEmotionCache from 'commons/configs/CreateEmotionCache'
import selectTheme from 'commons/configs/themes';
import Root from 'commons/routes';
import translations from 'commons/translations';
import { ConfettiContainer } from 'commons/components/molecules/confetti';
import GlobalStyles from 'commons/configs/styles/GlobalStyles';
import { DialogProvider } from 'commons/components/organisms/PortalDialog/DialogContext';
import { ErrorBoundary } from '@sentry/react';
import InitialApiCalls from 'commons/utils/InitialApiCalls';
import WebsiteMetadataSetter from 'commons/components/organisms/WebsiteMetadataSetter';

const App = ({ }) => {
  const locale = useSelector((state: any) => state.Intl.locale);
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.body.dir = dir;
  }, [locale]);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Backdrop open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <InitialApiCalls>
          <WebsiteMetadataSetter />
          <GlobalStyles />
          <IntlProvider translations={translations}>
            <CacheProvider value={createEmotionCache(dir)}>
              <GlobalStyles />
              <ThemeProvider theme={selectTheme(dir)}>
                <CssBaseline />
                <ToastContainer
                  rtl
                  position="top-right"
                  autoClose={3000}
                  transition={Slide}
                  newestOnTop
                  hideProgressBar={false}
                  pauseOnHover={false}
                  pauseOnFocusLoss={false}
                  closeOnClick
                  limit={3}
                  draggable={false}
                />
                <DialogProvider />
                <ConfettiContainer />
                <Root />
              </ThemeProvider>
            </CacheProvider>
          </IntlProvider>
        </InitialApiCalls>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
