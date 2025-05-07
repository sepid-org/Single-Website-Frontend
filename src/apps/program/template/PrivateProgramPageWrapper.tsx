import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import TransparentBackdrop from 'commons/components/molecules/TransparentLoadingBackdrop';

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
    isError: isReceiptError,
    isSuccess: isReceiptSuccess,
    isLoading: isReceiptLoading,
  } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );

  useEffect(() => {
    const shouldRedirectToRegistrationForm = isReceiptError || (isReceiptSuccess && !receipt.is_participating);
    if (shouldRedirectToRegistrationForm) {
      navigate(`/program/${programSlug}/registration/`);
    }
  }, [isReceiptError, isReceiptSuccess, receipt]);

  if (isProgramLoading || isReceiptLoading) {
    return (
      <TransparentBackdrop open />
    );
  }

  const hasAccess = receipt?.is_participating;

  return hasAccess ? children : null;
};

export default PrivateProgramPageWrapper;