import { Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ProgramPageSidebar from 'apps/program/components/organisms/ProgramPageSidebar';
import { useGetProgramUserFSMsStatusQuery, useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Layout from 'commons/template/Layout';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FSMCard from '../components/organisms/cards/FSMCard';
import useLocalNavigate from '../hooks/useLocalNavigate';
import useMenuCourts from '../hooks/useMenuCourts';
import MyTotalScoreChip from '../components/molecules/chips/MyTotalScore';
import ProgramPageWrapper from 'apps/program/template/ProgramPageWrapper';

type OldGameMenuPropsType = {}

const OldGameMenu: FC<OldGameMenuPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsmsData } = useGetFSMsQuery({ programSlug, pageNumber })
  const { data: programUserFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { courts } = useMenuCourts();

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{program.name}</title>
        </Helmet>
      }
      <Layout appbarMode='PROGRAM'>
        <Grid container spacing={4} alignItems='flex-start'>
          <Grid item xs={12} sm={3} position={{ xs: null, sm: 'sticky' }} top={0}>
            <ProgramPageSidebar
              otherButtons={[
                <MyTotalScoreChip />,
                <Button variant='outlined' onClick={() => localNavigate('/profile/')}>
                  {'پروفایل'}
                </Button>,
                <Button variant='outlined' onClick={() => localNavigate('/friendship-network/')}>
                  {'حلقه دوستان'}
                </Button>
              ]}
            />
          </Grid>
          <Grid container item xs={12} sm={9} spacing={2}>
            <Grid item xs={12}>
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
                  {'دادگاه‌ها'}
                </Typography>
                <Pagination
                  variant="outlined"
                  color="primary"
                  shape='rounded'
                  count={Math.ceil((fsmsData?.count || 0) / 12)}
                  page={pageNumber}
                  onChange={(e, value) => setPageNumber(value)}
                  sx={{ marginBottom: 1 }}
                />
              </Stack>
            </Grid>
            <Grid container item spacing={2}>
              {fsmsData?.fsms?.map(fsm =>
                <Grid item xs={12} sm={6} md={4} key={fsm.id}>
                  <FSMCard
                    fsm={fsm}
                    userFSMStatus={programUserFSMsStatus?.find(status => status.fsm_id === fsm.id)}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </Fragment>
  );
}

export default OldGameMenu;
