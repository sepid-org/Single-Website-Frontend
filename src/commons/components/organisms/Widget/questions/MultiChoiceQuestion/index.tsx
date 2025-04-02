import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import Choice from 'commons/components/molecules/Choice';
import { ChoiceType } from 'commons/types/widgets';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useMultiChoiceQuestionProperties from './useMultiChoiceQuestionProperties';

export type MultiChoiceQuestionWidgetPropsType = {
  choices: ChoiceType[];
  max_selections: number;
  min_selections: number;
  disable_after_answer: boolean;
  randomize_choices: boolean;
} & QuestionWidgetType;

const MultiChoiceQuestionWidget: FC<MultiChoiceQuestionWidgetPropsType> = ({
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
  is_required,
  ...widgetProps
}) => {

  const {
    selectedChoiceIds,
    displayChoices,
    onChoiceSelect,
    submitAnswer,
    submitAnswerResult,
    errorMessage,
    isQuestionLoading,
  } = useMultiChoiceQuestionProperties({
    useSubmitAnswerMutation,
    onAnswerChange,
    questionId,
    choices: questionChoices,
    mode,
    minSelections,
    maxSelections,
    randomizeChoices,
    disableAfterAnswer,
  });

  return (
    <Stack
      spacing={1}
      visibility={widgetProps.is_hidden && mode === 1 ? 'hidden' : 'visible'}
      sx={{opacity: (widgetProps.is_hidden && mode === 2 ? 0.2 : 1)}}
    >
      <IsRequired hidden={!is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={questionText}
        />
      </IsRequired>
      <Stack spacing={1}>
        {displayChoices.map((choice) => (
          <Choice
            inactive={(maxSelections === 1 && isQuestionLoading) || mode === WidgetModes.Review}
            key={choice.id}
            choice={choice}
            mode={WidgetModes.View}
            isSelected={selectedChoiceIds.includes(choice.id)}
            onSelectionChange={() => onChoiceSelect(choice)}
            variant={maxSelections > 1 ? 'checkbox' : 'radio'}
          />
        ))}
      </Stack>
      {mode === WidgetModes.View && maxSelections > 1 && (
        <Stack alignItems={'end'}>
          <Button
            disabled={isQuestionLoading || Boolean(errorMessage)}
            sx={{ width: 80, alignSelf: 'end' }}
            variant='contained'
            onClick={() => submitAnswer(selectedChoiceIds)}
          >
            <Typography fontWeight={400}>
              {'ثبت'}
            </Typography>
          </Button>
          <Typography variant='caption' color={'error'}>
            {errorMessage}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default MultiChoiceQuestionWidget;
export { MultiChoiceQuestionEditWidget };