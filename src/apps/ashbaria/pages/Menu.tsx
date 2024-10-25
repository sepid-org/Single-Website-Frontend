import { Button, Grid, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ProgramPageSidebar from 'commons/components/organisms/ProgramPageSidebar';
import { useGetProgramUserFSMsStatusQuery, useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Layout from 'commons/template/Layout';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FSMCard from '../components/organisms/cards/FSMCard';
import useLocalNavigate from '../hooks/useLocalNavigate';
import MyScoreChip from '../components/molecules/chips/MyScore';
import useMenuCourts from '../hooks/useMenuCourts';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsms } = useGetFSMsQuery({ programSlug, pageNumber: 1 })
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
                <MyScoreChip />,
                <Button variant='outlined' onClick={() => localNavigate('/profile/')}>
                  {'پروفایل'}
                </Button>,
                <Button variant='outlined' onClick={() => localNavigate('/friendship-network/')}>
                  {'حلقه دوستان'}
                </Button>
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
              {'دادگاه‌ها'}
            </Typography>
            <Grid container spacing={2}>
              {fsms?.fsms?.map(fsm =>
                <Grid item xs={12} sm={4} key={fsm.id}>
                  <FSMCard
                    fsm={fsm}
                    userFSMStatus={programUserFSMsStatus?.find(programFSMsUserPermissions => programFSMsUserPermissions.fsm_id === fsm.id)}
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

export default GameMenu;
