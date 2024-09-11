import React, { FC } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import EditableNormalState from './EditableNormalState';
import EditableBoardState from './EditableBoardState';
import { Box } from '@mui/material';

type EditableFSMStatePropsType = {
  fsmStateId: string;
}

const EditableFSMState: FC<EditableFSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

  if (fsmState?.template === 'normal') {
    return (
      <Box padding={2} width={600}>
        <EditableNormalState fsmStateId={fsmStateId} />
      </Box>
    )
  }
  if (fsmState?.template === 'board') {
    return <EditableBoardState fsmStateId={fsmStateId} />
  }
}

export default EditableFSMState;
