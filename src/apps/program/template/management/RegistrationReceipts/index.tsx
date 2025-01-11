import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import RegisterUsersViaExcelInProgram from './RegisterUsersViaExcelInProgram';
import RegisterUserInProgram from './RegisterUserInProgram';
import RegistrationReceiptsTable from 'commons/components/organisms/tables/RegistrationReceipts';
import { useLazyGetParticipantsFileQuery, useLazyGetAnswerSheetsFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';
import downloadFromURL from 'commons/utils/downloadFromURL';
import { CMS_URL } from 'commons/constants/Constants';
import isValidURL from 'commons/utils/validators/urlValidator';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type RegistrationReceiptsPropsType = {}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [triggerGetParticipants, getParticipantsResult] = useLazyGetParticipantsFileQuery();
  const [triggerGetAnswerSheets, getAnswerSheetsResult] = useLazyGetAnswerSheetsFileQuery();

  const downloadParticipantsExcel = () => {
    if (program) {
      triggerGetParticipants({ formId: program?.registration_form });
    }
  }

  const downloadAnswerSheetsExcel = () => {
    if (program) {
      triggerGetAnswerSheets({ formId: program?.registration_form });
    }
  }

  useEffect(() => {
    if (getParticipantsResult?.isSuccess) {
      let url = getParticipantsResult.data.file;
      if (!isValidURL(url)) {
        url = `${CMS_URL}${getParticipantsResult.data.file}`;
      }
      downloadFromURL(url, `participants.xlsx`);
    }
  }, [getParticipantsResult.data])

  useEffect(() => {
    if (getAnswerSheetsResult?.isSuccess) {
      let url = getAnswerSheetsResult.data.file;
      if (!isValidURL(url)) {
        url = `${CMS_URL}${getAnswerSheetsResult.data.file}`;
      }
      downloadFromURL(url, `answer-sheets.xlsx`);
    }
  }, [getAnswerSheetsResult.data])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <RegisterUserInProgram />
      </Stack>
      <Divider />

      <Stack padding={2} spacing={2}>
        <RegisterUsersViaExcelInProgram />
      </Stack>
      <Divider />

      <Stack spacing={2}>
        <Stack padding={2} direction={{ xs: 'column', sm: 'row' }} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'شرکت‌کنندگان'}
          </Typography>
          <ButtonGroup variant='contained' >
            <Button endIcon={<FileDownloadIcon />} onClick={downloadParticipantsExcel} disabled={getParticipantsResult?.isLoading}>
              {'افراد'}
            </Button>
            <Button endIcon={<FileDownloadIcon />} onClick={downloadAnswerSheetsExcel} disabled={getAnswerSheetsResult?.isLoading}>
              {'پاسخ‌ها'}
            </Button>
          </ButtonGroup>
        </Stack>
        <RegistrationReceiptsTable registrationFormId={program?.registration_form} />
      </Stack>
    </Stack>
  );
}

export default RegistrationReceipts;