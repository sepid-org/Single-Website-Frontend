import {
  Grid,
  Stack,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { Helmet } from "react-helmet";
import FilmSkeletonCard from '../organisms/FilmSkeletonCard';
import FilmCard from '../organisms/FilmCard';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import useGetFilms from 'apps/film-bazi/hooks/useGetFilms';


type FilmsPropsType = {}

const Films: FC<FilmsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { films, loading: getFilmsLoading } = useGetFilms();

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{`${program.name} | فیلم‌ها`}</title>
        </Helmet>
      }
      <Stack>
        <Grid container spacing={2}>
          {getFilmsLoading &&
            [1, 2, 3].map((index) => (
              <Grid container item xs={12} sm={6} md={4} key={index} justifyContent={'center'}>
                <FilmSkeletonCard />
              </Grid>
            ))
          }
          {films.map((film) => (
            <Grid container item xs={12} sm={6} md={4} key={film.name} justifyContent={'center'}>
              <FilmCard film={film} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Fragment>
  );
}

export default Films;