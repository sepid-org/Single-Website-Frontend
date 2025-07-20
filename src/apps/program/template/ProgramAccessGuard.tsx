import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import TransparentBackdrop from 'commons/components/molecules/TransparentBackdrop';

interface Props {
  children: React.ReactNode;
}

const ProgramAccessGuard: React.FC<Props> = ({ children }) => {
  const { programSlug } = useParams();

  const {
    data: program,
    isLoading: isProgramLoading,
  } = useGetProgramQuery({ programSlug });

  const skipReceipt =
    !program ||                       // هنوز برنامه نیامده
    program.is_public ||              // برنامه عمومی است
    !program.registration_form;       // اصلاً فرم ثبت‌نام ندارد

  const {
    data: receipt,
    isLoading: isReceiptLoading,
  } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: skipReceipt }
  );

  if (program?.is_public || receipt?.is_participating) return children;

  if (isProgramLoading || (!skipReceipt && isReceiptLoading))
    return <TransparentBackdrop open />;

  if (!program?.is_public && !receipt?.is_participating)
    return <Navigate to={`/program/${programSlug}/registration/`} replace />;

  return null;
};

export default ProgramAccessGuard;