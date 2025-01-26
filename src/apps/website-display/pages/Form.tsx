import React, { FC, Fragment, useEffect, useState } from 'react';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import FormPaper from 'commons/template/Paper/Form';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useParams } from 'react-router-dom';
import { useGetFormQuery, useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import FullScreenBackgroundImage from 'commons/components/molecules/FullScreenBackgroundImage';
import ReplayIcon from '@mui/icons-material/Replay';

type PropsType = {}

const Form: FC<PropsType> = ({ }) => {
  const { formId } = useParams();
  const [isUserSubmittedForm, setIsUserSubmittedForm] = useState(false);
  const { answers, getAnswerCollector, reset } = useCollectWidgetsAnswers([]);
  const [submitForm, { isSuccess, isLoading }] = useSubmitFormMutation();
  const { data: form } = useGetFormQuery({ formId });

  const submit = () => {
    submitForm({
      formId,
      answers,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsUserSubmittedForm(true);
    }
  }, [isLoading])

  const refresh = () => {
    setIsUserSubmittedForm(false);
    reset();
  }

  if (!form) {
    return;
  }

  return (
    <Fragment>
      <FullScreenBackgroundImage image={form.background_image}>
        <Container maxWidth='md'
          sx={{
            display: 'flex',
            paddingTop: 4,
            paddingBottom: 2,
            justifyContent: 'center',
            marginRight: 'auto !important',
            marginLeft: 'auto !important',
          }}>
          <Stack width={'100%'}>
            <Stack spacing={1} sx={{ userSelect: 'none' }} alignItems={'center'}>
              <Typography variant="h2">{form.title}</Typography>
            </Stack>

            {isUserSubmittedForm ?
              <Stack alignItems={'center'} spacing={2} component={Paper} sx={{ padding: 2, marginTop: 4 }}>
                <Typography textAlign={'center'} fontWeight={700} fontSize={18}>
                  {'پاسخ‌هایت با موفقیت ثبت شدند.'}
                </Typography>
                <Button startIcon={<ReplayIcon />} variant='contained' onClick={refresh}>
                  {'ثبت مجدد فرم'}
                </Button>
              </Stack>
              :
              <Fragment>
                <Stack component={Paper} sx={{ padding: 2, marginTop: 4 }} spacing={2}>
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
        </Container>
      </FullScreenBackgroundImage>
    </Fragment>
  );

};

export default Form;