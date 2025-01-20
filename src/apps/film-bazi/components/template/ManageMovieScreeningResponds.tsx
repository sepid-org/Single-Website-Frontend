import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import isValidURL from 'commons/utils/validators/urlValidator';
import { CMS_URL } from 'commons/configs/Constants';
import downloadFromURL from 'commons/utils/downloadFromURL';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useLazyGetAnswerSheetsFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';

type ManageMovieScreeningRespondsPropsType = {}

const ManageMovieScreeningResponds: FC<ManageMovieScreeningRespondsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [trigger, result] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = () => {
    trigger({ formId: parseInt(program.registration_form) })
  }
  useEffect(() => {
    if (result.isSuccess) {
      let url = result.data.file;
      if (!isValidURL(url)) {
        url = `${CMS_URL}${result.data.file}`;
      }
      downloadFromURL(url, `answer-sheets.xlsx`);
    }
  }, [result.data])

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