import React, { FC, useState } from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';
import DeleteIcon from '@mui/icons-material/Delete';

type DeckCardPropsType = {
  card: CardType;
  onCardClick?: any;
  onRemoveCard?: any;
}

const DeckCard: FC<DeckCardPropsType> = ({
  card,
  onCardClick,
  onRemoveCard,
}) => {

  return (
    <Card
      onClick={() => onCardClick?.(card)}
      sx={{
        cursor: 'pointer',
        width: '150px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        <Typography>{card.image}</Typography>
      </CardContent>
      {onRemoveCard &&
        <IconButton onClick={() => onRemoveCard?.(card)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    </Card>
  );
};

export default DeckCard;
