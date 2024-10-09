import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWebsiteQuery } from 'apps/website-display/redux/features/WebsiteSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import useUserAuthentication from 'commons/hooks/useUserAuthentication';

type ProgramPageWrapperPropsType = {
  children: any;
}

const ProgramPageWrapper: FC<ProgramPageWrapperPropsType> = ({
  children,
}) => {
  const { isAuthenticated } = useUserAuthentication();
  const { programSlug } = useParams();
  const navigate = useNavigate();
  const { data: program } = useGetProgramQuery({ programSlug });
  const {
    data: registrationReceipt,
    isSuccess: isGettingRegistrationReceiptSuccess,
    isFetching: isGettingRegistrationReceiptFetching,
  } = useGetMyReceiptQuery(
    {
      formId: program?.registration_form
    },
    {
      skip: !Boolean(program?.registration_form) || !program || program?.is_public || !isAuthenticated,
    }
  );

  useEffect(() => {
    if (isGettingRegistrationReceiptSuccess) {
      if (!isGettingRegistrationReceiptFetching && !registrationReceipt?.is_participating) {
        navigate(`/program/${programSlug}/form/`);
      }
    }
  }, [registrationReceipt])

  useEffect(() => {
    if (program && !program?.is_public && !isAuthenticated) {
      navigate('/login/');
    }
  }, [program, isAuthenticated, navigate]);

  if (program?.is_public) {
    return children
  }

  if (!registrationReceipt?.is_participating) {
    return null;
  }

  if (!program) {
    return (
      <>loading...</>
    );
  }

  return children;
}

export default ProgramPageWrapper;