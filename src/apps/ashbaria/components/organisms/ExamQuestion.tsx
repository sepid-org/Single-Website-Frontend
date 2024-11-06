import React, { FC } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';

import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import Choice from 'commons/components/molecules/Choice';
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
          >
            <QuestionChoice
              disabled={mode === WidgetModes.Review}
              key={choice.id}
              choice={choice}
              mode={WidgetModes.View}
              isSelected={selectedChoices.map(c => c.id).includes(choice.id)}
              onSelectionChange={() => onChoiceSelect(choice)}
              variant={maxSelections > 1 ? 'checkbox' : 'radio'}
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
