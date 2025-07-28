import { IconButton } from '@mui/material';
import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type BackToProgramButtonPropsType = {};

const BackToProgramButton: FC<BackToProgramButtonPropsType> = ({ }) => {
  const { fsmId } = useFSMContext();
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