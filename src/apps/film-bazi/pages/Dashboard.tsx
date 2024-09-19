import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Layout from 'commons/components/template/Layout';
import ProgramPageSidebar from 'commons/components/organisms/ProgramPageSidebar';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FilmCard from '../components/FilmCard';
import Scoreboard from '../components/Scoreboard';
import CinemaScene from '../components/CinemaScene';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from 'apps/website-display/redux/features/party/ProfileSlice';
import { getCityByName } from 'commons/utils/iran';
import { persianFilms } from '../components/SampleFilms';
import useFilmsByCity from '../hooks/useFilmsByCity';
import useLocalNavigate from '../hooks/useLocalNavigate';

type DashboardPropsType = {}

const Dashboard: FC<DashboardPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const userInfo = useSelector((state: any) => state.account.userInfo);
  const { data: userProfile } = useGetUserProfileQuery({ userId: userInfo.id });

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
      <Layout appbarMode='PROGRAM'>
        <Stack width={'100%'} direction={{ xs: 'column', sm: 'row' }} alignItems='flex-start' spacing={2}>
          <Box width={{ xs: '100%', sm: '25%', md: '20%' }} position={{ xs: null, sm: 'sticky' }} top={16}>
            <ProgramPageSidebar
              otherButtons={[
                <Scoreboard />,
                <CinemaScene />,
                <Button variant="contained" color="info" onClick={() => { localNavigate(`/user-profile/`) }}>
                  {'پروفایل'}
                </Button>
              ]}
            />
          </Box>
          <Stack width={{ xs: '100%', sm: '75%', md: '80%' }} spacing={2}>
            {/* <Banner banners={pageMetadata?.banners} /> */}
            <Typography component="h1" fontWeight={700} fontSize={28} gutterBottom>
              {'فیلم‌های شهر شما'}
            </Typography>
            <Stack>
              <Grid container spacing={2}>
                {films.map((film) => (
                  <Grid container item xs={12} sm={6} md={4} key={film.name} justifyContent={'center'}>
                    <FilmCard film={film} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Layout>
    </Fragment>
  );
}

export default Dashboard;
