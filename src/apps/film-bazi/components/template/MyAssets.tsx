import {
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import UserSettingInfoForm from 'commons/components/organisms/forms/UserSettingInfoForm';
import useGetMyDiscountCodes from 'apps/film-bazi/hooks/useGetMyDiscountCodes';
import MyScoreBadge from '../atoms/buttons/MyScoreBadge';
import DiscountCodeInfo from '../organisms/DiscountCodeInfoCard';
import MyRankBadge from '../atoms/buttons/MyRankBadge';

type MyAssetsPropsType = {}

const MyAssets: FC<MyAssetsPropsType> = ({ }) => {
  const { discountCodes } = useGetMyDiscountCodes();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>دارایی‌ها</Typography>
      </Grid>
      <Grid xs={12} sm={6} item>
        <MyScoreBadge />
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