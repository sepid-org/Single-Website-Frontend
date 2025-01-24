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
  const [isInitialStepSat, setIsInitialStepSat] = useState(false);

  const createStepNavigationHandlers = () => {
    const getStepIndex = (stepName: RegistrationStepNameType): number => {
      return steps.findIndex(step => step.name === stepName);
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

    return { getStepIndex, goToStep, goToNextStep };
  };

  const buildRegistrationSteps = (
    form: any,
    programDetails: any,
    { goToStep, goToNextStep }: ReturnType<typeof createStepNavigationHandlers>
  ): RegistrationStepType[] => {
    const steps: RegistrationStepType[] = [
      {
        name: 'login | registration',
        label: 'ورود | ثبت‌نام',
        component: <LoginOrRegistration onSuccessfulSubmission={goToNextStep} />,
        onClick: () => { },
      },
      {
        name: 'user-setting',
        label: 'تکمیل اطلاعات شخصی',
        component: <UserSetting isInForm={true} onSuccessfulSubmission={goToNextStep} />,
        onClick: () => goToStep(steps.findIndex(step => step.name === 'user-setting')),
      }
    ];

    if (form.audience_type === 'Student') {
      steps.push({
        name: 'school-setting',
        label: 'تکمیل اطلاعات دانش‌آموزی',
        component: <SchoolSetting isInForm={true} onSuccessfulSubmission={goToNextStep} />,
        onClick: () => goToStep(steps.findIndex(step => step.name === 'school-setting'))
      });
    }

    if (form.audience_type === 'Academic') {
      steps.push({
        name: 'university-setting',
        label: 'تکمیل اطلاعات دانشجویی',
        component: <UniversitySetting onSuccessfulSubmission={goToNextStep} />,
        onClick: () => goToStep(steps.findIndex(step => step.name === 'university-setting'))
      });
    }

    steps.push({
      name: 'form',
      label: 'ثبت‌نام در دوره',
      disabled: true,
      component: <RegistrationForm onSuccess={goToNextStep} />,
      onClick: () => { },
    });

    if (form.accepting_status === 'Manual') {
      steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <RegistrationStatus />,
        onClick: () => goToStep(steps.findIndex(step => step.name === 'status')),
      });
    }

    if (!programDetails.is_free) {
      steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />,
        onClick: () => goToStep(steps.findIndex(step => step.name === 'payment')),
      });
    }

    steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    });

    return steps;
  };

  const determineInitialStep = (
    steps: RegistrationStepType[],
    { goToStep }: ReturnType<typeof createStepNavigationHandlers>,
    { program, receipt, isAuthenticated }: {
      program: any,
      receipt: any,
      isAuthenticated: boolean
    }
  ) => {
    const receiptStatus = receipt?.status;

    if (isAuthenticated) {
      goToStep(steps.findIndex(step => step.name === 'user-setting'));
      return true;
    }

    if (['Waiting', 'Rejected'].includes(receiptStatus)) {
      goToStep(steps.findIndex(step => step.name === 'status'));
      return true;
    }

    if (!program.is_free && receiptStatus === 'Accepted') {
      goToStep(steps.findIndex(step => step.name === 'payment'));
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (!program || !registrationForm) return;

    const navigationHandlers = createStepNavigationHandlers();
    const _steps = buildRegistrationSteps(registrationForm, program, navigationHandlers);

    if (!isInitialStepSat) {
      const initialStepSet = determineInitialStep(_steps, navigationHandlers, {
        program,
        receipt: registrationReceipt,
        isAuthenticated
      });
      setIsInitialStepSat(initialStepSet);
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