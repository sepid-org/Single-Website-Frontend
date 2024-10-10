import React, { FC, useState } from 'react';
import {
  Stack,
  Skeleton,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import StateEditor from 'commons/template/StateEditor';
import { useGetFSMStatesQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateStateButton from 'commons/components/atoms/CreateStateButton';
import FullScreenDialog from 'commons/components/atoms/FullScreenDialog';

type StatesPropsType = {}

const States: FC<StatesPropsType> = ({ }) => {
  const { fsmId } = useParams();
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
          fullWidth={true}
          maxWidth={false}
          open={Boolean(selectedStateId)}
          onClose={() => setSelectedStateId(null)}
        >
          {Boolean(selectedStateId) &&
            <StateEditor />
          }
        </FullScreenDialog>
      </Stack>
    </Stack>
  );
};

export default States;