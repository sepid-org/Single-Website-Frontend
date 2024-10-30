import React, { useState, useEffect, useRef, FC, Fragment } from 'react';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';
import { Box } from '@mui/material';
import Appbar from 'commons/components/organisms/Appbar';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';
import { ComplementaryObjectType } from 'commons/types/models';

export type BoardFSMStatePropsType = {
  fsmStateId: string;
  complementaryObjects?: ComplementaryObjectType[];
};

const BoardFSMState: FC<BoardFSMStatePropsType> = ({
  fsmStateId,
  complementaryObjects = [],
}) => {
  const { isMentor } = useFSMStateContext()
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

  return (
    <Fragment>
      {fsmState?.show_appbar && (
        <Box ref={appbarRef}>
          <Appbar mode={isMentor ? 'MENTOR_FSM' : 'FSM'} position='relative' />
        </Box>
      )}
      <PapersBoardScene
        complementaryObjects={complementaryObjects}
        parentHeight={containerHeight}
        paperIds={fsmState?.papers}
      />
    </Fragment>
  );
};

export default BoardFSMState;
