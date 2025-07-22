import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useGetMyRankQuery } from 'commons/redux/apis/bank/MyInfo';
import { toPersianNumber } from 'commons/utils/translateNumber';

interface Props { currency: string }

const CurrencyRank: React.FC<Props> = ({ currency }) => {
  const { data, isLoading, isError } = useGetMyRankQuery(
    { currencyName: currency },
    { skip: !currency }
  );

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
    <Typography color={'white'}>{toPersianNumber(data?.rank ?? '-')}</Typography>
  );
};

export default CurrencyRank;
