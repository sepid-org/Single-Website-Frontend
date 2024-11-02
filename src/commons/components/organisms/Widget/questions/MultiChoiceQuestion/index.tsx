import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
import Choice from 'commons/components/molecules/Choice';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { AnswerType } from 'commons/types/models';
import { ChoiceType } from 'commons/types/widgets';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useMultiChoiceQuestionProperties from './useMultiChoiceQuestionProperties';
export { MultiChoiceQuestionEditWidget };

export type MultiChoiceQuestionWidgetPropsType = {
  useSubmitAnswerMutation: any;
  onAnswerChange: any;
  id: string;
  text: string;
  choices: ChoiceType[];
  mode: WidgetModes;
  max_selections: number;
  min_selections: number;
  lock_after_answer: boolean;
  randomize_choices: boolean;
  submittedAnswer: AnswerType;
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
  lock_after_answer: disableAfterAnswer,
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
    questionId,
    useSubmitAnswerMutation,
    onAnswerChange,
    id: questionId,
    choices: questionChoices,
    mode,
    maxSelections,
    randomizeChoices,
    disableAfterAnswer,
  });

  return (
    <Stack spacing={1}>
      <IsRequired disabled={!questionWidgetProps.is_required}>
        <TinyPreview
          styles={{ width: '100%' }}
          content={questionText}
        />
      </IsRequired>
      <Stack spacing={1}>
        {displayChoices.map((choice) =>
          <Choice
            disabled={mode === WidgetModes.Review}
            key={choice.id}
            choice={choice}
            mode={WidgetModes.View}
            isSelected={selectedChoices.map(choice => choice.id).includes(choice.id)}
            onSelectionChange={() => onChoiceSelect(choice)}
            variant={maxSelections > 1 ? 'checkbox' : 'radio'}
          />
        )}
      </Stack>
      {mode === WidgetModes.View && maxSelections > 1 &&
        <Stack alignItems={'end'}>
          <Button
            disabled={selectedChoices?.length < minSelections || selectedChoices.length > maxSelections}
            sx={{ width: 80, alignSelf: 'end' }}
            variant='contained'
            onClick={() => submitAnswer(selectedChoices)}>
            <Typography fontWeight={400}>
              {'ثبت'}
            </Typography>
          </Button>
          <Typography variant='caption' color={'error'}>
            {selectedChoices?.length < minSelections && `باید حداقل ${toPersianNumber(minSelections)} گزینه را انتخاب کنید.`}
            {selectedChoices?.length > maxSelections && `حداکثر ${toPersianNumber(maxSelections)} گزینه را می‌توانید انتخاب کنید.`}
          </Typography>
        </Stack>
      }
    </Stack>
  );
};

export default MultiChoiceQuestionWidget;
