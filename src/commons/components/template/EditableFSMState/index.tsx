import React, { FC } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import EditableNormalState from './EditableNormalState';
import EditableBoardState from './EditableBoardState';

type EditableFSMStatePropsType = {
  fsmStateId: string;
}

const EditableFSMState: FC<EditableFSMStatePropsType> = ({
  fsmStateId,
}) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });

  if (fsmState?.template === 'normal') {
    return <EditableNormalState fsmStateId={fsmStateId} />
  }
  if (fsmState?.template === 'board') {
    return <EditableBoardState fsmStateId={fsmStateId} />
  }

}

export default EditableFSMState;
