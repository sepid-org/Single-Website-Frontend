import React, { FC, Fragment } from 'react';
import useCinemaGameLogic from '../hooks/useCinemaGameLogic';
import { Backdrop, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomDialogPaper from '../components/atoms/CustomDialogPaper';
import BoardPaper from 'commons/template/Paper/BoardPaper';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = process.env.NODE_ENV === 'production' ? '6195' : '11';
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


  return (
    <Fragment>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={openLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <BoardPaper
        complementaryObjects={complementaryObjects}
        paperIds={[paperId]}
      />
    </Fragment>
  );
};

export default CinemaGame;