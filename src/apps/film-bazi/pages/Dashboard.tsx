import { Box, Container, Grid } from '@mui/material';
import React, { FC } from 'react';
import AppBarComponent from '../components/organisms/Appbar';
import backgroundImg from "../assets/dashboardBackground.svg";
import Films from '../components/template/Films';
import Games from '../components/template/Games';
import DashboardSidebar from '../components/organisms/DashboardSidebar';

type DashboardPropsType = {
  tab: 'films' | 'games';
}

const Dashboard: FC<DashboardPropsType> = ({
  tab,
}) => {

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: '100vh',
        minWidth: "100vw",
      }}
    >
      <AppBarComponent />
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
    </Box>
  );
}

export default Dashboard;