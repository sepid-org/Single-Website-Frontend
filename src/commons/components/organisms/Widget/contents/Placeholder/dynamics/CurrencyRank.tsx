import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useGetMyRankQuery } from 'commons/redux/apis/bank/MyInfo';

interface Props { currency: string }

const CurrencyRank: React.FC<Props> = ({ currency }) => {
  const { data, isLoading, isError } = useGetMyRankQuery(
    { currencyName: currency },
    { skip: !currency }
  );

  if (isLoading || isError) {
    return (
      <Skeleton width="100%" height="100%" />
    );
  }

  return (
    <Typography>{data?.rank ?? '--'}</Typography>
  );
};

export default CurrencyRank;
