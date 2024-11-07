import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import React from 'react';


const InitialApiCalls = ({ children }) => {
  const { isError, error, isLoading } = useGetWebsiteQuery();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div>{`status: ${(error as any)?.status} - error: ${(error as any)?.error}`}</div>;
  }

  return children;
};

export default InitialApiCalls;