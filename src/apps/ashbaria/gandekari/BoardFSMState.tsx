import React, { useState, useEffect, useRef, FC } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { Box } from '@mui/material';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';
import useAshbariaCustomWidgets from '../hooks/useAshbariaCustomWidgets';

export type BoardFSMStatePropsType = {
  fsmStateId: string;
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId }, { skip: !Boolean(fsmStateId) });
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

  const { complementaryObjects } = useAshbariaCustomWidgets();

  return (
    <Box position={'relative'}>
      <PapersBoardScene
        complementaryObjects={complementaryObjects}
        sceneHeight={containerHeight}
        paperIds={fsmState?.papers}
      />
    </Box>
  );
};

export default BoardFSMState;
