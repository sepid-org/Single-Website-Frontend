import { Backdrop, CircularProgress } from '@mui/material';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useCheckAuthenticationQuery } from 'commons/redux/apis/party/UserApi';
import React from 'react';


const InitialApiCalls = ({ children }) => {
  const { isError, error, isLoading: isGetWebsiteLoading } = useGetWebsiteQuery();
  const { isLoading: isCheckAuthenticationLoading } = useCheckAuthenticationQuery();

  if (isGetWebsiteLoading || isCheckAuthenticationLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    throw Error(`Get Website Error: ${error?.data?.error}`);
  } else {
    return children;
  }
};

export default InitialApiCalls;