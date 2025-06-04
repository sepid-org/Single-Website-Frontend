import React, { FC, useState } from 'react';
import {
  Stack,
  Skeleton,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import FSMStateEditor from 'apps/fsm/template/FSMStateEditor';
import { useGetFSMStatesQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateStateButton from 'commons/components/atoms/CreateStateButton';
import FullScreenDialog from 'commons/components/atoms/FullScreenDialog';
import FSMFirstStateSetter from '../components/organisms/FSMFirstStateSetter';

type StatesPropsType = {}

const States: FC<StatesPropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const { data: fsmStates, isLoading } = useGetFSMStatesQuery({ fsmId });

  const headers = [
    { label: 'شناسه', name: 'id' },
    { label: 'عنوان', name: 'title' },
    { label: 'قالب', name: 'template' },
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
        <FullScreenDialog
          disableScrollLock
          fullWidth={true}
          maxWidth={false}
          open={Boolean(selectedStateId)}
          onClose={() => setSelectedStateId(null)}
        >
          {Boolean(selectedStateId) &&
            <FSMStateEditor fsmStateId={selectedStateId} />
          }
        </FullScreenDialog>
      </Stack>
    </Stack>
  );
};

export default States;