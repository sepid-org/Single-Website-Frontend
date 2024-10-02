import React, { FC, Fragment } from 'react';
import BoardPaper from 'commons/template/Paper/BoardPaper';
import useCinemaGameLogic from '../hooks/useCinemaGameLogic';
import { Backdrop, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomDialogPaper from '../components/atoms/CustomDialogPaper';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = process.env.NODE_ENV === 'production' ? '2800' : '11';
  const [openLoading, setOpenLoading] = React.useState(false);
  const { objectLogics } = useCinemaGameLogic({
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
        objectLogics={objectLogics}
        paperId={paperId}
      />
    </Fragment>
  );
};

export default CinemaGame;