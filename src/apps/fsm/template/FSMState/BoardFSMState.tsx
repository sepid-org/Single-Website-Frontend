import React, { useState, useEffect, FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { Box, Paper, Typography } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Board from 'commons/template/Board';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';

export type BoardFSMStatePropsType = {
  fsmStateId: string;
  boardWidth?: number;
  boardHeight?: number;
  mode?: 'fit-height' | 'fit-width';
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({
  fsmStateId,
  boardWidth,
  boardHeight,
  mode,
}) => {
  const { fsmId } = useFSMContext();
  const { isMentor } = useFSMStateContext();
  const { data: fsmState, error: fsmStateError } = useGetFSMStateQuery(
    { fsmStateId },
    { skip: !fsmStateId }
  );
  const { data: fsm, error: fsmError } = useGetFSMQuery({ fsmId });
  const [appbarHeight, setAppbarHeight] = useState(0);
  const handleAppbarRef = (node: HTMLDivElement | null) => {
    if (node) {
      setAppbarHeight(node.offsetHeight);
    }
  };

  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - appbarHeight;
      const calculatedWidth = window.innerWidth;
      setContainerHeight(calculatedHeight);
      setContainerWidth(calculatedWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [appbarHeight]);

  if (fsmStateError || fsmError) {
    throw new Error("Error loading FSM data");
  }

  if (!fsmState || !fsm || containerHeight === 0 || containerWidth === 0) {
    return;
  }

  return (
    <Box position={'relative'}>
      {fsmState.show_appbar && (
        <Box ref={handleAppbarRef}>
          <Appbar mode={isMentor ? 'MENTOR_FSM' : 'FSM'} position="relative" />
        </Box>
      )}
      <Board
        mode={mode}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        parentHeight={containerHeight}
        parentWidth={containerWidth}
        paperIds={fsmState.papers}
      />
      {isMentor && (
        <Box position="absolute" top={10} left={10} component={Paper} paddingX={1}>
          <CollapsibleTitle title="راهنمای همیاران">
            <Fragment>
              <Typography>
                {`کارگاه ${fsm.id}: ${fsm.name}`}
              </Typography>
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