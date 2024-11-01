import { Button, Typography } from '@mui/material';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type BackToProgramButtonPropsType = {};

const BackToProgramButton: FC<BackToProgramButtonPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const navigate = useNavigate();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const programSlug = fsm?.program_slug;

  if (!programSlug) {
    return null;
  }

  const handleOnClick = () => {
    navigate(`/program/${programSlug}/`);
  };

  return (
    <Button
      variant={'text'}
      onClick={handleOnClick}>
      <Typography fontSize={14} fontWeight={400}>
        {'بازگشت به دوره'}
      </Typography>
    </Button>
  );
}

export default BackToProgramButton;