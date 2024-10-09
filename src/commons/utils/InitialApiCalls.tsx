import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import React from 'react';


const InitialApiCalls = ({ children }) => {
  const { isError, isLoading } = useGetWebsiteQuery();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return children;
};

export default InitialApiCalls;