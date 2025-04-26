import React, { Fragment, useState } from 'react';
import { Card, CardMedia, Typography, Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { FilmType } from '../../types';
import DiscountDialog from './DiscountCodeDialog';
import { Golden, Orange, Yellow } from 'apps/film-bazi/constants/colors';

// Avoid forwarding custom prop to DOM
const HoverCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isFinished',
})<{ isFinished: boolean }>(({ isFinished }) => ({
  borderRadius: '24px !important',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  aspectRatio: '2 / 3',
  cursor: isFinished ? 'default' : 'pointer',
}));

const HoverContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFinished',
})<{ isFinished: boolean }>(({ theme, isFinished }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  background: isFinished
    ? 'rgba(0, 0, 0, 0.6)'
    : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, #000000 96%)',
  color: 'white',
  padding: theme.spacing(2),
  opacity: isFinished ? 1 : 0,
  transition: 'opacity 0.3s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const FinishedOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledButton = styled(Button)(() => ({
  width: '200px',
  height: '76px',
  padding: '0',
  borderImageSlice: 1,
  borderImageSource: `linear-gradient(180deg, ${Golden} 0%, ${Orange} 100%)`,
  overflow: 'hidden',
  position: 'absolute',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '12px',
    padding: '1px',
    background: `linear-gradient(180deg, ${Golden} 0%, ${Orange} 100%)`,
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
  },
}));

const ButtonContent = styled(Box)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '36px',
  textAlign: 'center',
  color: Yellow,
}));

const FilmCard: React.FC<{ film: FilmType }> = ({ film }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!film) return null;

  const isFinished = film.status === 'finished';

  const handleOpenDialog = () => {
    if (!isFinished) setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Fragment>
      <HoverCard
        isFinished={isFinished}
        onMouseEnter={() => !isFinished && setIsCardHovered(true)}
        onMouseLeave={() => !isFinished && setIsCardHovered(false)}
      >
        <CardMedia
          component="img"
          image={film.image}
          alt={film.name}
          sx={{ height: '100%', objectFit: 'cover' }}
        />

        {isFinished ? (
          <FinishedOverlay>
            <Typography variant="h5" color="white" fontWeight={700}>
              به پایان رسیده
            </Typography>
          </FinishedOverlay>
        ) : (
          <HoverContent
            isFinished={isFinished}
            sx={{ opacity: isCardHovered || isDialogOpen ? 1 : 0 }}
          >
            <Stack sx={{ padding: 2, width: '100%', position: 'absolute', bottom: 0 }}>
              <Typography
                variant="h5"
                gutterBottom
                color={'#26B7B4'}
                fontWeight={700}
                fontSize={20}
              >
                {film.name}
              </Typography>
              <Typography variant="body2" gutterBottom color={Yellow} fontSize={14}>
                {`کارگردان: ${film.director.first_name} ${film.director.last_name}`}
              </Typography>
              <Typography variant="caption">
                {film.description}
              </Typography>
            </Stack>
            <StyledButton onClick={handleOpenDialog}>
              <ButtonContent>دریافت کد تخفیف</ButtonContent>
            </StyledButton>
          </HoverContent>
        )}
      </HoverCard>
      <DiscountDialog open={isDialogOpen} onClose={handleCloseDialog} film={film} />
    </Fragment>
  );
};

export default FilmCard;