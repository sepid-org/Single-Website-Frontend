import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useGetFSMStateInwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import useTransitionBackward from 'commons/hooks/fsm/useTransitionBackward';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type FSMBackStateButtonPropsType = {}

const FSMBackStateButton: FC<FSMBackStateButtonPropsType> = ({ }) => {
  const { player } = useFSMContext();
  const { fsmStateId, isMentor } = useFSMStateContext();
  const { data: inwardEdges = [] } = useGetFSMStateInwardEdgesQuery({ fsmStateId })
  const { transitBackward, result: { isLoading } } = useTransitionBackward({ player });
  const edges = isMentor
    ? inwardEdges
    : inwardEdges.filter((edge) => edge.is_visible);

  if (edges.length === 0) {
    return null;
  }

  const backEdge = edges[0];

  return (
    <Button
      disabled={!backEdge.is_back_enabled || isLoading}
      fullWidth
      variant="outlined"
      color="primary"
      onClick={transitBackward}
    >
      {'گام قبل'}
    </Button>
  );
}

export default FSMBackStateButton;