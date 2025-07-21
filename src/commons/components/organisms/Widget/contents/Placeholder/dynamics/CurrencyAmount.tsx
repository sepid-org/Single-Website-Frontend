import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useGetMyBalancesQuery } from 'commons/redux/apis/bank/MyInfo';

interface Props { currency: string }

const CurrencyAmount: React.FC<Props> = ({ currency }) => {
  const { data, isLoading, isError } = useGetMyBalancesQuery();
  const amount = data?.[currency] ?? 0;

  if (isLoading || isError) {
    return (
      <Skeleton width="100%" height="100%" />
    );
  }

  return (
    <Typography>{amount.toLocaleString('en-US')}</Typography>
  );
};

export default CurrencyAmount;