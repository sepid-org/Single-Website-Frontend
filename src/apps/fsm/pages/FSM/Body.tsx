import React, { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useGetCurrentUserPlayerQuery } from 'apps/fsm/redux/slices/fsm/PlayerSlice';
import FSMState from 'apps/fsm/template/FSMState';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { useGetProgramUserFSMsStatusQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FSMStateEditorDialog from 'apps/fsm/template/FSMStateEditorDialog';


const FSMBody: FC = () => {
  const fsmId = parseInt(useParams().fsmId || '', 10);
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const { data: player } = useGetCurrentUserPlayerQuery({ fsmId });
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug: fsm?.program_slug }, { skip: !Boolean(fsm?.program_slug) });
  const currentUserFSMStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const isMentor = currentUserFSMStatus?.is_user_mentor;

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [player]);

  if (!fsm) return null;

  return (
    <Fragment>
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider
          fsmStateId={player?.current_state}
          isMentor={isMentor}
        >
          <FSMState fsmStateId={player?.current_state} />
        </FSMStateProvider>
      </FSMProvider>

      {(isMentor && !dialogOpen) && (
        <Fab
          color="primary"
          aria-label="edit"
          onClick={() => setDialogOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: (theme) => theme.zIndex.tooltip,
          }}
        >
          <EditIcon />
        </Fab>
      )}

      <FSMStateEditorDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        fsmStateId={parseInt(player?.current_state)}
      />
    </Fragment>
  );
};

export default FSMBody;