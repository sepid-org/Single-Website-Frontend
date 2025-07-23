import { Grid, Paper, Stack, Typography } from '@mui/material';
import PurchaseMerchandise from 'apps/program/components/organisms/PurchaseMerchandise';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMerchandisesQuery } from 'apps/website-display/redux/features/sales/Merchandise';

type PaymentPropsType = {}

const Payment: FC<PaymentPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data } = useGetMerchandisesQuery({ programSlug, isActive: true }, { skip: !Boolean(program) })
  const merchandises = data?.results;

  return (
    <Stack spacing={4}>
      <Typography align="center" fontSize={40} fontWeight={600} sx={{ textShadow: '1px 1px #dbd9d9' }} gutterBottom>
        {'پرداخت هزینه'}
      </Typography>
      <Stack component={Paper} padding={2}>
        <Grid container spacing={3}>
          <Grid item justifyContent="center" alignItems="center">
            <Typography>
              شما برای شرکت در این دوره پذیرفته‌شده‌اید!
            </Typography>
            <Typography>
              توجه کنید تا پرداخت خود را انجام ندهید، ثبت‌نامتان قطعی نخواهد شد.
            </Typography>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            {merchandises?.filter(merchandise => merchandise.is_active).map(merchandise =>
              <Grid item xs={12} key={merchandise.id}>
                <PurchaseMerchandise merchandise={merchandise} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Payment;