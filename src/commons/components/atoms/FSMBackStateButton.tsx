import { Button } from '@mui/material';
import React, { FC, useContext } from 'react';
import {
  useGoBackwardMutation,
  useMentorMoveBackwardMutation,
} from 'apps/website-display/redux/features/program/PlayerSlice';
import { useGetFSMStateInwardEdgesQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type FSMBackStateButtonPropsType = {}

const FSMBackStateButton: FC<FSMBackStateButtonPropsType> = ({ }) => {
  const { fsmStateId, playerId, isMentor } = useFSMContext();
  const [goBackward, goBackwardResult] = useGoBackwardMutation();
  const [mentorMoveBackward, mentorMoveBackwardResult] = useMentorMoveBackwardMutation();
  const { data: inwardEdges = [] } = useGetFSMStateInwardEdgesQuery({ fsmStateId })

  const edges = isMentor
    ? inwardEdges
    : inwardEdges.filter((edge) => edge.is_visible);

  if (edges.length === 0) {
    return null;
  }

  const backEdge = edges[0];

  const handleClick = () => {
    if (isMentor) {
      mentorMoveBackward({
        playerId,
      });
    } else {
      if (backEdge.is_back_enabled) {
        goBackward({
          playerId,
        });
      }
    }
  };

  return (
    <Button
      disabled={!backEdge.is_back_enabled || goBackwardResult?.isLoading || mentorMoveBackwardResult?.isLoading}
      fullWidth
      variant="outlined"
      color="primary"
      onClick={handleClick}>
      {'گام قبل'}
    </Button>
  );
}

export default FSMBackStateButton;