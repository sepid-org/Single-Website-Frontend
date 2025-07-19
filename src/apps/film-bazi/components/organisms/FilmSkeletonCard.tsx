import React from 'react';
import { Card, Skeleton } from '@mui/material';
import { styled } from '@mui/system';

const HoverCard = styled(Card)(() => ({
  borderRadius: '24px !important',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  aspectRatio: '2 / 3', // Adjust this ratio to match your typical card aspect ratio
}));

const FilmSkeletonCard = () => {

  return (
    <HoverCard>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        animation="wave"
        sx={{
          borderRadius: '24px',
          transform: 'scale(1, 1)',
        }}
      />
    </HoverCard>
  );
};

export default FilmSkeletonCard;