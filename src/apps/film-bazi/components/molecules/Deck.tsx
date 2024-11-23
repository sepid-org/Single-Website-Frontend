import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';
import DeckCard from '../organisms/cards/DeckCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


type DeckPropsType = {
  cards: CardType[];
  setCards?: any;
  onCardClick?: any;
  onRemoveCard?: any;
}

const Deck: FC<DeckPropsType> = ({
  cards,
  setCards,
  onCardClick,
  onRemoveCard,
}) => {

  const moveCard = (dragIndex, dropIndex) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [draggedCard] = updatedCards.splice(dragIndex, 1); // Remove the dragged item

      // If dropIndex > dragIndex, insert at dropIndex and shift others left
      if (dropIndex > dragIndex) {
        updatedCards.splice(dropIndex, 0, draggedCard); // Insert dragged item at the new position
      }
      // If dropIndex < dragIndex, insert at dropIndex and shift others right
      else {
        updatedCards.splice(dropIndex, 0, draggedCard);
      }

      return updatedCards;
    });
  };

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
      <DndProvider backend={HTML5Backend}>
        {cards.map((card, index) => (
          <Box key={index} sx={{ flex: '0 0 auto' }}>
            <DeckCard
              index={index}
              card={card}
              onCardClick={onCardClick}
              onRemoveCard={onRemoveCard}
              moveCard={moveCard}
            />
          </Box>
        ))}
      </DndProvider>
      {cards.length === 0 &&
        <Typography variant='h2'>
          {'کارتی وجود ندارد'}
        </Typography>
      }
    </Stack>
  );
};

export default Deck;
