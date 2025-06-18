import {
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';

type StatisticsTabPropsType = {

}

const StatisticsTab: FC<StatisticsTabPropsType> = ({

}) => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Stack spacing={3} alignItems={'start'} justifyContent={'center'} paddingTop={2}>

      <Typography variant='h2' gutterBottom>
        {'آمار'}
      </Typography>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار کاربران'}
        </Typography>
        {'به زودی...'}

      </Stack>

      <Stack spacing={1}>
        <Typography variant='h3' gutterBottom>
          {'آمار دوره‌ها'}
        </Typography>
        {'به زودی...'}

      </Stack>
    </Stack>
  );
}

export default StatisticsTab;