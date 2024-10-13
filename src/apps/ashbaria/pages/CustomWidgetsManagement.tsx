import React, { FC } from 'react';

import { Button, Divider, Stack, Typography } from '@mui/material';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import CreateQuestionButton from '../components/molecules/CreateQuestionButton';


type CustomWidgetsManagementPropsType = {}

const CustomWidgetsManagement: FC<CustomWidgetsManagementPropsType> = ({ }) => {

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack direction={'row'} padding={2} spacing={2} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='h2'>
            {'سوالات '}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <CreateQuestionButton />
        </Stack>
      </Stack>

      <Divider />

      <SimpleTable
        headers={[
          { name: 'title', label: 'نام سوال' },
          { name: 'court', label: 'دادگاه' },
          { name: 'activities', label: 'عملیات' },
        ]}
        rows={[].map(court => ({
          ...court,
        }))}
      />
    </Stack>
  );
};

export default CustomWidgetsManagement;