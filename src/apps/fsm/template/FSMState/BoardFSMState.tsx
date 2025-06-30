import React, { FC, Fragment } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Board from 'commons/template/Board';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';
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
  const { isMentor } = useFSMStateContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId, 10));
  const { data: fsm } = useGetFSMQuery({ fsmId });

  // Use custom hook for responsive viewport
  const { width: viewportWidth, height: viewportHeight } = useWindowDimensions();

  // If data isn't ready yet, render nothing
  if (!fsm || !fsmState || !viewportWidth || !viewportHeight) {
    return null;
  }

  return (
    <Box position="relative">
      <Board
        paperIds={fsmState.papers}
        mode={mode}
        defaultSceneWidth={fsm.scene.width}
        defaultSceneHeight={fsm.scene.height}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
      />

      {isMentor && (
        <Box
          position="absolute"
          top={10}
          left={10}
          component={Paper}
          paddingX={1}
        >
          <CollapsibleTitle title="راهنمای همیاران">
            <Fragment>
              <Typography>
                {`گام ${fsmState.id}: ${fsmState.title}`}
              </Typography>
            </Fragment>
          </CollapsibleTitle>
        </Box>
      )}
    </Box>
  );
};

export default BoardFSMState;