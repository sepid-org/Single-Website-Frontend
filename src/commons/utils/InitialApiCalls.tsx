import { Backdrop, CircularProgress } from '@mui/material';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useCheckAuthenticationQuery } from 'commons/redux/apis/party/UserApi';
import React, { useState, useEffect } from 'react';

const InitialApiCalls = ({ children }) => {
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const {
    isError: isWebsiteError,
    error: websiteError,
    isLoading: isWebsiteLoading
  } = useGetWebsiteQuery();
  const {
    isLoading: isAuthLoading
  } = useCheckAuthenticationQuery();

  useEffect(() => {
    if (!isWebsiteLoading && !isAuthLoading && !initialLoadDone) {
      setInitialLoadDone(true);
    }
  }, [isWebsiteLoading, isAuthLoading, initialLoadDone]);

  if (!initialLoadDone && (isWebsiteLoading || isAuthLoading)) {
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