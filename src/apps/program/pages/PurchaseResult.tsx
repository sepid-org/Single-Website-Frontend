import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { toPersianNumber } from 'commons/utils/translateNumber';
import React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';


const PurchaseResult = () => {
  const { programSlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const refId = searchParams.get('ref_id');

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}>
        <Grid
          direction="column"
          item
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-around"
          xs={12}
          md={6}>
          <Grid item>
            <Stack spacing={2}>
              <Typography gutterBottom variant="h1" align="center">
                {status === 'success' ?
                  'ثبت‌نام شما با موفقیت انجام شد!' :
                  'ثبت‌نام شما ناموفق بود :('
                }
              </Typography>
              <Typography variant="h4" align="center">
                {status === 'success' ?
                  `شماره پیگیری: ${toPersianNumber(refId)}` :
                  'چنانچه هزینه‌ای از حساب شما کسر شده، به پشتیبانی سامانه اطلاع دهید تا بررسی کنیم.'
                }
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Button
              onClick={() => navigate(`/program/${programSlug}/`)}
              variant="contained"
              color="primary">
              {status === 'success' ?
                'بزن بریم' :
                'متوجه شدم'
              }
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PurchaseResult;
