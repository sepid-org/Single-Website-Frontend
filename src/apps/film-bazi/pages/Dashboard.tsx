import { Container, Grid, Stack } from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import DashboardSidebar from '../components/organisms/DashboardSidebar';
import AppBarComponent from '../components/organisms/Appbar';
import FilmCard from '../components/organisms/FilmCard';
import { persianFilms } from '../constants/SampleFilms';

type DashboardPropsType = {}

const Dashboard: FC<DashboardPropsType> = ({ }) => {
  const { programSlug } = useParams();

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
            <DashboardSidebar />
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
