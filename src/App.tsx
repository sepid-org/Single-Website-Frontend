import 'commons/configs/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';
import React, { Fragment, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { Helmet } from "react-helmet";

import createEmotionCache from 'commons/configs/CreateEmotionCache'
import selectTheme from 'commons/configs/themes';
import { useGetPageMetadataQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import Root from 'commons/routes';
import translations from 'commons/translations';
import { useGetThirdPartiesQuery } from 'apps/website-display/redux/features/ThirdPartySlice';
import { initSupportingThirdPartyApps } from 'commons/configs/SupportingThirdPartyApps';
import { ConfettiContainer } from 'commons/components/molecules/confetti';
import GlobalStyles from 'commons/configs/styles/GlobalStyles';
import { DialogProvider } from 'commons/components/organisms/PortalDialog/DialogContext';

const App = ({ }) => {
  const locale = useSelector((state: any) => state.Intl.locale);
  const dir = locale === 'fa' ? 'rtl' : 'ltr';
  const { data: websiteMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: thirdPartiesTokens } = useGetThirdPartiesQuery()

  useEffect(() => {
    if (thirdPartiesTokens) {
      initSupportingThirdPartyApps(thirdPartiesTokens);
    }
  }, [thirdPartiesTokens])

  useEffect(() => {
    document.body.dir = dir;
  }, [locale]);

  return (
    <Fragment>
      <GlobalStyles />
      {websiteMetadata?.header_data &&
        <Helmet>
          <title>{websiteMetadata.header_data.title}</title>
          <link rel="icon" href={websiteMetadata.header_data.icon} />
          <meta name="description" content={websiteMetadata.header_data.description} />
          <meta name="theme-color" content={websiteMetadata.header_data.theme_color} />

          <meta name="msapplication-TileImage" content={websiteMetadata.header_data.icon} />
          <meta name="msapplication-TileColor" content={websiteMetadata.header_data.theme_color} />

          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </Helmet>
      }
      {websiteMetadata?.og_metadata &&
        <Helmet>
          <meta property="og:title" content={websiteMetadata.og_metadata.title} />
          <meta property="og:description" content={websiteMetadata.og_metadata.description} />
          <meta property="og:type" content={websiteMetadata.og_metadata.type} />
          <meta property="og:image" content={websiteMetadata.og_metadata.image} />
          <meta property="og:url" content={websiteMetadata.og_metadata.url} />
        </Helmet>
      }
      <IntlProvider translations={translations}>
        <CacheProvider value={createEmotionCache(dir)}>
          <GlobalStyles />
          <ThemeProvider theme={selectTheme(dir)}>
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
            <CssBaseline />
            <Root />
          </ThemeProvider>
        </CacheProvider>
      </IntlProvider>
    </ Fragment>
  );
};

export default App;
