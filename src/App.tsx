import 'commons/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import React, { Fragment, Suspense, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import createEmotionCache from 'commons/styles/CreateEmotionCache'
import Root from 'commons/routes';
import translations from 'commons/translations';
import { ConfettiContainer } from 'commons/components/molecules/confetti';
import { DialogProvider } from 'commons/components/organisms/PortalDialog/DialogContext';
import InitialApiCalls from 'commons/utils/InitialApiCalls';
import WebsiteMetadataSetter from 'commons/components/organisms/WebsiteMetadataSetter';
import ErrorBoundary from 'commons/components/organisms/ErrorBoundary';
import DynamicThemeProvider from 'commons/styles/themes/DynamicThemeProvider';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';

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
          <TransparentBackdrop open={true} />
        }
      >
        <InitialApiCalls>
          <DynamicThemeProvider>
            <WebsiteMetadataSetter />
            <IntlProvider translations={translations}>
              <CacheProvider value={createEmotionCache(dir)}>
                <Fragment>
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
                </Fragment>
              </CacheProvider>
            </IntlProvider>
          </DynamicThemeProvider>
        </InitialApiCalls>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;