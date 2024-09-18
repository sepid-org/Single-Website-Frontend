import { Button } from '@mui/material';
import React, { FC, Fragment, useContext, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate, useParams } from 'react-router-dom';

import { StatePageContext } from 'apps/website-display/pages/FSM';
import ChangeStateDialog from 'commons/components/organisms/dialogs/ChangeStateDialog';
import StatePasswordDialog from 'commons/components/organisms/dialogs/StatePasswordDialog';
import {
  useGoForwardMutation,
  useMentorMoveForwardMutation,
} from 'apps/website-display/redux/features/program/PlayerSlice';
import { EdgeType } from 'commons/types/models';
import { toast } from 'react-toastify';

type FSMNextStateButtonPropsType = {
  outwardEdges: EdgeType[]
  isEnd?: boolean;
}

const FSMNextStateButton: FC<FSMNextStateButtonPropsType> = ({
  outwardEdges = [],
  isEnd,
}) => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const { isMentor } = useContext(StatePageContext);
  const [goForward, goForwardResult] = useGoForwardMutation();
  const [mentorMoveForward, mentorMoveForwardResult] = useMentorMoveForwardMutation();

  const handleFinishingFSM = () => {
    // toast.success('شما با موفقیت کارگاه را به پایان رساندید🎉')
    navigate(`/program/${programSlug}/`)
  }

  if (isEnd) {
    return (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleFinishingFSM}>
        {'پایان کارگاه'}
      </Button>
    )
  }

  const edges = isMentor
    ? outwardEdges
    : outwardEdges.filter((edge) => edge.is_visible);
  // const edges = outwardEdges;


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
    if (edges.length === 0) {
      navigate('/programs/');
    }
    if (edges.length === 1) {
      changeState(edges[0]);
    } else {
      setOpenChangeStateDialog(true);
    }
  };

  if (outwardEdges.length === 0) {
    return (null)
  }

  return (
    <Fragment>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={edges.length === 0 || goForwardResult?.isLoading || mentorMoveForwardResult?.isLoading}
        onClick={handleClick}>
        {edges.length === 0
          ? 'جابجایی با همیار'
          : t('next')}
      </Button>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        edges={edges}
        changeState={changeState}
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