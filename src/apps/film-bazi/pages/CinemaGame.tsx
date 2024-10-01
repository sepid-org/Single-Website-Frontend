import React, { FC } from 'react';
import BoardPaper from 'commons/template/Paper/BoardPaper';
import useCinemaGameLogic from '../hooks/useCinemaGameLogic';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = process.env.NODE_ENV === 'production' ? '2800' : '11';
  const { objectLogics } = useCinemaGameLogic();

  return (
    <BoardPaper
      objectLogics={objectLogics}
      paperId={paperId}
    />
  );
};

export default CinemaGame;