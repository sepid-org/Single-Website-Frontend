import {
  Grid,
  Stack,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import GameCard from '../organisms/GameCard';
import useGetGames from 'apps/film-bazi/hooks/useGetGames';
import FilmSkeletonCard from '../organisms/FilmSkeletonCard';

type GamesPropsType = {}

const Games: FC<GamesPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { games, loading: isGetGamesLoading } = useGetGames();

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{`${program.name} | بازی‌ها`}</title>
        </Helmet>
      }
      <Stack>
        <Grid container spacing={2}>
          {isGetGamesLoading &&
            [1, 2, 3].map((index) => (
              <Grid container item xs={12} sm={6} md={4} key={index} justifyContent={'center'}>
                <FilmSkeletonCard />
              </Grid>
            ))
          }
          {games.map((game) => (
            <Grid container item xs={12} sm={6} md={4} key={game.id} justifyContent={'center'}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Fragment>
  );
}

export default Games;