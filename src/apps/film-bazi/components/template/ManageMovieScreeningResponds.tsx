import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useLazyGetAnswerSheetsFileQuery } from 'commons/redux/apis/reporting-service/ReportingServiceSlice';
import downloadBlob from 'commons/utils/downloadBlob';

type ManageMovieScreeningRespondsPropsType = {}

const ManageMovieScreeningResponds: FC<ManageMovieScreeningRespondsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [trigger, result] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = async () => {
    if (!program || !programSlug) return;
    try {
      const blob = await trigger({ formId: parseInt(program.registration_form) }).unwrap();
      downloadBlob(blob, `answer_sheets_${program.registration_form}.xlsx`);
    } catch (e) {
      console.error('Export failed', e);
    }
  }

  return (
    <Stack spacing={2} padding={2} alignItems={'stretch'} justifyContent={'center'}>

      <Stack spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'پاسخ‌های داده شده'}
          </Typography>
          <Button variant='contained' onClick={downloadExcelExport} disabled={result.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
      </Stack>

    </Stack>
  );
}

export default ManageMovieScreeningResponds;