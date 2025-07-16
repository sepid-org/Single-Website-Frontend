import {
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';

type CertificatesTabPropsType = {}

const CertificatesTab: FC<CertificatesTabPropsType> = ({ }) => {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <Stack padding={2} spacing={3} alignItems={'start'} justifyContent={'center'} paddingTop={2}>

      <Typography variant='h2' gutterBottom>
        {'گواهی‌ها'}
      </Typography>

      <Typography>
        {'برای ثبت گواهی به پشتیبانی سامانه پیام دهید.'}
      </Typography>

    </Stack>
  );
}

export default CertificatesTab;