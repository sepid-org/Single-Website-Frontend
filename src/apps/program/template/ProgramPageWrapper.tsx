import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';
import { Backdrop, CircularProgress } from '@mui/material';

type ProgramPageWrapperPropsType = {
  children: React.ReactNode;
};

const ProgramPageWrapper: FC<ProgramPageWrapperPropsType> = ({ children }) => {
  const { isAuthenticated } = useUserAuthentication();
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: program, isLoading: isProgramLoading } = useGetProgramQuery({ programSlug });
  const {
    data: registrationReceipt,
    isSuccess: isRegistrationSuccess,
    isFetching: isRegistrationFetching,
  } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    {
      skip: !program?.registration_form || program?.is_public || !isAuthenticated,
    }
  );

  useEffect(() => {
    if (isRegistrationSuccess && !isRegistrationFetching && !registrationReceipt?.is_participating) {
      navigate(`/program/${programSlug}/form/`, { state: { from: location } });
    }
  }, [isRegistrationSuccess, isRegistrationFetching, registrationReceipt, navigate, programSlug, location]);

  useEffect(() => {
    if (program && !program.is_public && !isAuthenticated) {
      navigate('/login/', { state: { from: location } });
    }
  }, [program, isAuthenticated, navigate, location]);

  if (isProgramLoading || isRegistrationFetching) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (program?.is_public || registrationReceipt?.is_participating) {
    return <>{children}</>;
  }

  return null;
};

export default ProgramPageWrapper;