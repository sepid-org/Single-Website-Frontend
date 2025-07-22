import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import useUserProfile from 'commons/hooks/useUserProfile';

const UserFirstName = () => {
  const { data, isLoading, isError } = useUserProfile();

  if (isLoading || isError) {
    return (
      <Skeleton width={120} height={80} />
    );
  }

  return (
    <Typography color={'white'}>{data?.first_name ?? '---'}</Typography>
  );
};

export default UserFirstName;