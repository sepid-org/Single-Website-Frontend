import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Paper, Stack, Typography } from '@mui/material';
import Deck from '../../components/molecules/Deck';
import { useAttemptToAnswerMutation, useGetCardsQuery, useGetMissionQuery } from '../../redux/slices/CardsGame';
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
  const { data: mission, isError: isGetMissionError } = useGetMissionQuery();
  const localNavigate = useLocalNavigate();
  const { data: initialInitialCards = [] } = useGetCardsQuery();
  const [attempt, result] = useAttemptToAnswerMutation();
  const [initialCards, setInitialCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  useEffect(() => {
    if (initialCards) {
      setInitialCards(sortCardsByID(initialInitialCards));
    }
  }, [initialInitialCards]);

  const sortCardsByID = (cards) => {
    let sortedCards = [...cards];
    for (let i = 0; i < sortedCards.length; i++) {
      for (let j = i; j < sortedCards.length; j++) {
        if (sortedCards[i]["id"] > sortedCards[j]["id"]) {
          let tempCrad = sortedCards[i];
          sortedCards[i] = sortedCards[j];
          sortedCards[j] = tempCrad;
        }
      }
    }
    return sortedCards;
  }

  const handleCardClick = (card, index) => {
    setSelectedCards([...selectedCards, card]);
    const updatedList = [...initialCards];
    updatedList.splice(index, 1);
    setInitialCards(sortCardsByID(updatedList));
  };

  const handleRemoveCardFromSelectedCards = (card, index) => {
    const updatedList = [...selectedCards];
    updatedList.splice(index, 1);
    setSelectedCards(updatedList);
    const updatedUpperList = [...initialCards];
    updatedUpperList.push(card);
    setInitialCards(sortCardsByID(updatedUpperList));
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
        setSelectedCards([]);
        dialogService.open({
          component:
            <CustomDialogContent
              image={<ScoreAnnouncement />}
              title={`آفرین! این ماموریت رو انجام دادی. ${toPersianNumber(result.data.mission.reward)} سکه بهت اضافه شد. برای ماموریت بعدی آماده شو... `}
              onClick={() => {
                dialogService.close();
              }}
            />
        })
      } else {
        dialogService.open({
          component:
            <CustomDialogContent
              title={'روایتی که ساختی درست نیست'}
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
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: "100vw",
      }}
    >
      <Stack
        component={Paper}
        width="100%"
        maxWidth="md"
        padding={2}
        alignItems="start"
        spacing={2}
        sx={{
          backgroundColor: 'rgba(45, 42, 65, 0.8)',
          borderRadius: { xs: 0, md: 1 }
        }}
      >
        <Stack width={'100%'} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Box width={200}>
            <MyScoresChip />
          </Box>

          <Stack spacing={2} direction={{ xs: 'column-reverse', sm: 'row' }}>
            <ButtonGroup>
              <GameHelpButton helpPaperId={gameData?.help_paper_id} />
              <Button
                fullWidth
                variant='outlined'
                onClick={() => localNavigate('/games/')}
              >
                {'بازگشت'}
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>

        {isGetMissionError ?
          <Typography variant="h2" sx={{ marginTop: 2 }}>{'تبریک میگم! تمام ماموریت‌ها را انجام دادی🎉'}</Typography> :
          <Fragment>
            <Typography variant="h3" sx={{ marginTop: 2 }}>{mission?.description}</Typography>

            <Typography variant="h6">{'کارت‌های داستان:'}</Typography>
            <Deck
              cards={initialCards}
              onCardClick={handleCardClick}
            />

            <Typography variant="h6" sx={{ marginTop: 2 }}>{'روایت شما:'}</Typography>
            <Deck
              cards={selectedCards}
              onRemoveCard={handleRemoveCardFromSelectedCards}
              setCards={setSelectedCards}
            />

            <Button fullWidth variant='contained' onClick={handleSubmit} size='large'>
              <Typography variant='h5' color={'black'}>
                {'ارسال پاسخ'}
              </Typography>
            </Button>
          </Fragment>
        }
      </Stack>
    </Box>
  );
};

export default CardsGame;