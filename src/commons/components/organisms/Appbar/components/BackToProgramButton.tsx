import { IconButton } from '@mui/material';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

type BackToProgramButtonPropsType = {};

const BackToProgramButton: FC<BackToProgramButtonPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const navigate = useNavigate();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const programSlug = fsm?.program_slug;

  const handleOnClick = () => {
    navigate(`/program/${programSlug}/`);
  };

  return (
    <IconButton onClick={handleOnClick}>
      <ExitToAppIcon color='primary' />
    </IconButton>
  );
}

export default BackToProgramButton;