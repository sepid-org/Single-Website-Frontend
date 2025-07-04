import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer } from 'react-toastify';
import React, { useEffect } from 'react';
import { CacheProvider } from "@emotion/react";
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import createEmotionCache from 'commons/styles/CreateEmotionCache'
import Root from 'commons/routes';
import translations from 'commons/translations';
import { ConfettiContainer } from 'commons/components/molecules/confetti';
import { DialogProvider } from 'commons/components/organisms/PortalDialog/DialogContext';
import WebsiteProvider from 'commons/components/molecules/WebsiteProvider';
import ErrorBoundary from 'commons/components/organisms/ErrorBoundary';

const App = ({ }) => {
  const locale = useSelector((state: any) => state.Intl.locale);
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.body.dir = dir;
  }, [locale]);

  return (
    <ErrorBoundary>
      <IntlProvider translations={translations}>
        <CacheProvider value={createEmotionCache(dir)}>
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
          <WebsiteProvider>
            <Root />
          </WebsiteProvider>
        </CacheProvider>
      </IntlProvider>
    </ErrorBoundary>
  );
};

export default App;