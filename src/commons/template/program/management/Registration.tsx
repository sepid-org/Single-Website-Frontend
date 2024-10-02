import React, { FC, useEffect, useState } from 'react';
import { EditPaper } from 'commons/template/Paper';
import { Button, Divider, Stack, Typography } from '@mui/material';
import FormInfo from 'commons/components/organisms/forms/FormInfo';
import { useGetFormQuery, useUpdateFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useLazyGetAnswerSheetsFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';
import isValidURL from 'commons/utils/validators/urlValidator';
import { MEDIA_BASE_URL } from 'commons/configs/Constants';
import downloadFromURL from 'commons/utils/downloadFromURL';

type RegistrationPropsType = {}

const Registration: FC<RegistrationPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm, isSuccess } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program) });
  const [form, setForm] = useState(registrationForm)
  const [updateForm, result] = useUpdateFormMutation();
  const [trigger, getAnswerSheetsFileResult] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = () => {
    trigger({ formId: program.registration_form })
  }

  useEffect(() => {
    if (getAnswerSheetsFileResult.isSuccess) {
      let url = getAnswerSheetsFileResult.data.file;
      if (!isValidURL(url)) {
        url = `${MEDIA_BASE_URL}${getAnswerSheetsFileResult.data.file}`;
      }
      downloadFromURL(url, `answer-sheets.xlsx`);
    }
  }, [getAnswerSheetsFileResult.isLoading])

  useEffect(() => {
    setForm(registrationForm);
  }, [isSuccess])

  const onSubmit = () => {
    updateForm(form);
  }

  useEffect(() => {
    if (result?.isSuccess) {
      toast.success('فرم ثبت‌نام با موفقیت به‌روز شد.');
    }
  }, [result])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'تنظیمات ثبت‌نام'}
          </Typography>
          <Button onClick={onSubmit} disabled={deepEqual(registrationForm, form)} variant='contained'>
            {'به‌روز‌رسانی'}
          </Button>
        </Stack>
        <Stack>
          <FormInfo data={form} setData={setForm} />
        </Stack>
      </Stack>

      <Divider />

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

      <Divider />

      <Stack padding={2} spacing={2}>
        <Typography variant='h2' gutterBottom>
          {'فرم ثبت‌نام'}
        </Typography>
        <EditPaper paperId={program?.registration_form} />
      </Stack>
    </Stack>
  );
};

export default Registration;