import React from 'react';
import { Skeleton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import usePlayerPerformance from 'commons/hooks/fsm/useGetPlayerPerformance';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type Variant = 'correct' | 'wrong' | 'unknown';

interface Props { variant: Variant }

const AnswerCount: React.FC<Props> = ({ variant }) => {
  const { player } = useFSMContext();

  const { isLoading, correct, wrong, unknown } =
    usePlayerPerformance({ playerId: parseInt(player.id) });

  const value =
    variant === 'correct' ? correct
      : variant === 'wrong' ? wrong
        : unknown;

  if (isLoading) {
    return (
      <Skeleton width={100} height={80} />
    );
  }

  return (
    <Typography color={'white'}>{value}</Typography>
  );
};

export default AnswerCount;