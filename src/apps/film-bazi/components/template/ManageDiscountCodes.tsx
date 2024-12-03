import React, { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Stack, Typography } from '@mui/material';
import BulkAddNewDiscountCodes from '../organisms/BulkAddNewDiscountCodes';
import BulkUpdateDiscountCodeUsages from '../organisms/BulkUpdateDiscountCodeUsages';

const ManageDiscountCodes: FC = () => {

  return (
    <Stack spacing={2} padding={2} alignItems="stretch" justifyContent="center">
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <Typography variant="h2" gutterBottom>
            {'کدهای تخفیف'}
          </Typography>
        </Stack>
      </Stack>

      <BulkAddNewDiscountCodes />

      <Box paddingTop={2}>
        <BulkUpdateDiscountCodeUsages />
      </Box>
    </Stack>
  );
};

export default ManageDiscountCodes;
