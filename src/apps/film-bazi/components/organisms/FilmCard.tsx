import React, { Fragment, useState } from 'react';
import { Card, CardMedia, Typography, Box, Button, Stack, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import { FilmType } from '../../types';
import DiscountDialog from './DiscountCodeDialog';
import { Golden, Orange, Yellow } from 'apps/film-bazi/constants/colors';

const HoverCard = styled(Card)(() => ({
  borderRadius: '24px !important',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  aspectRatio: '2 / 3', // Adjust this ratio to match your typical card aspect ratio
}));

const HoverContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, #000000 96%)',
  color: 'white',
  padding: theme.spacing(2),
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
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
  fontFamily: 'IRANSansX, iranyekan',
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '36px',
  textAlign: 'center',
  color: Yellow,
}));

const FilmCard: React.FC<{ film: FilmType | null }> = ({ film }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (!film) {
    return (
      <HoverCard>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{
            borderRadius: '24px',
            transform: 'scale(1, 1)', // This ensures the Skeleton respects the HoverCard's dimensions
          }}
        />
      </HoverCard>
    );
  }

  return (
    <Fragment>
      <HoverCard
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <CardMedia
          component="img"
          image={film.image}
          alt={film.name}
          sx={{
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <HoverContent className="hoverContent" sx={{ opacity: isCardHovered || isDialogOpen ? 1 : 0 }}>
          <Stack sx={{
            padding: 2,
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}>
            <Typography variant="h5" gutterBottom color={'#26B7B4'} fontWeight={700} fontSize={20}>
              {film.name}
            </Typography>
            <Typography variant="body2" gutterBottom color={Yellow} fontSize={14} marginBottom={1}>
              {`کارگردان: ${film.director.first_name} ${film.director.last_name}`}
            </Typography>
            <Typography variant="body2">
              {film.description}
            </Typography>
          </Stack>
          <StyledButton onClick={handleOpenDialog}>
            <ButtonContent>
              {'دریافت کد تخفیف'}
            </ButtonContent>
          </StyledButton>
        </HoverContent>
      </HoverCard>
      <DiscountDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        film={film}
      />
    </Fragment>
  );
};

export default FilmCard;