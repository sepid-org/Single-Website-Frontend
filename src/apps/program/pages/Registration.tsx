import { Stack, Grid } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MyStepper from 'commons/components/organisms/MyStepper';
import Layout from 'commons/template/Layout';
import useRegistrationSteps from 'apps/program/hooks/useRegistrationSteps';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';

type PropsType = {}

const Registration: FC<PropsType> = () => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { isUserAuthenticated } = useUserAuthentication();
  const { data: registrationReceipt, error: getMyReceiptError } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: !program?.registration_form || !isUserAuthenticated }
  );
  const {
    currentStepIndex,
    lastActiveStepIndex,
    steps,
  } = useRegistrationSteps();

  useEffect(() => {
    if (registrationReceipt?.is_participating === true) {
      navigate(`/program/${programSlug}/`, { replace: true });
    }
  }, [registrationReceipt, programSlug, navigate]);

  if (!isUserAuthenticated || getMyReceiptError || registrationReceipt?.is_participating === false) {
    return (
      <Layout appbarMode='PROGRAM'>
        <Grid
          container
          spacing={2}
          alignItems={{ xs: 'center', md: 'start' }}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
        >
          <Grid
            item
            xs={12}
            md={3}
            position={{ xs: 'static', md: 'sticky' }}
            top={0}
          >
            <MyStepper steps={steps} activeStepIndex={lastActiveStepIndex} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Stack>
              {steps[currentStepIndex]?.component}
            </Stack>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return (
    <TransparentBackdrop open={true} />
  )

};

export default Registration;