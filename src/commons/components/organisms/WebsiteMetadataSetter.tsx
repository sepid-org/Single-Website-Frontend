import React, { Fragment, useEffect } from 'react';
import { Helmet } from "react-helmet";

import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useGetThirdPartiesQuery } from 'apps/website-display/redux/features/ThirdPartySlice';
import { initSupportingThirdPartyApps } from 'commons/configs/SupportingThirdPartyApps';

const WebsiteMetadataSetter = ({ }) => {
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: website } = useGetWebsiteQuery();
  const { data: thirdParties } = useGetThirdPartiesQuery()

  useEffect(() => {
    if (thirdParties) {
      initSupportingThirdPartyApps(thirdParties);
    }
  }, [thirdParties])

  return (
    <Fragment>
      {website?.header && !(pageMetadata?.header) &&
        <Helmet>
          <title>{website.header.title}</title>
          <link rel="icon" href={website.header.icon} />
          <meta name="description" content={website.header.description} />
          <meta name="theme-color" content={website.header.theme_color} />

          <meta name="msapplication-TileImage" content={website.header.icon} />
          <meta name="msapplication-TileColor" content={website.header.theme_color} />

          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </Helmet>
      }
      {pageMetadata?.header &&
        <Helmet>
          <title>{pageMetadata.header.title}</title>
          <link rel="icon" href={pageMetadata.header.icon} />
          <meta name="description" content={pageMetadata.header.description} />
          <meta name="theme-color" content={pageMetadata.header.theme_color} />

          <meta name="msapplication-TileImage" content={pageMetadata.header.icon} />
          <meta name="msapplication-TileColor" content={pageMetadata.header.theme_color} />

          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </Helmet>
      }
      {pageMetadata?.open_graph &&
        <Helmet>
          <meta property="og:title" content={pageMetadata.open_graph.title} />
          <meta property="og:description" content={pageMetadata.open_graph.description} />
          <meta property="og:type" content={pageMetadata.open_graph.type} />
          <meta property="og:image" content={pageMetadata.open_graph.image} />
          <meta property="og:url" content={pageMetadata.open_graph.url} />
        </Helmet>
      }
    </Fragment >
  );
};

export default WebsiteMetadataSetter;