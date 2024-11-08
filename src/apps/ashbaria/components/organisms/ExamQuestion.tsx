import React, { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import Choice from 'commons/components/molecules/Choice';
import IsRequired from 'commons/components/atoms/IsRequired';
import useMultiChoiceQuestionProperties from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion/useMultiChoiceQuestionProperties';
import { MultiChoiceQuestionWidgetPropsType } from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion';
import MessageIcon from '../atoms/icons/Message';

const ExamQuestion: FC<MultiChoiceQuestionWidgetPropsType> = ({
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
  submittedAnswer,
  ...questionWidgetProps
}) => {
  const {
    selectedChoices,
    displayChoices,

    onChoiceSelect,
    submitAnswer,
    submitAnswerResult,
    errorMessage,
  } = useMultiChoiceQuestionProperties({
    questionId,
    useSubmitAnswerMutation,
    onAnswerChange,
    id: questionId,
    choices: questionChoices,
    mode,
    minSelections,
    maxSelections,
    randomizeChoices,
    disableAfterAnswer,
  });

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
          styles={{ width: '100%', }}
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
