import {
  Grid,
  Stack,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { Helmet } from "react-helmet";
import GameCard from '../organisms/GameCard';
import FilmSkeletonCard from '../organisms/FilmSkeletonCard';
import { useGetGamesQuery } from 'apps/film-bazi/redux/slices/Game';

type GamesPropsType = {}

const Games: FC<GamesPropsType> = ({ }) => {
  const { data: games = [], isLoading: isGetGamesLoading } = useGetGamesQuery();

  return (
    <Fragment>
      <Helmet>
        <title>{`فیلم‌بازی | بازی‌ها`}</title>
      </Helmet>
      <Stack>
        <Grid container spacing={2}>
          {isGetGamesLoading &&
            [1, 2, 3].map((index) => (
              <Grid container item xs={12} sm={6} lg={4} key={index} justifyContent={'center'}>
                <FilmSkeletonCard />
              </Grid>
            ))
          }
          {games.map((game) => (
            <Grid container item xs={12} sm={6} lg={4} key={game.id} justifyContent={'center'}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Fragment>
  );
}

export default Games;