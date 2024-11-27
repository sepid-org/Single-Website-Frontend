import React, { FC } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CardType } from 'apps/film-bazi/types';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from 'apps/film-bazi/constants/dndTypes';

type DeckCardPropsType = {
  index: number;
  card: CardType;
  onCardClick?: any;
  onRemoveCard?: any;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isDraggable: boolean;
}

interface DragItem {
  index: number;
}

const DeckCard: FC<DeckCardPropsType> = ({
  index,
  card,
  onCardClick,
  onRemoveCard,
  moveCard,
  isDraggable,
}) => {

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [isDraggable]);

  const [, dropRef] = useDrop<DragItem>(() => ({
    accept: 'CARD',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));


  return (
    <Card
      ref={(node) => isDraggable ? dragRef(dropRef(node)) : null}
      onClick={() => onCardClick ? onCardClick(card, index) : () => { }}
      sx={{
        borderRadius: 0,
        cursor: 'pointer',
        width: 150,
        height: '100%',
        display: 'flex',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        transform: (isDraggable && isDragging) ? 'scale(1.05)' : 'scale(1)',
        position: "relative",
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      {onRemoveCard && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            if (onRemoveCard) onRemoveCard(card, index);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <CardMedia
        component="img"
        image={card.image}
        alt="card-image"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Card>
  );
};

export default DeckCard;

function moveCard(index: number, index1: number) {
  throw new Error('Function not implemented.');
}
