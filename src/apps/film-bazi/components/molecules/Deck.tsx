import React, { FC, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';
import DeckCard from '../organisms/cards/DeckCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

type DeckPropsType = {
  cards: CardType[];
  setCards?: any;
  onCardClick?: any;
  onRemoveCard?: any;
};

const Deck: FC<DeckPropsType> = ({
  cards,
  setCards,
  onCardClick,
  onRemoveCard,
}) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;

  useEffect(() => {
    const preventContextMenu = (e: MouseEvent | TouchEvent) => e.preventDefault();

    if (isMobile) {
      document.addEventListener('contextmenu', preventContextMenu);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('contextmenu', preventContextMenu);
      }
    };
  }, [isMobile]);

  const moveCard = (dragId: number, dropId: number) => {
    setCards((prevCards) => {
      // Create a shallow copy of the previous state
      const updatedCards = [...prevCards];
  
      // Find the indices of the dragged and dropped cards
      const dragIndex = updatedCards.findIndex(card => card.id === dragId);
      const dropIndex = updatedCards.findIndex(card => card.id === dropId);
  
      // Ensure both cards are found
      if (dragIndex === -1 || dropIndex === -1) return updatedCards;
  
      // Swap the two cards in the array
      [updatedCards[dragIndex], updatedCards[dropIndex]] = [updatedCards[dropIndex], updatedCards[dragIndex]];
  
      return updatedCards;
    });
  };
  
  

  return (
    <Stack
      spacing={2}
      direction={'row'}
      overflow={'auto'}
      sx={{
        height: 230,
        width: '100%',
        paddingBottom: 1,
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
      <DndProvider
        backend={dndBackend}
        options={{
          enableMouseEvents: true,
          delayTouchStart: isMobile ? 500 : 0,
          ignoreContextMenu: true,
        }}
      >
        {cards.map((card, index) => (
          <Box key={index} sx={{ flex: '0 0 auto' }}>
            <DeckCard
              index={index}
              card={card}
              onCardClick={onCardClick}
              onRemoveCard={onRemoveCard}
              moveCard={moveCard}
              isDraggable={onRemoveCard ? true : false}
            />
          </Box>
        ))}
      </DndProvider>
      {cards.length === 0 && (
        <Typography>{'کارتی وجود ندارد'}</Typography>
      )}
    </Stack>
  );
};

export default Deck;
