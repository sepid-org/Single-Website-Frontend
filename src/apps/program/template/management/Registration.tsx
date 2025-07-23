import React, { FC, useEffect, useState } from 'react';
import { PaperEditor } from 'commons/template/Paper';
import { Button, Divider, Stack, Typography } from '@mui/material';
import RegistrationInfo from 'commons/components/organisms/forms/RegistrationInfo';
import { useGetFormQuery, useUpdateFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useLazyGetAnswerSheetsFileQuery } from 'commons/redux/apis/reporting-service/ReportingServiceSlice';
import downloadBlob from 'commons/utils/downloadBlob';

type RegistrationPropsType = {}

const Registration: FC<RegistrationPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm, isSuccess } = useGetFormQuery({ formSlug: program?.registration_form_slug }, { skip: !Boolean(program) });
  const [form, setForm] = useState(registrationForm)
  const [updateForm, result] = useUpdateFormMutation();
  const [trigger] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = async () => {
    try {
      const blob = await trigger({ formId: parseInt(program.registration_form) }).unwrap();
      downloadBlob(blob, `answer_sheets_${programSlug}.xlsx`);
    } catch (e) {
      console.error('Export failed', e);
    }
  }

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
          <RegistrationInfo data={form} setData={setForm} />
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
        <PaperEditor paperId={program?.registration_form} />
      </Stack>
    </Stack>
  );
};

export default Registration;