import { Button, Paper as MUIPaper, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';
import ProgramInfo from 'commons/components/organisms/ProgramInfo';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import Paper from './Paper';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';
import { useSubmitRegistrationFormMutation } from 'apps/website-display/redux/features/form/RegistrationFormSlice';

type RegistrationFormPropsType = {
  onSuccess?: any;
  onFailure?: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  onSuccess,
  onFailure,
}) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm } = useGetFormQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const { data: registrationReceipt } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });
  const [submitRegistrationForm, submitRegistrationFormResult] = useSubmitRegistrationFormMutation();

  const submit = () => {
    submitRegistrationForm({
      formId: registrationForm.id,
      answers,
    });
  };

  useEffect(() => {
    if (submitRegistrationFormResult?.isSuccess) {
      toast.success('فرم ثبت‌نام با موفقیت تکمیل شد.')
      onSuccess?.();
    }
    if (submitRegistrationFormResult?.isError) {
      onFailure?.();
    }
  }, [submitRegistrationFormResult])

  useEffect(() => {
    // todo: when registration form is editable, this "if" should be removed
    if (registrationReceipt?.is_participating) {
      navigate(`/program/${programSlug}/`);
    }
  }, [registrationReceipt])

  if (!program || !registrationForm) return null;

  return (
    <Stack spacing={2}>
      <ProgramInfo program={program} />
      <Stack width={'100%'} component={MUIPaper} padding={2} spacing={2}>
        <Paper
          mode='form'
          paperId={registrationForm.id}
          answers={answers}
          getAnswerCollector={getAnswerCollector}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogStatus(true)}
        >
          {'ثبت‌نام'}
        </Button>
      </Stack >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => {
          setDialogStatus(!isDialogOpen);
        }}
        callBackFunction={submit}
      />
    </Stack>
  );
};

export default RegistrationForm;