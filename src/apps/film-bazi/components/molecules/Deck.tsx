import React, { FC } from 'react';
import { Box, Stack } from '@mui/material';
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
        paddingY: 2,
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
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
      {cards.map((card) => (
        <Box key={card.id} sx={{ flex: '0 0 auto' }}>
          <DeckCard card={card} onCardClick={onCardClick} onRemoveCard={onRemoveCard} />
        </Box>
      ))}
    </Stack>
  );
};

export default Deck;
