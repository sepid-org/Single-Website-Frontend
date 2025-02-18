import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RegistrationStepType } from 'commons/types/global';
import { useGetMyReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

import RegistrationForm from 'apps/program/template/RegistrationForm';
import RegistrationStatus from 'apps/program/template/RegistrationStatus';
import Payment from 'apps/program/template/Payment';
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

  const [steps, setSteps] = useState<RegistrationStepType[]>([]);
  const [stepIndexes, setStepIndexes] = useState({
    currentStepIndex: 0,
    lastActiveStepIndex: 0,
  });

  const getStepNavigationHandlers = () => {
    const goToStep = (destinationStepIndex: number) => {
      setStepIndexes(indexes => {
        return {
          currentStepIndex: destinationStepIndex,
          lastActiveStepIndex: destinationStepIndex > indexes.lastActiveStepIndex ? destinationStepIndex : indexes.lastActiveStepIndex,
        }
      });
    };

    const goToNextStep = () => {
      setStepIndexes(indexes => {
        const destinationStepIndex = indexes.currentStepIndex + 1;
        return {
          currentStepIndex: destinationStepIndex,
          lastActiveStepIndex: destinationStepIndex > indexes.lastActiveStepIndex ? destinationStepIndex : indexes.lastActiveStepIndex,
        }
      });
    };

    const getCurrentStepIndex = () => {
      return stepIndexes.currentStepIndex;
    };

    return {
      goToStep,
      goToNextStep,
      getCurrentStepIndex,
    };
  };

  const buildRegistrationSteps = (
    form: any,
    programDetails: any,
    { goToStep, goToNextStep }: ReturnType<typeof getStepNavigationHandlers>
  ): RegistrationStepType[] => {
    const steps: RegistrationStepType[] = [
      {
        name: 'login | registration',
        label: 'ورود | ثبت‌نام',
        component: <LoginOrRegistration onSuccessfulSubmission={goToNextStep} />,
        disabled: true,
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
    { goToStep, getCurrentStepIndex }: ReturnType<typeof getStepNavigationHandlers>,
    { program, registrationReceipt: receipt, isAuthenticated }: {
      program: any,
      registrationReceipt: any,
      isAuthenticated: boolean
    }
  ) => {
    const receiptStatus = receipt?.status;

    // put conditions in reverse order

    if (!program.is_free && receiptStatus === 'Accepted') {
      if (getCurrentStepIndex() < steps.findIndex(step => step.name === 'payment')) {
        goToStep(steps.findIndex(step => step.name === 'payment'));
      }
      return;
    }

    if (['Waiting', 'Rejected'].includes(receiptStatus)) {
      if (getCurrentStepIndex() < steps.findIndex(step => step.name === 'status')) {
        goToStep(steps.findIndex(step => step.name === 'status'));
      }
      return;
    }

    if (isAuthenticated) {
      if (getCurrentStepIndex() < steps.findIndex(step => step.name === 'user-setting')) {
        goToStep(steps.findIndex(step => step.name === 'user-setting'));
      }
      return;
    }
  };

  useEffect(() => {
    if (!program || !registrationForm) return;
    const navigationHandlers = getStepNavigationHandlers();
    const steps = buildRegistrationSteps(registrationForm, program, navigationHandlers);
    determineInitialStep(
      steps,
      navigationHandlers,
      {
        program,
        registrationReceipt,
        isAuthenticated
      }
    );
    setSteps(steps);
  }, [program, registrationForm, registrationReceipt, isAuthenticated]);

  return {
    ...stepIndexes,
    steps,
  };
};

export default useRegistrationSteps;