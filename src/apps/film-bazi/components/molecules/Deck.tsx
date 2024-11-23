import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';
import DeckCard from '../organisms/cards/DeckCard';


type DeckPropsType = {
  cards: CardType[];
  onCardClick?: any;
  onRemoveCard?: any;
}

const Deck: FC<DeckPropsType> = ({
  cards,
  onCardClick,
  onRemoveCard,
}) => {

  return (
    <Stack
      spacing={2}
      direction={'row'}
      overflow={'auto'}
      sx={{
        width: '100%',
        paddingBottom: 2,
        borderRadius: '8px',
        '::-webkit-scrollbar': {
          height: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#b0bec5',
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#90a4ae',
        },
      }}
    >
      {cards.map((card, index) => (
        <Box key={index} sx={{ flex: '0 0 auto' }}>
          <DeckCard
            index={index}
            card={card}
            onCardClick={onCardClick}
            onRemoveCard={onRemoveCard}
          />
        </Box>
      ))}
      {cards.length === 0 &&
        <Typography variant='h2'>
          {'کارتی وجود ندارد'}
        </Typography>
      }
    </Stack>
  );
};

export default Deck;
