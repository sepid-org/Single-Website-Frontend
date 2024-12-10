import { Backdrop, CircularProgress } from '@mui/material';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import React from 'react';


const InitialApiCalls = ({ children }) => {
  const { isError, error, isLoading } = useGetWebsiteQuery();

  if (isLoading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (isError) {
    return Error(`Get Website Error: ${(error as any)?.error}`);
  }

  return children;
};

export default InitialApiCalls;