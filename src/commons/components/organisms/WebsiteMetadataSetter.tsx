import React, { Fragment, useEffect } from 'react';
import { Helmet } from "react-helmet";

import { useGetPageMetadataQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useGetThirdPartiesQuery } from 'apps/website-display/redux/features/ThirdPartySlice';
import { initSupportingThirdPartyApps } from 'commons/configs/SupportingThirdPartyApps';

const WebsiteMetadataSetter = ({ }) => {
  const { data: websiteMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: thirdPartiesTokens } = useGetThirdPartiesQuery()

  useEffect(() => {
    if (thirdPartiesTokens) {
      initSupportingThirdPartyApps(thirdPartiesTokens);
    }
  }, [thirdPartiesTokens])

  return (
    <Fragment>
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
    </Fragment >
  );
};

export default WebsiteMetadataSetter;