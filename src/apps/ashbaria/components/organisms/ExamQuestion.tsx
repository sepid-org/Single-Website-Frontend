import React, { FC, useEffect, useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useMultiChoiceQuestionProperties from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion/useMultiChoiceQuestionProperties';
import { MultiChoiceQuestionWidgetPropsType } from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion';
import MessageIcon from '../atoms/icons/Message';
import QuestionChoice from '../atoms/QuestionChoice';

const ExamQuestion: FC<MultiChoiceQuestionWidgetPropsType> = ({
  useSubmitAnswerMutation,
  onAnswerChange,

  id: questionId,
  text: questionText,
  choices: questionChoices,
  mode,
  max_selections: maxSelections,
  min_selections: minSelections,
  lock_after_answer: lockAfterAnswer,
  randomize_choices: randomizeChoices,
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const {
    selectedChoices,
    displayChoices,

    onChoiceSelect,
    submitAnswer,
    submitAnswerResult,
  } = useMultiChoiceQuestionProperties({
    useSubmitAnswerMutation,
    onAnswerChange,
    id: questionId,
    choices: questionChoices,
    mode,
    maxSelections,
    randomizeChoices,
    submittedAnswer,
  });

  const [time, setTime] = useState(60); // 1:00 = 60 seconds

  useEffect(() => {
    // Only start the interval if the time is greater than 0
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1); // Decrease time by 1 second
      }, 1000);

      // Clear the interval when the component is unmounted or when time is 0
      return () => clearInterval(intervalId);
    }
  }, [time]); // Depend on time, so the effect runs every time `time` changes

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  };

  return (
    <Stack spacing={1}>
      <Stack justifyContent={"space-between"}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <MessageIcon />
          <Typography color="#FFA800" fontWeight={600} fontSize={16}>{questionId}</Typography>
        </Stack>
      </Stack>
      <IsRequired disabled={!questionWidgetProps.is_required}>
        <TinyPreview
          styles={{
            width: '100%',
            fontSize: 12,
            fontWeight: 600,
          }}
          content={questionText}
        />

      </IsRequired>
      {formatTime(time)}
      <Grid 
        container 
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={1}
        padding={0}
      >
        {displayChoices.map((choice) =>
          <Grid
            item
            xs={6}
            key={choice.id}
          >
            <QuestionChoice
              choice={choice}
              isSelected={selectedChoices.map(c => c.id).includes(choice.id)}
              onSelectionChange={() => onChoiceSelect(choice)}
            />
          </Grid>
        )}
      </Grid>
      {mode === WidgetModes.View && maxSelections > 1 && selectedChoices.length > 0 &&
        <Button
          sx={{ width: 80, alignSelf: 'end' }}
          variant='contained'
          onClick={() => submitAnswer(selectedChoices)}>
          <Typography fontWeight={400}>
            {'ثبت'}
          </Typography>
        </Button>
      }
    </Stack>
  );
};

export default ExamQuestion;
