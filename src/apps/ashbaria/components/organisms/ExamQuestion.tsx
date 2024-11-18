import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import TinyPreview from 'commons/components/organisms/TinyEditor/Preview';
import { WidgetModes } from 'commons/components/organisms/Widget';
import IsRequired from 'commons/components/atoms/IsRequired';
import useMultiChoiceQuestionProperties from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion/useMultiChoiceQuestionProperties';
import { MultiChoiceQuestionWidgetPropsType } from 'commons/components/organisms/Widget/questions/MultiChoiceQuestion';
import MessageIcon from '../atoms/icons/Message';
import QuestionChoice from '../atoms/QuestionChoice';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import { useGetFSMStateQuery } from 'apps/fsm/redux/slices/fsm/FSMStateSlice';

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
    selectedChoiceIds,
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
 
  const { player } = useFSMContext();
  const { data: currentFSMState } = useGetFSMStateQuery({ fsmStateId: player?.current_state }, { skip: !Boolean(player?.current_state) })

  const [selectedChoice, setSelectedChoice] = useState(null);
  useEffect(() => {
    if (selectedChoiceIds.length > 0 && selectedChoice === null) {
      setSelectedChoice(selectedChoiceIds[0]);
    }
  }, [selectedChoiceIds]);

  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack justifyContent={"space-between"}>
        <Stack flexDirection={"row"} alignItems={"center"}>
          <MessageIcon />
          <Typography color="#FFA800" fontWeight={600} fontSize={16}>{currentFSMState?.title}</Typography>
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
            key={choice.id}
          >
            <QuestionChoice
              choice={choice}
              isSelected={selectedChoice === choice.id}
              onSelectionChange={() => {
                setSelectedChoice(choice.id);
                onChoiceSelect(choice);
              }}
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export default ExamQuestion;