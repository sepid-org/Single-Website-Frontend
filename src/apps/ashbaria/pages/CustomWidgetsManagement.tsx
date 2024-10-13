import React, { FC } from 'react';

import { Button, Divider, Stack, Typography } from '@mui/material';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import CreateQuestionButton from '../components/molecules/CreateQuestionButton';
import { useGetQuestionsQuery } from '../redux/slices/QuestionSlice';
import EditQuestionButton from '../components/molecules/EditQuestionButton';


type CustomWidgetsManagementPropsType = {}

const CustomWidgetsManagement: FC<CustomWidgetsManagementPropsType> = ({ }) => {
  const { data: questions } = useGetQuestionsQuery();

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack direction={'row'} padding={2} paddingBottom={0} spacing={2} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='h2'>
            {'سوالات'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <CreateQuestionButton />
        </Stack>
      </Stack>

      <SimpleTable
        hideRowNumbersColumn
        headers={[
          { name: 'id', label: 'شناسه' },
          { name: 'name', label: 'نام سوال' },
          { name: 'court', label: 'دادگاه' },
          { name: 'activities', label: 'عملیات' },
        ]}
        rows={questions?.map(question => ({
          ...question,
          activities: <EditQuestionButton questionId={question.id} />
        }))}
      />
    </Stack>
  );
};

export default CustomWidgetsManagement;