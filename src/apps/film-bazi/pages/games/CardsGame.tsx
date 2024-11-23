import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import Deck from '../../components/molecules/Deck';
import { useAttemptToAnswerMutation, useGetCardsQuery } from '../../redux/slices/CardsGame';
import dialogService from 'commons/components/organisms/PortalDialog';
import CustomDialogContent from '../../../../commons/components/molecules/CustomDialogContent';
import ScoreAnnouncement from '../../components/atoms/icons/ScoreAnnouncement';
import { toPersianNumber } from 'commons/utils/translateNumber';
import MyScoresChip from '../../components/atoms/chips/MyScoresChip';
import useLocalNavigate from '../../hooks/useLocalNavigate';
import { MediaUrls } from 'apps/film-bazi/constants/mediaUrls';
import { useGetGameQuery } from 'apps/film-bazi/redux/slices/Game';
import GameHelpButton from 'apps/film-bazi/components/atoms/buttons/GameHelpButton';

type CardsGamePropsType = {}

const CardsGame: FC<CardsGamePropsType> = ({ }) => {
  const { data: gameData } = useGetGameQuery({ id: 2 });
  const localNavigate = useLocalNavigate();
  const { data: initialCards = [] } = useGetCardsQuery();
  const [attempt, result] = useAttemptToAnswerMutation();
  const [cards, setUpperList] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (initialCards) {
      setUpperList(initialCards);
    }
  }, [initialCards])

  const handleCardClick = (card, index) => {
    setSelectedCards([...selectedCards, card]);
    const updatedList = [...cards];
    updatedList.splice(index, 1);
    setUpperList(updatedList);
  };

  const handleRemoveCardFromSelectedCards = (card, index) => {
    const updatedList = [...selectedCards];
    updatedList.splice(index, 1);
    setSelectedCards(updatedList);
    const updatedUpperList = [...cards];
    updatedUpperList.push(card);
    setUpperList(updatedUpperList);
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
    <Box
      sx={{
        backgroundImage: `url(${MediaUrls.CARDS_GAME_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundPosition: `center calc(100% - 80%)`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: '100vh',
        minWidth: "100vw",
      }}
    >
      <Stack padding={2} alignItems={'start'} spacing={2}>
        <Stack width={'100%'} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Box width={200}>
            <MyScoresChip />
          </Box>

          <Stack spacing={2} direction={{ xs: 'column-reverse', sm: 'row' }}>
            <GameHelpButton helpPaperId={gameData?.help_paper_id} />

            <Button
              variant='outlined'
              sx={{ height: 40 }}
              onClick={() => localNavigate('/games/')}
            >
              {'بازگشت'}
            </Button>
          </Stack>
        </Stack>

        <Typography variant="h6">{'کارت‌های داستان:'}</Typography>
        <Deck
          cards={cards}
          onCardClick={handleCardClick}
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>{'روایت شما:'}</Typography>
        <Deck
          cards={selectedCards}
          onRemoveCard={handleRemoveCardFromSelectedCards}
        />

        <Button variant='contained' onClick={handleSubmit}>
          {'ارسال پاسخ'}
        </Button>
      </Stack>
    </Box>
  );
};

export default CardsGame;
