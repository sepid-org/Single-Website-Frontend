import React, { useState, useEffect, FC, Fragment } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import Board from 'commons/template/Board';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';
import useFSMState from 'apps/fsm/hooks/useFSMState';

export type BoardFSMStatePropsType = {
  fsmStateId: string;
  mode: 'fit-height' | 'fit-width';
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({
  fsmStateId,
  mode,
}) => {
  const { isMentor } = useFSMStateContext();
  const { fsmState } = useFSMState(parseInt(fsmStateId));
  // todo: should get scene width and height from fsmState

  const [appbarHeight, setAppbarHeight] = useState(0);
  const handleAppbarRef = (node: HTMLDivElement | null) => {
    if (node) {
      setAppbarHeight(node.offsetHeight);
    }
  };

  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const calculatedHeight = window.innerHeight - appbarHeight;
      const calculatedWidth = window.innerWidth;
      setViewportHeight(calculatedHeight);
      setViewportWidth(calculatedWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [appbarHeight]);

  if (!fsmState || viewportHeight === 0 || viewportWidth === 0) {
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
        defaultSceneWidth={fsmState.position.width}
        defaultSceneHeight={fsmState.position.height}
        viewportHeight={viewportHeight}
        viewportWidth={viewportWidth}
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