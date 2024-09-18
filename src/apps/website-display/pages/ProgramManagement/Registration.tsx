import React, { FC, useEffect, useState } from 'react';
import { EditPaper } from 'commons/components/template/Paper';
import { Button, Divider, Stack, Typography } from '@mui/material';
import FormInfo from 'commons/components/organisms/forms/FormInfo';
import { useGetFormQuery, useUpdateFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import { useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type RegistrationPropsType = {}

const Registration: FC<RegistrationPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm, isSuccess } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program) });
  const [form, setForm] = useState(registrationForm)
  const [updateForm, result] = useUpdateFormMutation();

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