import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { Backdrop, CircularProgress } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const PrivateProgramPageWrapper: React.FC<Props> = ({ children }) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();

  const {
    data: program,
    isLoading: isProgramLoading
  } = useGetProgramQuery({ programSlug });

  const {
    data: receipt,
    isSuccess: isReceiptSuccess,
    isLoading: isReceiptLoading,
  } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );

  useEffect(() => {
    const shouldRedirectToRegistrationForm = isReceiptSuccess && !receipt.is_participating;
    if (shouldRedirectToRegistrationForm) {
      navigate(`/program/${programSlug}/form/`);
    }
  }, [isReceiptSuccess, receipt]);

  if (isProgramLoading || isReceiptLoading) {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const hasAccess = receipt.is_participating;

  return hasAccess ? children : null;
};

export default PrivateProgramPageWrapper;