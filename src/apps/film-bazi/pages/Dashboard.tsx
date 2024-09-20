import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from 'commons/components/template/Layout';
import { useGetProgramQuery, useGetProgramUserPermissionsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Scoreboard from '../components/Scoreboard';
import CinemaScene from '../components/CinemaScene';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from 'apps/website-display/redux/features/party/ProfileSlice';
import { getCityByName } from 'commons/utils/iran';
import { persianFilms } from '../components/SampleFilms';
import useFilmsByCity from '../hooks/useFilmsByCity';
import useLocalNavigate from '../hooks/useLocalNavigate';
import DashboardSidebar from '../components/DashboardSidebar';
import AppBarComponent from '../components/Appbar';
import FilmCard from '../components/FilmCard';

type DashboardPropsType = {}

const Dashboard: FC<DashboardPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });
  const { data: programPermissions } = useGetProgramUserPermissionsQuery({ programSlug });

  const { data: program } = useGetProgramQuery({ programSlug });
  // const { films } = useFilmsByCity({cityId: getCityByName(userProfile?.city)?.id});
  const films = persianFilms;

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{program.name}</title>
        </Helmet>
      }
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
            <DashboardSidebar
              buttons={[
                <Scoreboard />,
                <CinemaScene />,
                <Button variant="contained" color="info" onClick={() => { localNavigate(`/user-profile/`) }}>
                  {'پروفایل'}
                </Button>,
                <>
                  {programPermissions?.is_manager &&
                    <Button
                      variant="contained"
                      color='info'
                      fullWidth
                      onClick={() => localNavigate(`/admin-dashboard/`)}>
                      {'مدیریت دوره'}
                    </Button>
                  }
                </>,
                   <Button
                   variant="contained"
                   color='info'
                   fullWidth
                   onClick={() => localNavigate(`/scoreboard/`)}>
                   {'جدول امتیازات'}
                 </Button>
              ]}
            />
          </Grid>
          <Grid item xs={11} sm={9}>
            <Stack>
              <Grid container spacing={2}>
                {films.map((film) => (
                  <Grid container item xs={12} sm={6} md={4} key={film.name} justifyContent={'center'}>
                    <FilmCard film={film} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Dashboard;
