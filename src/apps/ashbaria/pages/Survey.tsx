import React, { FC, Fragment, useEffect, useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import FormPaper from 'commons/template/Paper/Form';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useParams } from 'react-router-dom';
import { useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FullScreenBackgroundImage from 'commons/components/molecules/FullScreenBackgroundImage';
import { MediaUrls } from '../constants/mediaUrls';
import useLocalNavigate from '../hooks/useLocalNavigate';
import useFinishFSM from 'commons/hooks/fsm/useFinishFSM';
import { FSMProvider } from 'commons/hooks/useFSMContext';
import { ASHBARIA_SURVEY_CORRESPONDING_FSM_ID } from '../constants/game-info';
import { toast } from 'react-toastify';

type PropsType = {}

const SurveyWrapper = () => {
  return (
    <FSMProvider fsmId={ASHBARIA_SURVEY_CORRESPONDING_FSM_ID}>
      <Survey />
    </FSMProvider>
  )
}

const Survey: FC<PropsType> = ({ }) => {
  const [isUserSubmittedForm, setIsUserSubmittedForm] = useState(false);
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const formId = program?.registration_form;
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const [submitForm, { isSuccess, isLoading, isError, error }] = useSubmitFormMutation();
  const [finishFSM, finishFSMResult] = useFinishFSM({ fsmId: ASHBARIA_SURVEY_CORRESPONDING_FSM_ID, navigateAfter: false });

  const submit = () => {
    submitForm({
      formId,
      answers,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      finishFSM();
    }
    if (isError) {
      if ((error as any).status === 403) {
        toast.error('قبل‌تر نظرسنجی رو پر کردی')
      }
    }
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setIsUserSubmittedForm(true);
    }
  }, [isLoading])

  return (
    <Fragment>
      <FullScreenBackgroundImage image={MediaUrls.BEACH}>
        <Stack
          padding={2}
          maxWidth={'md'}
          component={Paper}
          width={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Typography variant="h2">{'نظرسنجی'}</Typography>

          {isUserSubmittedForm ?
            <Fragment>
              <Typography
                sx={{ padding: 2, marginTop: 2 }}
                textAlign={'center'}
                fontWeight={700}
                fontSize={18}
              >
                {'پاسخت با موفقیت ثبت شد و ۲۶۰ امتیاز گرفتی😊'}
              </Typography>
              <Button variant='contained' size='large' onClick={() => localNavigate('/menu/')}>
                {'بازگشت به صفحه اول'}
              </Button>
            </Fragment>
            :
            <Fragment>
              <Stack width={'100%'} padding={2} spacing={2}>
                <FormPaper mode='form' paperId={formId} getAnswerCollector={getAnswerCollector} />
              </Stack>
              <Button disabled={isLoading} size='large' variant='contained' onClick={submit} sx={{ alignSelf: 'end', marginTop: 2 }}>
                <Typography fontWeight={700} fontSize={18}>
                  {'ثبت'}
                </Typography>
              </Button>
            </Fragment>
          }
        </Stack>
      </FullScreenBackgroundImage>
    </Fragment>
  );

};

export default SurveyWrapper;