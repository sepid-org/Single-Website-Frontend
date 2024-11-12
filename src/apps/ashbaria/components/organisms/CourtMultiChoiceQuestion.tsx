import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import { toPersianNumber } from 'commons/utils/translateNumber';
import CourtMultiChoiceQuestionChoice from '../molecules/CourtMultiChoiceQuestionChoice';
import { MultiChoiceQuestionWidgetPropsType } from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion';
import useMultiChoiceQuestionProperties from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion/useMultiChoiceQuestionProperties';

const CourtMultiChoiceQuestion: FC<MultiChoiceQuestionWidgetPropsType> = ({
  useSubmitAnswerMutation,
  onAnswerChange,

  id: questionId,
  text: questionText,
  choices: questionChoices,
  mode,
  max_selections: maxSelections,
  min_selections: minSelections,
  disable_after_answer: disableAfterAnswer,
  randomize_choices: randomizeChoices,
}) => {

  const {
    selectedChoices,
    displayChoices,

    onChoiceSelect,
    submitAnswer,
    errorMessage,
    submitAnswerResult,
  } = useMultiChoiceQuestionProperties({
    questionId,
    useSubmitAnswerMutation,
    onAnswerChange,
    choices: questionChoices,
    mode,
    minSelections,
    maxSelections,
    randomizeChoices,
    disableAfterAnswer,
  });

  return (
    <Stack spacing={1}>
      <TinyPreview
        styles={{ width: '100%' }}
        content={questionText}
      />
      <Stack spacing={1.5}>
        {displayChoices.map((choice) =>
          <CourtMultiChoiceQuestionChoice
            key={choice.id}
            choice={choice}
            isSelected={selectedChoices.map(choice => choice.id).includes(choice.id)}
            onSelectionChange={() => onChoiceSelect(choice)}
          />
        )}
      </Stack>
      {
        mode === WidgetModes.View && maxSelections > 1 &&
        <Stack alignItems={'end'}>
          <Button
            disabled={Boolean(errorMessage)}
            sx={{ width: 80, alignSelf: 'end' }}
            variant='contained'
            onClick={() => submitAnswer(selectedChoices)}>
            <Typography fontWeight={400}>
              {'ثبت'}
            </Typography>
          </Button>
          <Typography variant='caption' color={'error'}>
            {errorMessage}
          </Typography>
        </Stack>
      }
    </Stack >
  );
};

export default CourtMultiChoiceQuestion;
