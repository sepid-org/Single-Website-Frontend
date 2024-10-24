import React, { FC } from 'react';
import { Card, CardMedia } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';

type DeckCardPropsType = {
  index: number;
  card: CardType;
  onCardClick?: any;
  onRemoveCard?: any;
}

const DeckCard: FC<DeckCardPropsType> = ({
  index,
  card,
  onCardClick,
  onRemoveCard,
}) => {

  return (
    <Card
      onClick={() => onCardClick ? onCardClick(card) : onRemoveCard ? onRemoveCard(index) : null}
      sx={{
        borderRadius: 0,
        cursor: 'pointer',
        width: 150,
        height: '100%',
        display: 'flex',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
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
