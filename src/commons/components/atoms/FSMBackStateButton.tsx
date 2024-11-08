import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useGetFSMStateInwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import useTransitionBack from 'commons/hooks/fsm/useTransitionBack';

type FSMBackStateButtonPropsType = {}

const FSMBackStateButton: FC<FSMBackStateButtonPropsType> = ({ }) => {
  const { fsmStateId, player, isMentor } = useFSMStateContext();
  const { data: inwardEdges = [] } = useGetFSMStateInwardEdgesQuery({ fsmStateId })
  const [transitBack, { isLoading }] = useTransitionBack({ player });
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
      onClick={transitBack}>
      {'گام قبل'}
    </Button>
  );
}

export default FSMBackStateButton;