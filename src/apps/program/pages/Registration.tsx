import { Stack, Grid } from '@mui/material';
import React, { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Layout from 'commons/template/Layout';
import MyStepper from 'commons/components/organisms/MyStepper';
import useRegistrationSteps from 'apps/program/hooks/useRegistrationSteps';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';

import { skipToken } from '@reduxjs/toolkit/query';

type PropsType = {};

const Registration: FC<PropsType> = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { isUserAuthenticated } = useUserAuthentication();

  const {
    data: registrationReceipt,
    error: getMyReceiptError,
  } = useGetMyReceiptQuery(
    !program?.registration_form || !isUserAuthenticated
      ? skipToken
      : { formId: program!.registration_form }
  );

  const { currentStepIndex, lastActiveStepIndex, steps } = useRegistrationSteps();

  if (program?.is_public || registrationReceipt?.is_participating) {
    return <Navigate to={`/program/${programSlug}/`} replace />;
  }

  const shouldShowRegistrationSteps =
    !isUserAuthenticated || getMyReceiptError || registrationReceipt?.is_participating === false;

  if (shouldShowRegistrationSteps) {
    return (
      <Layout appbarMode='PROGRAM'>
        <Grid container spacing={2} alignItems={{ xs: 'center', md: 'start' }}>
          <Grid item xs={12} md={3} position={{ xs: 'static', md: 'sticky' }} top={0}>
            <MyStepper steps={steps} activeStepIndex={lastActiveStepIndex} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Stack>{steps[currentStepIndex]?.component}</Stack>
          </Grid>
        </Grid>
      </Layout>
    );
  }
};

export default Registration;