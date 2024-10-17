import { Button } from '@mui/material';
import React, { FC, Fragment, useContext, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import StatePasswordDialog from 'commons/components/organisms/dialogs/StatePasswordDialog';
import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
} from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import { useGetFSMStateOutwardEdgesQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';

type FSMNextStateButtonPropsType = {}

const FSMNextStateButton: FC<FSMNextStateButtonPropsType> = ({ }) => {
  const { fsmStateId, isMentor } = useFSMStateContext();
  const t = useTranslate();
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [goForward, { isLoading: isGoForwardLoading }] = useGoForwardMutation();
  const [mentorMoveForward, { isLoading: isMentorMoveForwardLoading }] = useMentorMoveForwardMutation();
  const { data: outwardEdges = [] } = useGetFSMStateOutwardEdgesQuery({ fsmStateId })

  const edges = isMentor
    ? outwardEdges
    : outwardEdges.filter((edge) => edge.is_visible);

  const changeState = (edge) => {
    if (isMentor) {
      mentorMoveForward({
        edgeId: edge.id,
      });
    } else {
      if (edge.has_transition_lock) {
        setSelectedEdge(edge);
      } else {
        goForward({
          edgeId: edge.id,
        });
      }
    }
  };

  const handleClick = () => {
    if (edges.length === 1) {
      changeState(edges[0]);
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
        disabled={isGoForwardLoading || isMentorMoveForwardLoading}
        onClick={handleClick}>
        {edges.length === 0
          ? 'جابجایی با همیار'
          : t('next')}
      </Button>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        edges={edges}
      />
      <StatePasswordDialog
        open={!!selectedEdge}
        handleClose={() => setSelectedEdge(null)}
        onSubmit={(password) =>
          goForward({
            edgeId: selectedEdge.id,
            password,
          })
        }
      />
    </Fragment>
  );
}

export default FSMNextStateButton;