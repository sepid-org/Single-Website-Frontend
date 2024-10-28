import React, { FC, Fragment } from 'react';
import useCinemaGameLogic from '../hooks/useCinemaGameLogic';
import { Backdrop, Stack } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CustomDialogPaper from '../components/atoms/CustomDialogPaper';
import PapersBoardScene from 'commons/template/Paper/PapersBoardScene';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = process.env.NODE_ENV === 'production' ? '6195' : '94';
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
      <PapersBoardScene
        complementaryObjects={complementaryObjects}
        paperIds={[paperId]}
      />
    </Fragment>
  );
};

export default CinemaGame;