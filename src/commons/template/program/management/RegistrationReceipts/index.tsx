import {
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import RegisterUsersViaExcelInProgram from './RegisterUsersViaExcelInProgram';
import RegisterUserInProgram from './RegisterUserInProgram';
import RegistrationReceiptsTable from 'commons/components/organisms/tables/RegistrationReceipts';
import { useLazyGetRegistrationReceiptsFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';
import downloadFromURL from 'commons/utils/downloadFromURL';
import { MEDIA_BASE_URL } from 'commons/configs/Constants';
import isValidURL from 'commons/utils/validators/urlValidator';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type RegistrationReceiptsPropsType = {}

const RegistrationReceipts: FC<RegistrationReceiptsPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [trigger, result] = useLazyGetRegistrationReceiptsFileQuery();

  const downloadExcelExport = () => {
    if (program) {
      trigger({ formId: program?.registration_form });
    }
  }

  useEffect(() => {
    if (result?.isSuccess) {
      let url = result.data.file;
      if (!isValidURL(url)) {
        url = `${MEDIA_BASE_URL}${result.data.file}`;
      }
      downloadFromURL(url, `registration-receipts.xlsx`);
    }
  }, [result.isLoading])

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
        <Stack padding={2} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'شرکت‌کنندگان'}
          </Typography>
          <Button variant='contained' onClick={downloadExcelExport} disabled={result?.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
        <RegistrationReceiptsTable registrationFormId={program?.registration_form} />
      </Stack>
    </Stack>
  );
}

export default RegistrationReceipts;