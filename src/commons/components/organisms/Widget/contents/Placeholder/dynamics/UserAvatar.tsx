import React from 'react';
import { Avatar, Skeleton } from '@mui/material';
import useUserProfile from 'commons/hooks/useUserProfile';

const UserAvatar = () => {
  const { data, isLoading, isError } = useUserProfile();

  if (isLoading || isError) {
    return (
      <Skeleton variant="circular" width={100} height={100} />
    );
  }

  return (
    <Avatar
      src={data?.profile_image}
      alt={data?.fullName}
      sx={{ width: '100%', height: '100%' }}
    />
  );
};

export default UserAvatar;