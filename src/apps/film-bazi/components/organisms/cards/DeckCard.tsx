import React, { FC, useRef } from 'react';
import { Card, CardMedia, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CardType } from 'apps/film-bazi/types';
import { useDrag, useDrop } from 'react-dnd';

type DeckCardPropsType = {
  index: number;
  card: CardType;
  onCardClick?: (card: CardType, index: number) => void;
  onRemoveCard?: (card: CardType, index: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  isDraggable: boolean;
}

interface DragItem {
  id: number;
}

const DeckCard: FC<DeckCardPropsType> = ({
  index,
  card,
  onCardClick,
  onRemoveCard,
  moveCard,
  isDraggable,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: { id: card.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [card]);

  const [, dropRef] = useDrop<DragItem>(() => ({
    accept: 'CARD',
    hover: (draggedItem) => {
      if (draggedItem.id !== card.id) {
        moveCard(draggedItem.id, card.id);
        //draggedItem.index = index;
      }
    },
  }), [card]);

  return (
    <Card
      ref={(node) => {
        cardRef.current = node;
        return isDraggable ? dragRef(dropRef(node)) : null;
      }}
      onClick={() => onCardClick ? onCardClick(card, index) : () => { }}
      sx={{
        borderRadius: 0,
        cursor: 'pointer',
        width: 150,
        display: 'flex',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        transform: (isDraggable && isDragging) ? 'scale(1.05)' : 'scale(1)',
        position: "relative",
        userSelect: 'none',
        '-webkit-user-select': 'none',
        '-webkit-touch-callout': 'none',
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
            zIndex: 10,
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
          pointerEvents: 'none',
        }}
      />
    </Card>
  );
};

export default DeckCard;