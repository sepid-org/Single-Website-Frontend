import { IconButton, Skeleton } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type ProgramLogoPropsType = {
  size?: 'small' | 'normal' | 'large';
}

const sizes = {
  small: {
    width: 50,
    height: 50,
    maxWidth: 200,
    maxHeight: 50,
  },
  normal: {
    width: 75,
    height: 75,
    maxWidth: 250,
    maxHeight: 75,
  },
  large: {
    width: 100,
    height: 100,
    maxWidth: 300,
    maxHeight: 100,
  },
}

const ProgramLogo: FC<ProgramLogoPropsType> = ({ size = 'small' }) => {
  const logoSize = sizes[size];
  const { programSlug } = useParams();
  const { data: program, isSuccess } = useGetProgramQuery({ programSlug: programSlug });

  if (!isSuccess) {
    return <Skeleton variant="circular" width={logoSize.width} height={logoSize.height} />
  }

  return (
    <IconButton sx={{ padding: 0, paddingX: 1, userSelect: 'none' }} disableRipple component={Link} to={`/program/${programSlug}/`}>
      <img alt="website-logo" unselectable="on" src={program.cover_page} style={{ maxWidth: logoSize.maxWidth, maxHeight: logoSize.maxHeight }} />
    </IconButton>
  );
}

export default ProgramLogo;