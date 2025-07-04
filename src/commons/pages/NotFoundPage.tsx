import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useGetPageMetadataQuery, useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const { data: website } = useGetWebsiteQuery();

  return (
    <Fragment>
      {website?.header &&
        <Helmet>
          <title>{website.header.title + ' | خطای ۴۰۴'}</title>
        </Helmet>
      }
      {pageMetadata?.header &&
        <Helmet>
          <title>{pageMetadata.header.title + ' | خطای ۴۰۴'}</title>
        </Helmet>
      }
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: '100vh',
          }}>
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
              <Typography variant="h1" align="center">
                🧶 خطای ۴۰۴ 🧶🐈
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h3" align="center">
                کاموای این رنگی رو تموم کردیم؛ اما رنگای دیگه‌ای داریم.
              </Typography>
            </Grid>
            <Grid item>
              <ButtonGroup size="large" variant="contained" color="primary">
                <Button onClick={() => navigate('/')}>
                  صفحه اصلی
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default NotFoundPage;
