import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import useUserProfile from 'commons/hooks/useUserProfile';
import { toPersianNumber } from 'commons/utils/translateNumber';

const UserPhoneNumber = () => {
  const { data, isLoading, isError } = useUserProfile();

  if (isLoading || isError) {
    return (
      <Skeleton width={120} height={60} />
    );
  }

  return (
    <Typography>{toPersianNumber(data?.phone_number) ?? '---'}</Typography>
  );
};

export default UserPhoneNumber;