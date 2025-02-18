import { Box, Grid, Pagination, Stack } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

import VerticalFSMCard from 'commons/components/organisms/cards/FSMVerticalCard';
import useWidth from 'commons/utils/UseWidth';
import NoDataFound from 'commons/components/molecules/NoDataFound';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { ITEMS_PER_PAGE_NUMBER } from 'commons/constants/Constants';
import { useParams } from 'react-router-dom';
import { useGetProgramUserFSMsStatusQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FSMHorizontalCard from './cards/FSMHorizontalCard';

type FSMsGridPropsType = {}

const FSMsGrid: FC<FSMsGridPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const width = useWidth();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: FSMsData, isLoading } = useGetFSMsQuery({ programSlug, pageNumber })
  const { data: programUserFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });

  const numberOfSkeleton = width === 'sm' || width === 'md' ? 4 : 3;

  const visibleFSMS = FSMsData?.fsms?.filter(fsm => fsm.is_visible) || []

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(numberOfSkeleton)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6} lg={4}>
            <VerticalFSMCard isLoading={true} fsm={null} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (visibleFSMS.length > 0) {
    return (
      <Stack spacing={2}>
        <Stack>
          <Grid container spacing={2}>
            {visibleFSMS.map((fsm) => {
              if (fsm.card_type === 'vertical1') {
                return (
                  <Grid item key={fsm.id} xs={12} sm={6} lg={4}>
                    <VerticalFSMCard
                      fsm={fsm}
                      userStatus={programUserFSMsStatus?.find(status => status.fsm_id === fsm.id)}
                    />
                  </Grid>
                )
              } else {
                return (
                  <Grid item key={fsm.id} xs={12}>
                    <FSMHorizontalCard
                      fsm={fsm}
                      userStatus={programUserFSMsStatus?.find(status => status.fsm_id === fsm.id)}
                    />
                  </Grid>
                )
              }
            })}
          </Grid >
        </Stack>
        <Pagination
          variant="outlined"
          color="primary"
          shape='rounded'
          count={Math.ceil(FSMsData?.count / ITEMS_PER_PAGE_NUMBER)}
          page={pageNumber}
          onChange={(e, value) => setPageNumber(value)}
        />
      </Stack >
    );
  }

  return (
    <Box my={4}>
      <NoDataFound variant={2} message={'هنوز کارگاه یا آزمونی وجود ندارد!'} />
    </Box>
  );

}

export default FSMsGrid;