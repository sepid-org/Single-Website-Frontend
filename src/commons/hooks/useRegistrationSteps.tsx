import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RegistrationStepNameType, RegistrationStepType } from 'commons/types/global';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

import RegistrationForm from 'commons/template/RegistrationForm';
import RegistrationStatus from 'commons/template/RegistrationStatus';
import Payment from 'commons/template/Payment';
import UserSetting from 'commons/template/Setting/UserSetting';
import SchoolSetting from 'commons/template/Setting/SchoolSetting';
import UniversitySetting from 'commons/template/Setting/UniversitySetting';
import useUserAuthentication from './useUserAuthentication';
import LoginOrRegistration from 'apps/program/template/LoginOrRegistration';

const useRegistrationSteps = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: registrationForm } = useGetFormQuery(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );
  const { data: registrationReceipt } = useGetMyReceiptQuery(
    { formId: program?.registration_form },
    { skip: !Boolean(program?.registration_form) }
  );
  const { isAuthenticated } = useUserAuthentication();

  const [currentStepNameIndex, setCurrentStepIndex] = useState<number>(0);
  const [lastActiveStepIndex, setLastActiveIndex] = useState<number>(0);
  const [steps, setSteps] = useState<RegistrationStepType[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!program || !registrationForm) return;

    const getStepIndex = (stepName: RegistrationStepNameType): number => {
      return _steps.findIndex(step => step.name === stepName);
    };

    const goToStep = (destinationStepIndex: number) => {
      setCurrentStepIndex(destinationStepIndex);
      if (destinationStepIndex > lastActiveStepIndex) {
        setLastActiveIndex(destinationStepIndex);
      }
    };

    const goToNextStep = () => {
      goToStep(currentStepNameIndex + 1);
    };

    const _steps: RegistrationStepType[] = [];

    _steps.push({
      name: 'login | registration',
      label: 'ورود | ثبت‌نام',
      component: <LoginOrRegistration onSuccessfulSubmission={goToNextStep} />,
      onClick: () => { },
    })

    _steps.push({
      name: 'user-setting',
      label: 'تکمیل اطلاعات شخصی',
      component: <UserSetting isInForm={true} onSuccessfulSubmission={goToNextStep} />,
      onClick: () => goToStep(getStepIndex('user-setting')),
    });

    if (registrationForm.audience_type === 'Student') {
      _steps.push({
        name: 'school-setting',
        label: 'تکمیل اطلاعات دانش‌آموزی',
        component: <SchoolSetting isInForm={true} onSuccessfulSubmission={goToNextStep} />,
        onClick: () => goToStep(getStepIndex('school-setting'))
      });
    }

    if (registrationForm.audience_type === 'Academic') {
      _steps.push({
        name: 'university-setting',
        label: 'تکمیل اطلاعات دانشجویی',
        component: <UniversitySetting onSuccessfulSubmission={goToNextStep} />,
        onClick: () => goToStep(getStepIndex('university-setting'))
      });
    }

    _steps.push({
      name: 'form',
      label: 'ثبت‌نام در دوره',
      disabled: true,
      component: <RegistrationForm onSuccess={goToNextStep} />,
      onClick: () => { },
    });

    if (registrationForm.accepting_status === 'Manual') {
      _steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <RegistrationStatus />,
        onClick: () => goToStep(getStepIndex('status')),
      });
    }

    if (!program.is_free) {
      _steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />,
        onClick: () => goToStep(getStepIndex('payment')),
      });
    }

    _steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    });

    if (isAuthenticated) {
      goToStep(getStepIndex('user-setting'));
    }

    if (isFirstRender) {
      if (registrationReceipt) {
        const receiptStatus = registrationReceipt.status;
        if (['Waiting', 'Rejected'].includes(receiptStatus)) {
          goToStep(getStepIndex('status'));
        }
        if (!program.is_free && receiptStatus === 'Accepted') {
          goToStep(getStepIndex('payment'));
        }
      }
      setIsFirstRender(false);
    }

    setSteps(_steps);
  }, [program, registrationForm, currentStepNameIndex, lastActiveStepIndex, registrationReceipt, isAuthenticated]);

  return {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  };
};

export default useRegistrationSteps;