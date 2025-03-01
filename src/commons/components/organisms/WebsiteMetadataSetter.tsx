import React, { Fragment, useEffect } from 'react';
import { Helmet } from "react-helmet";

import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useGetThirdPartiesQuery } from 'apps/website-display/redux/features/ThirdPartySlice';
import { initSupportingThirdPartyApps } from 'commons/configs/SupportingThirdPartyApps';

const WebsiteMetadataSetter = ({ }) => {
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: websiteData } = useGetWebsiteQuery();
  const { data: thirdPartiesTokens } = useGetThirdPartiesQuery()

  useEffect(() => {
    if (thirdPartiesTokens) {
      initSupportingThirdPartyApps(thirdPartiesTokens);
    }
  }, [thirdPartiesTokens])

  return (
    <Fragment>
      {websiteData?.header && !(pageMetadata?.header_data) &&
        <Helmet>
          <title>{websiteData.header.title}</title>
          <link rel="icon" href={websiteData.header.icon} />
          <meta name="description" content={websiteData.header.description} />
          <meta name="theme-color" content={websiteData.header.theme_color} />

          <meta name="msapplication-TileImage" content={websiteData.header.icon} />
          <meta name="msapplication-TileColor" content={websiteData.header.theme_color} />

          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </Helmet>
      }
      {pageMetadata?.header_data &&
        <Helmet>
          <title>{pageMetadata.header_data.title}</title>
          <link rel="icon" href={pageMetadata.header_data.icon} />
          <meta name="description" content={pageMetadata.header_data.description} />
          <meta name="theme-color" content={pageMetadata.header_data.theme_color} />

          <meta name="msapplication-TileImage" content={pageMetadata.header_data.icon} />
          <meta name="msapplication-TileColor" content={pageMetadata.header_data.theme_color} />

          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </Helmet>
      }
      {pageMetadata?.og_metadata &&
        <Helmet>
          <meta property="og:title" content={pageMetadata.og_metadata.title} />
          <meta property="og:description" content={pageMetadata.og_metadata.description} />
          <meta property="og:type" content={pageMetadata.og_metadata.type} />
          <meta property="og:image" content={pageMetadata.og_metadata.image} />
          <meta property="og:url" content={pageMetadata.og_metadata.url} />
        </Helmet>
      }
    </Fragment >
  );
};

export default WebsiteMetadataSetter;