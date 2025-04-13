import { IconButton, Skeleton } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type ProgramLogoPropsType = {
  size?: 'small' | 'normal' | 'large';
  destination?: string;
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

const ProgramLogo: FC<ProgramLogoPropsType> = ({ size = 'small', destination: inputDestination }) => {
  const { programSlug } = useParams();
  const { data: program, isSuccess } = useGetProgramQuery({ programSlug: programSlug });
  const logoSize = sizes[size];
  const destination = inputDestination || `/program/${programSlug}/`;

  if (!isSuccess) {
    return <Skeleton variant="circular" width={logoSize.width} height={logoSize.height} />
  }

  return (
    <IconButton sx={{ padding: 0, paddingX: 1, userSelect: 'none' }} disableRipple component={Link} to={destination}>
      <img alt="website-logo" unselectable="on" width={logoSize.width} height={logoSize.height} src={program.cover_image} style={{ maxWidth: logoSize.maxWidth, maxHeight: logoSize.maxHeight }} />
    </IconButton>
  );
}

export default ProgramLogo;