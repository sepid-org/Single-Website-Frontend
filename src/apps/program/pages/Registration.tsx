import { Stack, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'commons/components/organisms/Stepper';
import Layout from 'commons/template/Layout';
import useRegistrationSteps from 'commons/hooks/useRegistrationSteps';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';

type PropsType = {}

const Registration: FC<PropsType> = ({ }) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program, isLoading: isGetProgramLoading } = useGetProgramQuery({ programSlug });
  const { data: registrationReceipt, isLoading: isRegistrationReceiptLoading } = useGetMyReceiptQuery({ formId: program?.registration_form }, { skip: !Boolean(program?.registration_form) });

  const {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  } = useRegistrationSteps();

  useEffect(() => {
    if (registrationReceipt?.is_participating) {
      navigate(`/program/${programSlug}/`);
    }
  }, [registrationReceipt]);

  if (isGetProgramLoading || isRegistrationReceiptLoading) {
    return;
  }

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid container spacing={2}
        alignItems={{ xs: 'center', md: 'start' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item xs={12} md={3} position={{ xs: null, md: 'sticky' }} top={0}>
          <Stepper steps={steps} activeStepIndex={lastActiveStepIndex} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack>
            {steps[currentStepNameIndex]?.component}
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
};

export default Registration;