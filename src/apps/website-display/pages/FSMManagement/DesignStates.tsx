import React, { FC, useEffect, useState } from 'react';
import {
  Stack,
  Skeleton,
  Typography,
  Button,
  Dialog,
  IconButton,
} from '@mui/material';
import { useParams } from 'react-router';
import StatesMenu from 'commons/components/organisms/StatesMenu';
import EditableFSMState from 'commons/template/EditableFSMState';
import { useGetFSMStatesQuery } from 'apps/website-display/redux/features/fsm/FSMSlice';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import SettingsIcon from '@mui/icons-material/Settings';

type DesignStatesPropsType = {}

const DesignStates: FC<DesignStatesPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [selectedStateId, setSelectedStateId] = useState(null);
  const { data: fsmStates, isLoading } = useGetFSMStatesQuery({ fsmId });


  const headers = [
    { label: 'شناسه', name: 'id' },
    { label: 'نام', name: 'name' },
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
      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={Boolean(selectedStateId)}
        onClose={() => setSelectedStateId(null)}
      >
        {Boolean(selectedStateId) &&
          <EditableFSMState fsmStateId={selectedStateId} />
        }
      </Dialog>
    </Stack>
  );
};

export default DesignStates;