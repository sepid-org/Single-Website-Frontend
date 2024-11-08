import { Button } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import StatePasswordDialog from 'commons/components/organisms/dialogs/StatePasswordDialog';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import useChangeState from 'commons/hooks/fsm/useChangeState';

type FSMNextStateButtonPropsType = {}

const FSMNextStateButton: FC<FSMNextStateButtonPropsType> = ({ }) => {
  const { fsmStateId, isMentor } = useFSMStateContext();
  const t = useTranslate();
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [changeState, changeStateResult] = useChangeState();
  const { data: outwardEdges = [] } = useGetFSMStateOutwardEdgesQuery({ fsmStateId })

  const edges = isMentor
    ? outwardEdges
    : outwardEdges.filter((edge) => edge.is_visible);

  const handleChangeState = (edge) => {
    if (edge.has_transition_lock) {
      setSelectedEdge(edge);
    } else {
      changeState({
        destinationStateId: edge.head,
      });
    }
  };

  const handleClick = () => {
    if (edges.length === 1) {
      handleChangeState(edges[0]);
    } else {
      setOpenChangeStateDialog(true);
    }
  };

  if (edges.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={changeStateResult.isLoading}
        onClick={handleClick}>
        {edges.length === 0
          ? 'جابجایی با همیار'
          : t('next')}
      </Button>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        stateIds={outwardEdges.map(edge => edge.head)}
      />
      <StatePasswordDialog
        open={!!selectedEdge}
        handleClose={() => setSelectedEdge(null)}
        onSubmit={(password) =>
          changeState({
            destinationStateId: selectedEdge.head,
            // todo: handle password:
            // password,
          })
        }
      />
    </Fragment>
  );
}

export default FSMNextStateButton;