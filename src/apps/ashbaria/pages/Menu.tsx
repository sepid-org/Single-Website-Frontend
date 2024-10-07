import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import FSMsGrid from 'commons/components/organisms/FSMsGrid';
import ProgramPageSidebar from 'commons/components/organisms/ProgramPageSidebar';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetPageMetadataQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import Layout from 'commons/template/Layout';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });

  return (
    <Fragment>
      {pageMetadata && program &&
        <Helmet>
          <title>{pageMetadata.header_data.title + ' | ' + program.name}</title>
        </Helmet>
      }
      <Layout appbarMode='PROGRAM'>
        <Grid container spacing={4} alignItems='flex-start'>
          <Grid item xs={12} sm={3} position={{ xs: null, sm: 'sticky' }} top={0}>
            <ProgramPageSidebar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
              {'دادگاه‌ها'}
            </Typography>
            <FSMsGrid />
          </Grid>
        </Grid>
      </Layout>
    </Fragment>
  );
}

export default GameMenu;
