import React, { FC } from 'react';
import {
  Button,
  Grid,
  Stack,
  Typography,
  Container,
  Skeleton,
} from '@mui/material';
import FilmbaziLayout from '../components/molecules/Layout';
import { useGetMyDiscountCodesQuery } from 'apps/film-bazi/redux/slices/DiscountCode';
import MyScoresChip from '../components/atoms/chips/MyScoresChip';
import MyCapitalChip from '../components/atoms/chips/MyCapital';
import DiscountCode from '../components/organisms/cards/DiscountCode';
import CustomWarning from '../components/atoms/chips/CustomWarning';
import TooltipInfo from 'commons/components/atoms/TooltipInfo';

type PropsType = {}

const CapitalPage: FC<PropsType> = ({ }) => {
  const { data: discountCodes = [], isLoading } = useGetMyDiscountCodesQuery();

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
            <CustomWarning text={'توجه کنید که سرمایه‌ی شما تا ۲۴ ساعت بعد از خرید به‌روز می‌شود'} />
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
              <Stack direction={'row'} spacing={1}>
                <Typography variant="h2">سرمایه من</Typography>
                <TooltipInfo title={'«سرمایه» از روی تعداد خریدهای شبکه‌ی دوستی‌ات محاسبه می‌شود. هرچقدر که کد تخفیفت را بیشتر به دوستانت بدهی، سرمایه‌ی بیشتری به‌دست می‌آوری'} />
              </Stack>
              <Button variant='contained' color='info' size='large' disabled={true}>
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

            {isLoading ?
              [1, 2, 3].map((index) =>
                <Grid container item xs={12} sm={6} md={4} key={index} justifyContent={'center'} alignItems={'center'}>
                  <Skeleton width={'100%'} height={180} variant='rounded' />
                </Grid>
              ) :
              discountCodes?.length > 0 ?
                discountCodes.map(discountCode =>
                  <Grid container item xs={12} sm={6} md={4} key={discountCode.code} justifyContent={'center'} alignItems={'center'}>
                    <DiscountCode discountCode={discountCode} />
                  </Grid>
                ) :
                <Grid item>
                  <Typography>
                    {'کد تخفیفی وجود ندارد :('}
                  </Typography>
                </Grid>
            }
          </Grid>
        </Grid >
      </Container>
    </FilmbaziLayout>
  );
};

export default CapitalPage;