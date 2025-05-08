import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import React from 'react';

const InitialApiCalls = ({ children }) => {
  const {
    isError: isWebsiteError,
    error: websiteError,
    isLoading: isWebsiteLoading
  } = useGetWebsiteQuery();
  const { isUserAuthenticatedLoading } = useUserAuthentication();

  if (isWebsiteLoading || isUserAuthenticatedLoading) {
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