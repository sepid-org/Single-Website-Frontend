import React, { FC, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import Deck from '../components/molecules/Deck';
import { useAttemptToAnswerMutation, useGetCardsQuery } from '../redux/slices/CardsGame';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from '../components/organisms/CustomDialogContent';
import ScoreAnnouncement from '../components/atoms/icons/ScoreAnnouncement';
import { toPersianNumber } from 'commons/utils/translateNumber';

type CardsGamePropsType = {}

const CardsGame: FC<CardsGamePropsType> = ({ }) => {
  const { data: initialCards = [] } = useGetCardsQuery();
  const [attempt, result] = useAttemptToAnswerMutation();
  const [cards, setUpperList] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (initialCards) {
      setUpperList(initialCards);
    }
  }, [initialCards])

  const handleCardClick = (card) => {
    setSelectedCards([...selectedCards, card]);
  };

  const handleRemoveCard = (index) => {
    const updatedList = [...selectedCards];
    updatedList.splice(index, 1);
    setSelectedCards(updatedList);
  };

  useEffect(() => {
    if (result.isSuccess) {
      if (result.data.message) {
        dialogService.open({
          component:
            <CustomDialogContent
              title={result.data.message}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      } else if (result.data.is_successful) {
        dialogService.open({
          component:
            <CustomDialogContent
              image={<ScoreAnnouncement />}
              title={`آفرین! داستان جدیدی را کشف کردی. ${toPersianNumber(result.data.story.reward)} سکه بهت اضافه شد. `}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      } else {
        dialogService.open({
          component:
            <CustomDialogContent
              title={'داستانی با این ترتیب وجود ندارد'}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      }

    }
  }, [result])

  const handleSubmit = () => {
    attempt({
      answer: selectedCards.map(selectedCard => selectedCard.id)
    })
  }

  return (
    <Stack padding={2} alignItems={'start'} spacing={2}>
      <Typography variant="h6">{'کارت‌های داستان:'}</Typography>
      <Deck cards={cards} onCardClick={handleCardClick} />

      <Typography variant="h6" sx={{ marginTop: 2 }}>{'روایت شما:'}</Typography>
      <Deck cards={selectedCards} onRemoveCard={handleRemoveCard} />

      <Button variant='contained' onClick={handleSubmit}>
        {'ارسال پاسخ'}
      </Button>
    </Stack>
  );
};

export default CardsGame;
