import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import useUserProfile from 'commons/hooks/useUserProfile';

const UserFullName = () => {
  const { data, isLoading, isError } = useUserProfile();

  if (isLoading || isError) {
    return (
      <Skeleton width={120} height={60} />
    );
  }

  return (
    <Typography color={'white'}>{data?.fullName ?? '---'}</Typography>
  );
};

export default UserFullName;