import {
  Grid,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import MyScoresChip from '../atoms/MyScoresChip';
import DiscountCodeInfo from '../organisms/DiscountCodeInfoCard';
import MyRankBadge from '../atoms/buttons/MyRankBadge';
import { useGetMyDiscountCodesQuery } from 'apps/film-bazi/redux/slices/DiscountCode';

type MyAssetsPropsType = {}

const MyAssets: FC<MyAssetsPropsType> = ({ }) => {
  const { data: discountCodes = [] } = useGetMyDiscountCodesQuery();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>دارایی‌ها</Typography>
      </Grid>
      <Grid xs={12} sm={6} item>
        <MyScoresChip />
      </Grid>
      <Grid xs={12} sm={6} item>
        <MyRankBadge />
      </Grid>
      <Grid item xs={12} marginTop={2}>
        <Typography variant="h3" gutterBottom>کدهای تخفیف گرفته‌شده</Typography>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        {discountCodes.map(discountCode =>
          <Grid container item xs={12} sm={6} md={4} key={discountCode.code} justifyContent={'center'} alignItems={'center'}>
            <DiscountCodeInfo discountCode={discountCode} />
          </Grid>
        )}
      </Grid>
    </Grid >
  );
}

export default MyAssets;