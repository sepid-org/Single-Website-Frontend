import {
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import RegisterUsersViaExcelInProgram from './RegisterUsersViaExcelInProgram';
import RegisterUserInProgram from './RegisterUserInProgram';
import RegistrationReceiptsTable from 'commons/components/organisms/tables/RegistrationReceipts';
import { useLazyGetParticipantsFileQuery, useLazyGetAnswerSheetsFileQuery } from 'commons/redux/apis/reporting-service/ReportingServiceSlice';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import downloadBlob from 'commons/utils/downloadBlob';

type RegistrationReceiptsPropsType = {}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [triggerGetParticipants, { isFetching: participantsLoading }] =
    useLazyGetParticipantsFileQuery();
  const [triggerGetAnswerSheets, { isFetching: answersLoading }] =
    useLazyGetAnswerSheetsFileQuery();

  const downloadParticipantsExcel = async () => {
    if (!program) return;
    const participantsBlob = await triggerGetParticipants({ formId: program.registration_form }).unwrap();
    downloadBlob(participantsBlob, `participants_${programSlug}.xlsx`);
  };

  const downloadAnswerSheetsExcel = async () => {
    if (!program) return;
    const answerSheetsBlob = await triggerGetAnswerSheets({ formId: parseInt(program.registration_form, 10) }).unwrap();
    downloadBlob(answerSheetsBlob, `answer_sheets_${programSlug}.xlsx`);
  };

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
            <Button endIcon={<FileDownloadIcon />} onClick={downloadParticipantsExcel} disabled={participantsLoading}>
              {'افراد'}
            </Button>
            <Button endIcon={<FileDownloadIcon />} onClick={downloadAnswerSheetsExcel} disabled={answersLoading}>
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