import React, { FC } from 'react';

import { Stack, Typography } from '@mui/material';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import { useGetScenariosQuery } from '../redux/slices/ScenarioSlice';
import CreateScenarioButton from '../components/molecules/CreateScenarioButton';
import EditScenarioButton from '../components/molecules/EditScenarioButton';


type ScenariosManagementPropsType = {}

const ScenariosManagement: FC<ScenariosManagementPropsType> = ({ }) => {
  const { data: scenarios } = useGetScenariosQuery();

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack direction={'row'} padding={2} paddingBottom={0} spacing={2} justifyContent={'space-between'}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='h2'>
            {'سناریو‌ها'}
          </Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'}>
          <CreateScenarioButton />
        </Stack>
      </Stack>

      <SimpleTable
        hideRowNumbersColumn
        headers={[
          { name: 'id', label: 'شناسه' },
          { name: 'question', label: 'سوال' },
          { name: 'destination_state', label: 'گام مقصد' },
          { name: 'order', label: 'اولویت' },
          { name: 'activities', label: 'عملیات' },
        ]}
        rows={scenarios?.map(scenario => ({
          ...scenario,
          activities: <EditScenarioButton scenarioId={scenario.id} />
        }))}
      />
    </Stack>
  );
};

export default ScenariosManagement;