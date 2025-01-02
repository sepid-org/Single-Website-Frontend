import { Grid, Typography, Stack } from '@mui/material';
import React from 'react';
import ProgramCard from 'commons/components/organisms/cards/ProgramCard';
import Layout from 'commons/template/Layout';
import ProgramCardSkeleton from 'commons/components/organisms/cards/ProgramCardSkeleton';
import Banner from 'commons/components/molecules/Banner';
import { useGetProgramsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetPageMetadataQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';

const Programs = ({ }) => {
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const {
    data: programs,
    isLoading,
    isSuccess,
  } = useGetProgramsQuery({});
  const visiblePrograms = programs?.programs.filter(program => program.is_visible) || [];

  const programsElement = (
    <Grid item container spacing={2} xs={12}>
      {(isSuccess && visiblePrograms.length === 0) ?
        <Grid container justifyContent={'center'}>
          <NoDataFound />
        </Grid> :
        visiblePrograms.map((program, index) => (
          <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
            <ProgramCard program={program} />
          </Grid>
        ))
      }
    </Grid>
  );

  const skeletonElements = (
    <Grid item container spacing={2} xs={12}>
      {[...Array(3)].map((_, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <ProgramCardSkeleton />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Layout appbarMode='DASHBOARD'>
      <Stack width={'100%'} spacing={4} justifyContent='center'>
        <Banner banners={pageMetadata?.banners} />
        <Typography variant="h1" align='center'>
          {'دوره‌‌ها'}
        </Typography>
        <Grid container>
          {isLoading ? skeletonElements : programsElement}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default Programs;
