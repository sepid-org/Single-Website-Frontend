import { Container, Grid } from '@mui/material';
import React, { FC } from 'react';
import Films from '../components/template/Films';
import Games from '../components/template/Games';
import DashboardSidebar from '../components/organisms/DashboardSidebar';
import FilmbaziLayout from '../components/molecules/Layout';

type DashboardPropsType = {
  tab: 'films' | 'games';
}

const Dashboard: FC<DashboardPropsType> = ({
  tab,
}) => {

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
        <Grid container justifyContent={'center'} alignItems={'start'} spacing={{ xs: 4, md: 0 }}>
          <Grid container item xs={11} sm={3} justifyContent={'center'} alignItems={'center'}>
            <DashboardSidebar tab={tab} />
          </Grid>
          <Grid item xs={11} sm={9}>
            {tab === 'films' ? <Films /> : <Games />}
          </Grid>
        </Grid>
      </Container>
    </FilmbaziLayout>
  );
}

export default Dashboard;