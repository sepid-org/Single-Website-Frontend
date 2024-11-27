import React, { FC, useRef, useState } from 'react';
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
  const [isLongPress, setIsLongPress] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

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
      if (draggedItem.index !== index && !isLongPress) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  }));

  // Touch event handlers for mobile support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isDraggable) return;

    longPressTimerRef.current = setTimeout(() => {
      setIsLongPress(true);
      // Optional: Add visual feedback for long press
    }, 500); // 500ms long press threshold
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    if (isLongPress) {
      setIsLongPress(false);
    } else if (onCardClick) {
      onCardClick(card, index);
    }
  };

  const handleTouchMove = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    setIsLongPress(false);
  };

  return (
    <Card
      ref={(node) => {
        cardRef.current = node;
        return isDraggable ? dragRef(dropRef(node)) : null;
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={() => onCardClick ? onCardClick(card, index) : () => { }}
      sx={{
        borderRadius: 0,
        cursor: 'pointer',
        width: 150,
        display: 'flex',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        transform: (isDraggable && isDragging) || isLongPress ? 'scale(1.05)' : 'scale(1)',
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
        }}
      />
    </Card>
  );
};

export default DeckCard;