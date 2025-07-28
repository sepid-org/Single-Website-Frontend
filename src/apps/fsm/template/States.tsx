import React, { FC, useState } from 'react';
import {
  Stack,
  Skeleton,
  IconButton,
  Typography,
} from '@mui/material';
import { useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateStateButton from 'commons/components/atoms/CreateStateButton';
import FSMFirstStateSetter from '../components/organisms/FSMFirstStateSetter';
import FSMStateEditorDialog from './FSMStateEditorDialog';
import { useFSMContext } from 'commons/hooks/useFSMContext';

type StatesPropsType = {}

const States: FC<StatesPropsType> = ({ }) => {
  const { fsmId } = useFSMContext();
  const [selectedStateId, setSelectedStateId] = useState<string>(null);
  const { data: fsmStates, isLoading } = useGetFSMStatesQuery({ fsmId });

  const headers = [
    { label: 'شناسه', name: 'id' },
    { label: 'عنوان', name: 'title' },
    { label: 'تنظیمات', name: 'settings' },
  ];

  const rowsWithSettings = fsmStates?.map(obj => ({
    ...obj,
    settings: (
      <IconButton onClick={() => setSelectedStateId(obj.id)}>
        <SettingsIcon />
      </IconButton>
    ),
  }));

  return (
    <Stack padding={2} spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <FSMFirstStateSetter />
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography variant='h2'>
          {'گام‌ها'}
        </Typography>
        <CreateStateButton />
      </Stack>
      <Stack spacing={2}>
        {isLoading ?
          [1, 2, 3, 4].map(index =>
            <Skeleton key={index} variant="rounded" width={'100%'} height={60} />
          ) :
          <SimpleTable
            headers={headers}
            rows={rowsWithSettings}
            hideRowNumbersColumn={true}
          />
        }
        <FSMStateEditorDialog
          open={Boolean(selectedStateId)}
          fsmStateId={parseInt(selectedStateId)}
          handleClose={() => setSelectedStateId(null)}
        />
      </Stack>
    </Stack>
  );
};

export default States;