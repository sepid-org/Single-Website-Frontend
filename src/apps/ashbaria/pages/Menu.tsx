import { Grid, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import ProgramPageSidebar from 'commons/components/organisms/ProgramPageSidebar';
import { useGetProgramFSMsUserPermissionsQuery, useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Layout from 'commons/template/Layout';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import FSMCard from '../components/organisms/cards/FSMCard';

type GameMenuPropsType = {}

const GameMenu: FC<GameMenuPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: fsms } = useGetFSMsQuery({ programSlug, pageNumber: 1 })
  const { data: programFSMsUserPermissions } = useGetProgramFSMsUserPermissionsQuery({ programSlug });

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
            <ProgramPageSidebar />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
              {'دادگاه‌ها'}
            </Typography>
            {fsms?.fsms?.map(fsm =>
              <Grid item xs={12} sm={4} key={fsm.id}>
                <FSMCard
                  fsm={fsm}
                  userPermissions={programFSMsUserPermissions?.find(programFSMsUserPermissions => programFSMsUserPermissions.fsm_id === fsm.id)}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Layout>
    </Fragment>
  );
}

export default GameMenu;
