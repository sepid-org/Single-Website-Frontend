import {
  Grid,
  Stack,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { Helmet } from "react-helmet";
import FilmSkeletonCard from '../organisms/FilmSkeletonCard';
import FilmCard from '../organisms/FilmCard';
import { useGetFilmsQuery } from 'apps/film-bazi/redux/slices/Film';


type FilmsPropsType = {}

const Films: FC<FilmsPropsType> = ({ }) => {
  const { data: films = [], isLoading } = useGetFilmsQuery();

  return (
    <Fragment>
      <Helmet>
        <title>{`فیلم‌بازی | فیلم‌ها`}</title>
      </Helmet>
      <Stack>
        <Grid container spacing={2}>
          {isLoading &&
            [1, 2, 3].map((index) => (
              <Grid container item xs={12} sm={6} lg={4} key={index} justifyContent={'center'}>
                <FilmSkeletonCard />
              </Grid>
            ))
          }
          {films.map((film) => (
            <Grid container item xs={12} sm={6} lg={4} key={film.name} justifyContent={'center'}>
              <FilmCard film={film} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Fragment>
  );
}

export default Films;