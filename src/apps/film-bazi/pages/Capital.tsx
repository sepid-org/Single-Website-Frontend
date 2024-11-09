import React, { FC } from 'react';
import {
  Button,
  Grid,
  Stack,
  Typography,
  Container,
} from '@mui/material';
import FilmbaziLayout from '../components/molecules/Layout';
import { useGetMyDiscountCodesQuery } from 'apps/film-bazi/redux/slices/DiscountCode';
import MyScoresChip from '../components/atoms/chips/MyScoresChip';
import MyCapitalChip from '../components/atoms/chips/MyCapital';
import DiscountCodeInfo from '../components/organisms/DiscountCodeInfoCard';

type PropsType = {}

const CapitalPage: FC<PropsType> = ({ }) => {
  const { data: discountCodes = [] } = useGetMyDiscountCodesQuery();

  return (
    <FilmbaziLayout>
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          paddingTop: 4,
          paddingBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
              <Typography variant="h2">سرمایه من</Typography>
              <Button variant='contained' color='info' size='large'>
                <Typography color={'#120F24'} fontWeight={600}>
                  {'تسویه کن'}
                </Typography>
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} item>
            <MyScoresChip />
          </Grid>
          <Grid xs={12} sm={6} item>
            <MyCapitalChip />
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <Typography variant="h2" gutterBottom>کدهای تخفیف من</Typography>
          </Grid>
          <Grid container item xs={12} spacing={2}>
            {discountCodes.map(discountCode =>
              <Grid container item xs={12} sm={6} md={4} key={discountCode.code} justifyContent={'center'} alignItems={'center'}>
                <DiscountCodeInfo discountCode={discountCode} />
              </Grid>
            )}
          </Grid>
        </Grid >
      </Container>
    </FilmbaziLayout>
  );
};

export default CapitalPage;