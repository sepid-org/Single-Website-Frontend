import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import SoftDeleteProgramButton from 'commons/components/atoms/SoftDeleteProgramButton';
import ProgramContactInfoForm from 'commons/components/organisms/forms/ProgramContactInfoForm';
import ProgramInfoForm from 'commons/components/organisms/forms/ProgramInfoForm';
import {
  useGetProgramQuery,
  useUpdateProgramMutation,
} from 'apps/website-display/redux/features/program/ProgramSlice';

import { ProgramType } from 'commons/types/models';

type PropsType = {};

const InfoTab: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const [properties, setProperties] = useState<ProgramType>();
  const [updateProgram, result] = useUpdateProgramMutation();
  const { data: program } = useGetProgramQuery({ programSlug });

  useEffect(() => {
    if (program) setProperties(program);
  }, [program]);

  useEffect(() => {
    if (result.isSuccess) toast.success('مشخصات دوره با موفقیت به‌روز شد.');
  }, [result.isSuccess]);

  const handleUpdateProgram = () => {
    if (!properties?.name) {
      toast.error('لطفاً نام دوره را انتخاب کنید.');
      return;
    }
    updateProgram({ programSlug, ...properties });
  };

  return (
    <Stack spacing={2} alignItems="stretch" justifyContent="center">
      <Stack padding={2} spacing={2}>
        <Stack direction="row" alignItems="start" justifyContent="space-between">
          <Typography variant="h2" gutterBottom>
            مشخصات دوره
          </Typography>
          <SoftDeleteProgramButton />
        </Stack>

        <Box>
          {properties &&
            <ProgramInfoForm
              showCoverImage
              data={properties}
              setData={setProperties}
            />
          }
        </Box>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant="h2" gutterBottom>
          راه‌های ارتباطی
        </Typography>

        <ProgramContactInfoForm
          data={properties?.program_contact_info}
          setData={(programContactInfo) =>
            setProperties((prev) => ({
              ...prev!,
              program_contact_info: programContactInfo,
            }))
          }
        />
      </Stack>

      <Stack padding={2} direction="row" justifyContent="end">
        <Button
          variant="contained"
          color="primary"
          disabled={result.isLoading}
          onClick={handleUpdateProgram}
          startIcon={
            result.isLoading && <CircularProgress size={16} color="inherit" />
          }
        >
          به‌روز‌رسانی
        </Button>
      </Stack>
    </Stack>
  );
};

export default InfoTab;