import React, { FC, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Stack, Typography } from '@mui/material';
import BulkUploadDiscountCodes from '../organisms/BulkUploadDiscountCodes';
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

      <BulkUploadDiscountCodes />

      <Box paddingTop={2}>
        <BulkUpdateDiscountCodeUsages />
      </Box>
    </Stack>
  );
};

export default ManageDiscountCodes;
