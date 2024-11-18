import {
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import MetabaseDashboard from 'commons/template/MetabaseDashboard';

type PropsType = {}

const Statistics: FC<PropsType> = ({ }) => {

  return (
    <Stack spacing={2} padding={2} alignItems={'stretch'} justifyContent={'center'}>

      <Stack spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'آمار'}
          </Typography>
        </Stack>
      </Stack>

      <Stack sx={{ background: 'white', borderRadius: 2 }}>
        <MetabaseDashboard dashboard_id={7} params={{ website: 'ashbaria' }} />
      </Stack>
    </Stack>
  );
}

export default Statistics;