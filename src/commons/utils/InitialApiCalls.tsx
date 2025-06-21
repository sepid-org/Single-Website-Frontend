import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';
import React from 'react';

const InitialApiCalls = ({ children }) => {
  const {
    isError: isWebsiteError,
    error: websiteError,
    isLoading: isWebsiteLoading
  } = useGetWebsiteQuery();

  if (isWebsiteLoading) {
    return (
      <TransparentBackdrop open={true} />
    );
  }

  if (isWebsiteError) {
    throw new Error(`Get Website Error: ${websiteError?.data?.error}`);
  }

  return children;
};

export default InitialApiCalls;