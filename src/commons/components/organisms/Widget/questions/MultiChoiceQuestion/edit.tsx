import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { ChoiceType } from 'commons/types/widgets';
import Choice from 'commons/components/molecules/Choice';
import { toast } from 'react-toastify';
import { WidgetModes } from '../..';
import { QuestionWidgetType } from 'commons/types/widgets/QuestionWidget';
import EditQuestionFields from 'commons/components/organisms/forms/EditQuestionFields';
import EditObjectFields from 'commons/components/organisms/forms/EditObjectFields';

type MultiChoiceQuestionEditWidgetPropsType = {
  onMutate: any;

  text: string;
  open: boolean;
  handleClose: any;
  choices: any[];
  paperId: any;
  id: string;
  max_selections: number;
  min_selections: number;
  lock_after_answer: boolean;
}

const MultiChoiceQuestionEditWidget: FC<MultiChoiceQuestionEditWidgetPropsType> = ({
  onMutate,

  text: previousQuestionText,
  choices: previousQuestionChoices,
  paperId,
  id: widgetId,
  handleClose,
  open,
  max_selections,
  min_selections,
  lock_after_answer,
  ...widgetProps
}) => {
  const t = useTranslate();
  const [lockAfterAnswer, setLockAfterAnswer] = useState(lock_after_answer || false);
  const [minimumChoicesCouldBeChosen, setMinimumChoicesCouldBeChosen] = useState(min_selections || 1);
  const [maximumChoicesCouldBeChosen, setMaximumChoicesCouldBeChosen] = useState(max_selections || 1);
  const [questionText, setQuestionText] = useState(previousQuestionText);
  const [questionChoices, setQuestionChoices] = useState<ChoiceType[]>(
    previousQuestionChoices ?
      previousQuestionChoices :
      [
        { text: 'گزینه ۱' },
        { text: 'گزینه ۲' }
      ]
  );
  const [widgetFields, setWidgetFields] = useState<Partial<QuestionWidgetType>>({ ...widgetProps });


  const handleSubmit = () => {
    onMutate({
      paper: paperId,
      text: questionText,
      choices: questionChoices,
      widgetId,
      onSuccess: handleClose,
      min_selections: minimumChoicesCouldBeChosen,
      max_selections: maximumChoicesCouldBeChosen,
      lock_after_answer: lockAfterAnswer,
      ...widgetFields,
    });
  };

  const changeText = (newValue, choiceIndex) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      text: newValue
    };
    setQuestionChoices(newChoices);
  };

  const changeIsCorrect = (choiceIndex: number) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      is_correct: !newChoices[choiceIndex].is_correct,
    };
    setQuestionChoices(newChoices);
  }

  const addNewChoice = () => {
    setQuestionChoices([...questionChoices, { text: `گزینه ${toPersianNumber(questionChoices.length + 1)}` }]);
  }

  const deleteChoice = (choiceIndex: number) => {
    if (questionChoices.length === 1) {
      toast.error('حداقل یک گزینه باید وجود داشته باشد.');
      return;
    }
    const newChoices = [...questionChoices];
    newChoices.splice(choiceIndex, 1);
    setQuestionChoices(newChoices);
  }

  return (
    <Dialog
      disableScrollLock
      open={open}
      maxWidth="sm"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('multipleChoiceQuestions')}</DialogTitle>
      <DialogContent>
        <EditObjectFields
          fields={widgetFields}
          setFields={setWidgetFields}
        />
        <Stack spacing={4} alignItems={'start'}>
          <Stack width={'100%'}>
            <label>{'صورت سوال:'}</label>
            <TinyEditorComponent content={questionText} onChange={(val) => setQuestionText(val)} />
          </Stack>

          <Stack width={'100%'}>
            <Typography gutterBottom>
              {'گزینه‌ها:'}
            </Typography>
            <Stack spacing={2}>
              {questionChoices.map((choice, index) => (
                <Choice
                  key={index}
                  isSelected={choice.is_correct}
                  onSelectionChange={() => changeIsCorrect(index)}
                  variant={maximumChoicesCouldBeChosen > 1 ? 'checkbox' : 'radio'}
                  choice={choice}
                  onDelete={() => deleteChoice(index)}
                  onTextChange={(event) => changeText(event.target.value, index)}
                  mode={WidgetModes.Edit}
                />
              ))}
            </Stack>
            <IconButton color="primary" onClick={addNewChoice} sx={{ alignSelf: 'start', padding: 0, marginTop: 1 }}>
              <AddCircleIcon fontSize='large' />
            </IconButton>
          </Stack>

          <TextField
            label='حداقل تعداد گزینه‌هایی که کاربر بتواند انتخاب کند'
            variant='outlined'
            fullWidth
            autoComplete="off"
            onChange={(event) => {
              let value = parseInt(event.target.value);
              if (isNaN(value)) {
                value = 1;
              }
              if (value < 1) {
                value = 1;
              }
              if (value >= maximumChoicesCouldBeChosen) {
                value = maximumChoicesCouldBeChosen;
              }
              setMinimumChoicesCouldBeChosen(value);
            }}
            type='number'
            inputMode='numeric'
            inputProps={{
              min: 1,
              max: maximumChoicesCouldBeChosen,
              step: 1,
              autoComplete: "off",
            }}
            error={!minimumChoicesCouldBeChosen}
            value={minimumChoicesCouldBeChosen}
          />

          <TextField
            label='حداکثر تعداد گزینه‌هایی که کاربر بتواند انتخاب کند'
            variant='outlined'
            fullWidth
            autoComplete="off"
            onChange={(event) => {
              let value = parseInt(event.target.value);
              if (isNaN(value)) {
                value = 1;
              }
              if (value < minimumChoicesCouldBeChosen) {
                value = minimumChoicesCouldBeChosen;
              }
              if (value >= questionChoices.length) {
                value = questionChoices.length;
              }
              setMaximumChoicesCouldBeChosen(value);
            }}
            type='number'
            inputMode='numeric'
            inputProps={{
              min: minimumChoicesCouldBeChosen,
              max: questionChoices.length,
              step: 1,
              autoComplete: "off",
            }}
            error={!maximumChoicesCouldBeChosen}
            value={maximumChoicesCouldBeChosen}
          />

          <FormControlLabel
            name='lock_after_answer'
            checked={lockAfterAnswer}
            onChange={() => setLockAfterAnswer(lockAfterAnswer => !lockAfterAnswer)}
            control={<Switch color="primary" />}
            label="قفل‌شدن گزینه‌ها بعد از جواب‌دادن:"
            labelPlacement='start'
          />

          <EditQuestionFields
            fields={widgetFields}
            setFields={setWidgetFields}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClose}>
          {'انصراف'}
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MultiChoiceQuestionEditWidget;
