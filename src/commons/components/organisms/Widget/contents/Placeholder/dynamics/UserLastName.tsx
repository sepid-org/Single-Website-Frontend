import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import useUserProfile from 'commons/hooks/useUserProfile';

const UserLastName = () => {
  const { data, isLoading, isError } = useUserProfile();

  if (isLoading || isError) {
    return (
      <Skeleton width="100%" height="100%" />
    );
  }

  return (
    <Typography>{data?.last_name ?? '---'}</Typography>
  );
};

export default UserLastName;