import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import React, { FC, useEffect, useState } from 'react';

import { toPersianNumber } from 'commons/utils/translateNumber';
import { useGetFSMsQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import { useParams } from 'react-router-dom';
import { useCreateQuestionMutation, useGetQuestionByIdQuery, useUpdateQuestionMutation } from 'apps/ashbaria/redux/slices/QuestionSlice';
import { QuestionType } from 'apps/ashbaria/types';
import ChoiceEditor from '../molecules/choice/ChoiceEdit';

type QuestionWidgetEditorPropsType = {
  id?: number;
  onClose: any;
}

const QuestionWidgetEditor: FC<QuestionWidgetEditorPropsType> = ({
  id,
  onClose,
}) => {
  const { data: initialQuestion } = useGetQuestionByIdQuery(id, { skip: !Boolean(id) });
  const [updatedQuestion, updateResult] = useUpdateQuestionMutation();
  const [createQuestion, createResult] = useCreateQuestionMutation();
  const { programSlug } = useParams();
  const { data: fsms } = useGetFSMsQuery({ programSlug, pageNumber: 1 });
  const [question, setQuestion] = useState<QuestionType>(initialQuestion || {
    name: '',
    choices: [],
    court: 1,
    maximum_choices_could_be_selected: 1,
  });

  const addNewChoice = () => {
    setQuestion({
      ...question,
      choices: [
        ...question.choices,
        {
          text: `گزینه ${toPersianNumber(question.choices.length + 1)}`,
          box_size: 'Medium',
          is_correct: false,
          is_finisher: false,
        },
      ]
    });
  }

  const deleteChoice = (choiceIndex: number) => {
    const newChoices = [...question.choices];
    newChoices.splice(choiceIndex, 1);
    setQuestion({
      ...question,
      choices: newChoices,
    });
  }

  const handleSubmit = () => {
    if (question.id) {
      updatedQuestion({
        id: question.id,
        updatedQuestion: question,
      });
    } else {
      createQuestion(question);
    }
  }

  useEffect(() => {
    if (updateResult.isSuccess) {
      onClose();
    }
  }, [updateResult])

  useEffect(() => {
    if (createResult.isSuccess) {
      onClose();
    }
  }, [createResult])

  return (
    <Stack padding={2} spacing={2}>
      <TextField
        label='نام'
        variant='outlined'
        fullWidth
        onChange={(event) => {
          setQuestion({
            ...question,
            name: event.target.value,
          });
        }}
        value={question.name}
        helperText={'از این نام برای اتصال به صفحه‌ی طراحی استفاده می‌شود.'}
      />

      <Stack width={'100%'}>
        <Typography gutterBottom>
          {'گزینه‌ها:'}
        </Typography>
        <Stack spacing={2}>
          {question.choices.map((choice, index) => (
            <ChoiceEditor
              key={index}
              choice={choice}
              setChoice={(newlyUpdatedChoice) => {
                const newChoices = [...question.choices];
                newChoices[index] = newlyUpdatedChoice;
                setQuestion({
                  ...question,
                  choices: newChoices,
                })
              }}
              onDelete={() => deleteChoice(index)}
            />
          ))}
        </Stack>
        <IconButton color="primary" onClick={addNewChoice} sx={{ alignSelf: 'start', padding: 0, marginTop: 1 }}>
          <AddCircleIcon fontSize='large' />
        </IconButton>
      </Stack>

      <TextField
        label='حداکثر تعداد گزینه‌هایی که کاربر می‌تواند انتخاب کند'
        variant='outlined'
        fullWidth
        onChange={(event) => {
          let value = parseInt(event.target.value);
          if (isNaN(value)) {
            value = 1;
          }
          if (value < 1) {
            value = 1;
          }
          if (value >= question.choices.length) {
            value = question.choices.length;
          }
          setQuestion({
            ...question,
            maximum_choices_could_be_selected: value,
          });
        }}
        type='number'
        inputMode='numeric'
        inputProps={{ min: 1, max: question.choices.length, step: 1 }}
        value={question.maximum_choices_could_be_selected}
      />
      <Stack direction={'row'} justifyContent={'end'}>
        <Button onClick={onClose} color="primary" variant="outlined">
          {'انصراف'}
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {'ثبت'}
        </Button>
      </Stack>
    </Stack>
  );
}

export default QuestionWidgetEditor;
