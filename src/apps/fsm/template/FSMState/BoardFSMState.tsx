import React, { FC } from 'react';
import Board from 'commons/template/Board';
import useFSMState from 'apps/fsm/hooks/useFSMState';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import useWindowDimensions from 'commons/hooks/useWindowDimensions';


export type BoardFSMStatePropsType = {
  fsmStateId: string;
  mode: 'fit-height' | 'fit-width';
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({ fsmStateId, mode }) => {
  const { fsmId } = useFSMContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId, 10));
  const { data: fsm } = useGetFSMQuery({ fsmId });

  // Use custom hook for responsive viewport
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions();

  // If data isn't ready yet, render nothing
  if (!fsm || !fsmState || !viewportWidth || !viewportHeight) {
    return null;
  }

  return (
    <Board
      paperIds={fsmState.papers}
      mode={mode}
      defaultSceneWidth={fsm.scene.width}
      defaultSceneHeight={fsm.scene.height}
      viewportHeight={viewportHeight}
      viewportWidth={viewportWidth}
    />
  );
};

export default BoardFSMState;