import { Grid, Typography, Stack, Pagination, Box, Button } from '@mui/material';
import React, { useState } from 'react';
import ProgramCard from 'commons/components/organisms/cards/ProgramCard';
import Layout from 'commons/template/Layout';
import ProgramCardSkeleton from 'commons/components/organisms/cards/ProgramCardSkeleton';
import Banner from 'commons/components/molecules/Banner';
import { useGetProgramsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetPageMetadataQuery, useGetWebsitePermissionQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import { Link } from 'react-router-dom';

const Programs = ({ }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data: pageMetadata } = useGetPageMetadataQuery({ pageAddress: window.location.pathname });
  const {
    data: programsData,
    isLoading,
    isSuccess,
  } = useGetProgramsQuery({ pageNumber, isVisible: true });
  const programs = programsData?.programs || [];
  const { data: websitePermissions } = useGetWebsitePermissionQuery();


  const programsElement = (
    <Grid item container spacing={2} xs={12}>
      {(isSuccess && programs.length === 0) ?
        <Grid container justifyContent={'center'}>
          <Stack alignItems={'center'} spacing={1}>
            <NoDataFound message='هنوز دوره‌ای وجود ندارد' />
            {websitePermissions?.isAdmin &&
              <Button component={Link} to='/management/?tab=programs&openCreateDialog=true'>
                یک دوره جدید بسازید!
              </Button>
            }
          </Stack>
        </Grid> :
        programs.map((program, index) => (
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
      <Stack width={'100%'} spacing={4} alignItems={'center'} justifyContent='center'>
        {pageMetadata?.banners?.length > 0 &&
          <Box width={'100%'}>
            <Banner banners={pageMetadata.banners} />
          </Box>
        }
        <Typography variant="h1" align='center'>
          {'دوره‌ها'}
        </Typography>
        <Grid container>
          {isLoading ? skeletonElements : programsElement}
        </Grid>
        {(isSuccess && programs.length > 0) &&
          <Pagination
            variant="outlined"
            color="primary"
            shape='rounded'
            count={Math.ceil(programsData.count / ITEMS_PER_PAGE_NUMBER)}
            page={pageNumber}
            onChange={(e, value) => setPageNumber(value)}
          />
        }
      </Stack>
    </Layout>
  );
};

export default Programs;
