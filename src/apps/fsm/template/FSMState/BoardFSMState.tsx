import React, { useState, useEffect, useRef, FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { Box, Paper, Typography } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';
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
  const { isMentor } = useFSMStateContext()
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });
  const { data: fsm } = useGetFSMQuery({ fsmId });
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
      <PapersBoardScene
        mode={mode}
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        parentHeight={containerHeight}
        paperIds={fsmState?.papers}
      />
      {isMentor &&
        <Box position={'absolute'} top={10} left={10} component={Paper} paddingX={1}>
          <CollapsibleTitle title='راهنمای همیاران'>
            <Fragment>
              <Typography>
                {`کارگاه ${fsm?.id}: ${fsm?.name}`}
              </Typography>
              <Typography>
                {`گام ${fsmState?.id}: ${fsmState?.title}`}
              </Typography>
            </Fragment>
          </CollapsibleTitle>
        </Box>
      }
    </Box>
  );
};

export default BoardFSMState;
