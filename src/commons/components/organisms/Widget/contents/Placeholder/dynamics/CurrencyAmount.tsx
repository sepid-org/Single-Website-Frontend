import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useGetMyBalancesQuery } from 'commons/redux/apis/bank/MyInfo';
import { toPersianNumber } from 'commons/utils/translateNumber';

interface Props { currency: string }

const CurrencyAmount: React.FC<Props> = ({ currency }) => {
  const { data, isLoading, isError } = useGetMyBalancesQuery();
  const amount = data?.[currency] ?? 0;

  if (isError) {
    return (
      <Typography>
        خطا
      </Typography>
    )
  }

  if (isLoading) {
    return (
      <Skeleton width={100} height={80} />
    );
  }

  return (
    <Typography color={'white'}>{toPersianNumber(amount)}</Typography>
  );
};

export default CurrencyAmount;