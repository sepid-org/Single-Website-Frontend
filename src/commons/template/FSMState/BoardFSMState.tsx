import React, { useState, useEffect, useRef, FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { Box } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import BoardPaper from '../Paper/BoardPaper';
import BoardFrame from '../Paper/BoardFrame';

export type BoardFSMStatePropsType = {
  isMentor: boolean;
  stateId: string;
  playerId: string;
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({ isMentor, stateId, playerId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId: stateId }, { skip: !Boolean(stateId) });
  const appbarRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      let calculatedHeight = window.innerHeight;
      if (appbarRef.current) {
        calculatedHeight -= appbarRef.current.offsetHeight;
      }
      setContainerHeight(calculatedHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [fsmState]);

  return (
    <Box position={'relative'}>
      {fsmState?.show_appbar && (
        <Box ref={appbarRef}>
          <Appbar mode={isMentor ? 'MENTOR_FSM' : 'FSM'} position='relative' />
        </Box>
      )}
      {containerHeight > 0 &&
        <BoardFrame containerHeight={containerHeight}>
          {fsmState.papers.map(paperId => (
            <BoardPaper
              fsmStateId={stateId}
              paperId={paperId}
            />
          ))}
        </BoardFrame>
      }
    </Box>
  );
};

export default BoardFSMState;
