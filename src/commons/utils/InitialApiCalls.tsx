import { Backdrop, CircularProgress } from '@mui/material';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import React, { useState, useEffect } from 'react';

const InitialApiCalls = ({ children }) => {
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const {
    isError: isWebsiteError,
    error: websiteError,
    isLoading: isWebsiteLoading
  } = useGetWebsiteQuery();
  const { isUserAuthenticatedLoading } = useUserAuthentication();

  useEffect(() => {
    if (!isWebsiteLoading && !isUserAuthenticatedLoading && !initialLoadDone) {
      setInitialLoadDone(true);
    }
  }, [isWebsiteLoading, isUserAuthenticatedLoading, initialLoadDone]);

  if (!initialLoadDone && (isWebsiteLoading || isUserAuthenticatedLoading)) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isWebsiteError) {
    throw new Error(`Get Website Error: ${websiteError?.data?.error}`);
  }

  return children;
};

export default InitialApiCalls;