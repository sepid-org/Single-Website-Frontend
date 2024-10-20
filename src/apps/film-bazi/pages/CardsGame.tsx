import React, { FC, useState } from 'react';
import { Typography } from '@mui/material';
import Deck from '../components/molecules/Deck';

type CardsGamePropsType = {

}

const CardsGame: FC<CardsGamePropsType> = ({ }) => {

  const [upperList] = useState([
    { id: "1", image: 'Card 1' },
    { id: "2", image: 'Card 2' },
    { id: "3", image: 'Card 3' },
    { id: "4", image: 'Card 4' },
    { id: "5", image: 'Card 5' },
    { id: "6", image: 'Card 6' },
    { id: "7", image: 'Card 7' },
    { id: "8", image: 'Card 8' },
    { id: "9", image: 'Card 9' },
    { id: "10", image: 'Card 10' },
    { id: "11", image: 'Card 11' },
    { id: "12", image: 'Card 12' },
    { id: "13", image: 'Card 13' },
    { id: "14", image: 'Card 14' },
    { id: "15", image: 'Card 15' },
    { id: "16", image: 'Card 16' },
  ]);

  const [lowerList, setLowerList] = useState([]);

  const handleCardClick = (card) => {
    setLowerList([...lowerList, card]);
  };

  const handleRemoveCard = (index) => {
    const updatedList = [...lowerList];
    updatedList.splice(index, 1);
    setLowerList(updatedList);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom>{'کارت‌های داستان'}</Typography>
      <Deck cards={upperList} onCardClick={handleCardClick} />

      <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>{'داستان شما'}</Typography>
      <Deck cards={lowerList} onRemoveCard={handleRemoveCard} />
    </div >
  );
};

export default CardsGame;
