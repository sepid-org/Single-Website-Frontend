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
}

const DeckCard: FC<DeckCardPropsType> = ({
  index,
  card,
  onCardClick,
  onRemoveCard,
  moveCard,
}) => {

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: card.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);  // Run only on drop
      }
    },
  }));

  return (
    <Card
      ref={onRemoveCard ? (node) => {
        dragRef(node);
        dropRef(node);
      } : null}
      onClick={() => onCardClick ? onCardClick(card, index) : () => { }}
      sx={{
        borderRadius: 0,
        cursor: 'pointer',
        width: 150,
        height: '100%',
        display: 'flex',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        opacity: isDragging ? 0.5 : 1,
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
