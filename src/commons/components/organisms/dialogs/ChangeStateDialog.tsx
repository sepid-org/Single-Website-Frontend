import {
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
} from '@mui/material';
import { useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useChangeState from 'commons/hooks/fsm/useChangeState';
import React, { FC, useEffect } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

type ChangeStateDialogPropsType = {
  open: boolean;
  handleClose: any;
  stateIds: string[];
  widgetId?: string;
}

const ChangeStateDialog: FC<ChangeStateDialogPropsType> = ({
  open,
  handleClose,
  stateIds,
  widgetId,
}) => {
  const t = useTranslate();
  const fsmId = parseInt(useParams().fsmId);
  // todo: get just states with stateIds (not all the fsm state! users should not get it)
  const { data: fsmStates = [] } = useGetFSMStatesQuery({ fsmId }, { skip: !Boolean(open) });
  const [changeState, result] = useChangeState();
  const states = fsmStates.filter(state => stateIds.includes(state.id))

  useEffect(() => {
    if (result.isSuccess) {
      handleClose();
    }
  }, [result.isLoading])

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle variant='h3'>{t('chooseNextState')}</DialogTitle>
      <List>
        {states
          .slice()
          .sort((state1, state2) => state1.title < state2.title ? 1 : -1)
          .map(state => (
            <ListItemButton
              onClick={() => changeState({ destinationStateId: state.id, clickedButtonId: widgetId })}
              key={state.id}
            >
              {state.title}
            </ListItemButton>
          ))}
      </List>
    </Dialog>
  );
}

export default ChangeStateDialog;
