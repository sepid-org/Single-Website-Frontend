import React, { Fragment, useState } from 'react';
import { Card, CardMedia, Typography, Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/system';
import { GameType } from '../../types';
import { Golden, Orange, Yellow } from 'apps/film-bazi/constants/colors';
import { useNavigate } from 'react-router-dom';

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

type GameCardPropsType = {
  game: GameType;
}

const GameCard: React.FC<GameCardPropsType> = ({ game }) => {
  const navigate = useNavigate();
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleOpenDialog = () => {
    navigate(game.link);
  };

  return (
    <Fragment>
      <HoverCard
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        <CardMedia
          component="img"
          image={game.image}
          alt={game.title}
          sx={{
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <HoverContent className="hoverContent" sx={{ opacity: isCardHovered ? 1 : 0 }}>
          <Stack sx={{
            padding: 2,
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}>
            <Typography variant="h5" gutterBottom color={'#26B7B4'} fontWeight={700} fontSize={20}>
              {game.title}
            </Typography>
            <Typography variant="body2">
              {game.description}
            </Typography>
          </Stack>
          <StyledButton onClick={handleOpenDialog}>
            <ButtonContent>
              {'شروع بازی'}
            </ButtonContent>
          </StyledButton>
        </HoverContent>
      </HoverCard>
    </Fragment>
  );
};

export default GameCard;