import React, { FC, useState } from 'react';
import { Card, CardContent, Grid, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type CardsGamePropsType = {

}

const CardsGame: FC<CardsGamePropsType> = ({ }) => {

  const [upperList] = useState([
    { id: 1, content: 'Card 1' },
    { id: 2, content: 'Card 2' },
    { id: 3, content: 'Card 3' },
    { id: 4, content: 'Card 4' },
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
      {/* Upper List of Cards */}
      <Typography variant="h6">Upper List</Typography>
      <Grid container spacing={2} direction="row">
        {upperList.map(card => (
          <Grid item key={card.id}>
            <Card onClick={() => handleCardClick(card)} style={{ cursor: 'pointer', width: '150px' }}>
              <CardContent>
                <Typography>{card.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Lower List of Cards */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Lower List</Typography>
      <Grid container spacing={2} direction="row">
        {lowerList.map((card, index) => (
          <Grid item key={index}>
            <Card style={{ width: '150px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardContent>
                <Typography>{card.content}</Typography>
              </CardContent>
              <IconButton onClick={() => handleRemoveCard(index)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CardsGame;
