import {
  List,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import useChangeState from 'commons/hooks/fsm/useChangeState';
import { PlayerType } from 'commons/types/models';
import React, { FC, useEffect } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

type PropsType = {
  player: PlayerType;
  fsmId: number; // fsmId is temporarily. it should be deleted. the next states should be fetch by currentFSMStateId
  clickedButtonId?: string;
  onSuccess?: any;
}

const ChangeStateContent: FC<PropsType> = ({
  player,
  clickedButtonId,
  fsmId,
  onSuccess,
}) => {
  const t = useTranslate();
  // todo: get just states with stateIds (not all the fsm state! users should not get it)
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId });
  const { data: outwardEdges = [] } = useGetFSMStateOutwardEdgesQuery({ fsmStateId: player.current_state });
  const [changeState, result] = useChangeState();

  const nextStateOptionIds = outwardEdges.map(edge => edge.head)
  const nextStateOptions = fsmStates.filter(state => nextStateOptionIds.includes(state.id))

  useEffect(() => {
    if (result.isSuccess) {
      onSuccess?.();
    }
  }, [result])

  return (
    <Stack component={Paper} padding={1}>
      <Typography variant='h3'>{t('chooseNextState')}</Typography>
      <List>
        {nextStateOptions
          .slice()
          .sort((state1, state2) => state1.title < state2.title ? 1 : -1)
          .map(state => (
            <ListItemButton
              onClick={() => changeState({ destinationStateId: state.id, clickedButtonId: clickedButtonId })}
              key={state.id}
            >
              {state.title}
            </ListItemButton>
          ))}
      </List>
    </Stack>
  );
}

export default ChangeStateContent;
