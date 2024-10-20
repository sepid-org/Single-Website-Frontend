import {
  Grid,
  Stack,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import GameCard from '../organisms/GameCard';
import { GameType } from 'apps/film-bazi/types';

type GamesPropsType = {}

const Games: FC<GamesPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const games: GameType[] = [
    // todo
  ]

  return (
    <Fragment>
      {program &&
        <Helmet>
          <title>{`${program.name} | بازی‌ها`}</title>
        </Helmet>
      }
      <Stack>
        <Grid container spacing={2}>
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