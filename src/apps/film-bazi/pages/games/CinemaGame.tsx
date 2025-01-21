import React, { FC, Fragment } from 'react';
import useCinemaGameLogic from '../../hooks/useCinemaGameLogic';
import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { FSMStateProvider } from 'commons/hooks/useFSMStateContext';
import FSMState from 'apps/fsm/template/FSMState';
import { FSMProvider } from 'commons/hooks/useFSMContext';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const [openLoading, setOpenLoading] = React.useState(false);
  const { complementaryObjects } = useCinemaGameLogic({
    openLoading,
    setOpenLoading,
  });
  const handleClose = () => {
    setOpenLoading(false);
  };
  const handleOpen = () => {
    setOpenLoading(true);
  };

  const fsmId = process.env.NODE_ENV === 'development' ? 1 : 191;
  const fsmStateId = process.env.NODE_ENV === 'development' ? '102' : '5743';

  return (
    <Fragment>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <FSMProvider fsmId={fsmId}>
        <FSMStateProvider
          fsmStateId={fsmStateId}
          complementaryObjects={complementaryObjects}
        >
          <FSMState fsmStateId={fsmStateId} />
        </FSMStateProvider>
      </FSMProvider>
    </Fragment>
  );
};

export default CinemaGame;