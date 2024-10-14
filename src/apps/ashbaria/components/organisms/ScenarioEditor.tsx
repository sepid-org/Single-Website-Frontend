import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  Divider
} from '@mui/material';
import { useAddScenarioMutation, useGetScenarioQuery, useUpdateScenarioMutation } from 'apps/ashbaria/redux/slices/ScenarioSlice';
import { useGetQuestionsQuery } from 'apps/ashbaria/redux/slices/QuestionSlice';
import { QuestionType } from 'apps/ashbaria/types';

type ScenarioEditorPropsType = {
  id?: number;
  onClose: any;
}

const ScenarioEditor: FC<ScenarioEditorPropsType> = ({
  id,
  onClose,
}) => {
  const { data: initialScenario } = useGetScenarioQuery(id, { skip: !Boolean(id) })
  const { data: questions } = useGetQuestionsQuery();
  const [addScenario, addScenarioResult] = useAddScenarioMutation();
  const [updateScenario, updateScenarioResult] = useUpdateScenarioMutation();
  const [scenario, setScenario] = useState({
    question: null,
    desired_choices: [],
    least_count_of_correct_choices_must_be_selected: null,
    is_finisher: false,
    destination_state: '',
    reward_support_percentages: [],
    order: 0
  });

  useEffect(() => {
    if (initialScenario) {
      setScenario({
        ...initialScenario,
        question: initialScenario.question,
      });
    }
  }, [initialScenario])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setScenario(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (name === 'question') {
      setScenario(prevData => ({
        ...prevData,
        'desired_choices': []
      }));
    }
  };

  const handleChoiceChange = (event) => {
    const { value } = event.target;
    setScenario(prevData => ({
      ...prevData,
      desired_choices: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (event) => {
    if (id) {
      updateScenario({
        id,
        ...scenario,
      });
    } else {
      addScenario(scenario);
    }
  };

  useEffect(() => {
    if (addScenarioResult.isSuccess) {
      onClose();
    }
  }, [addScenarioResult])

  useEffect(() => {
    if (updateScenarioResult.isSuccess) {
      onClose();
    }
  }, [updateScenarioResult])

  const selectedQuestion = questions?.find(question => question.id === scenario.question)
  const choices = selectedQuestion?.choices;

  return (
    <Stack padding={2} spacing={2}>
      <Typography variant="h6">{`${id ? 'ویرایش' : 'ایجاد'} سناریو${id ? '' : ' جدید'}`}</Typography>

      <FormControl fullWidth>
        <InputLabel>سوال</InputLabel>
        <Select
          label='سوال'
          name="question"
          value={scenario.question || ''}
          onChange={handleChange}
          required
        >
          {questions?.map((question) => (
            <MenuItem key={question.id} value={question.id}>{question.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />

      <FormControl fullWidth>
        <InputLabel>گزینه‌های مطلوب</InputLabel>
        <Select
          label='گزینه‌های مطلوب'
          multiple
          name="desired_choices"
          value={scenario.desired_choices}
          onChange={handleChoiceChange}
          renderValue={(selected) => selected.join(', ')}
          disabled={!choices}
        >
          {choices?.map((choice) => (
            <MenuItem key={choice.id} value={choice.id}>
              <Checkbox checked={scenario.desired_choices.indexOf(choice.id) > -1} />
              {choice.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        name="least_count_of_correct_choices_must_be_selected"
        label="حداقل تعداد گزینه صحیح"
        type="number"
        value={scenario.least_count_of_correct_choices_must_be_selected}
        onChange={handleChange}
        InputProps={{ inputProps: { min: 1 } }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={scenario.is_finisher}
            onChange={(e) => setScenario(prev => ({ ...prev, is_finisher: e.target.checked }))}
            name="is_finisher"
          />
        }
        label="آیا با انجام سناریو، دادگاه خاتمه می‌یابد؟"
      />

      <Divider />

      <TextField
        fullWidth
        name="destination_state"
        label="گام مقصد"
        value={scenario.destination_state}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        name="reward_support_percentages"
        label="درصد حمایت‌ها"
        value={scenario.reward_support_percentages.join(',')}
        onChange={(e) => setScenario(prev => ({ ...prev, reward_support_percentages: e.target.value.split(',').map(Number) }))}
        helperText="درصد حمایت‌ها را با ویرگول از هم جدا کنید؛ برای مثال: 10,20,30"
      />

      <TextField
        fullWidth
        name="order"
        label="ترتیب اعمال"
        type="number"
        value={scenario.order}
        onChange={handleChange}
      />

      <Button
        onClick={handleSubmit}
        type="submit" variant="contained" color="primary"
        disabled={addScenarioResult.isLoading || updateScenarioResult.isLoading}>
        {addScenarioResult.isLoading || updateScenarioResult.isLoading ? 'در حال ثبت...' : 'ثبت'}
      </Button>
    </Stack>
  );
}

export default ScenarioEditor;