import React, { useState, useEffect, FC, Fragment } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Board from 'commons/template/Board';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';
import useFSMState from 'apps/fsm/hooks/useFSMState';

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
  const { isMentor } = useFSMStateContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId));
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

  if (!fsmState || containerHeight === 0 || containerWidth === 0) {
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
        fsmStateId={fsmState.id}
        mode={mode}
        defaultSceneWidth={boardWidth}
        defaultSceneHeight={boardHeight}
        viewportHeight={containerHeight}
        viewportWidth={containerWidth}
      />
      {isMentor && (
        <Box position="absolute" top={10} left={10} component={Paper} paddingX={1}>
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