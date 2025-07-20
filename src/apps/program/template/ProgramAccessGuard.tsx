import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';

interface Props {
  children: React.ReactNode;
}

const ProgramAccessGuard: React.FC<Props> = ({ children }) => {
  const { programSlug } = useParams();
  const navigate = useNavigate();

  const {
    data: program,
    isLoading: isProgramLoading,
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
    if (!program || program.is_public) return;
    const shouldRedirectToRegistrationForm = isReceiptError || (isReceiptSuccess && !receipt?.is_participating);
    if (shouldRedirectToRegistrationForm) {
      navigate(`/program/${programSlug}/registration/`, { replace: true });
    }
  }, [isReceiptError, isReceiptSuccess, receipt, navigate, programSlug, program]);

  if (program?.is_public || receipt?.is_participating) {
    return children;
  }

  if (isProgramLoading || isReceiptLoading) {
    return <TransparentBackdrop open />;
  }

  return null;
};

export default ProgramAccessGuard;