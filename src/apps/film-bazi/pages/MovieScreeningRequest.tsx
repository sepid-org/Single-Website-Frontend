import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import FormPaper from 'commons/template/Paper/Form';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { toast } from 'react-toastify';
import useLocalNavigate from '../hooks/useLocalNavigate';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type MovieScreeningRequestPropsType = {}

const MovieScreeningRequest: FC<MovieScreeningRequestPropsType> = ({ }) => {
  const [isUserSubmittedForm, setIsUserSubmittedForm] = useState(false);
  const localNavigate = useLocalNavigate();
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const formId = program.registration_form;
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const [submitRegistrationForm, submitRegistrationFormResult] = useSubmitFormMutation();

  const submit = () => {
    setIsUserSubmittedForm(true);
    // submitRegistrationForm({
    //   answer_sheet_type: 'RegistrationReceipt',
    //   formId,
    //   answers,
    // });
  };

  useEffect(() => {
    if (submitRegistrationFormResult?.isSuccess) {
      toast.success('فرم با موفقیت تکمیل شد.')
    }
    if (submitRegistrationFormResult?.isError) {

    }
  }, [submitRegistrationFormResult])

  return (
    <Fragment>
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
            <Box
              component="img"
              src={program.cover_page}
              alt="program-cover-page"
              width={200}
              sx={{ borderRadius: 1, cursor: 'pointer' }}
              onClick={() => window.open('http://filmbazi.ir/')}
            />
            <Typography variant="h2">{'درخواست اکران فیلم'}</Typography>
          </Stack>

          {isUserSubmittedForm ?
            <Paper sx={{ padding: 2, marginTop: 4 }}>
              <Typography textAlign={'center'} fontWeight={700} fontSize={18}>
                {'درخواست شما با موفقیت ثبت شد. پس از بررسی اطلاعات با شما تماس خواهیم گرفت😊'}
              </Typography>
            </Paper>
            :
            <Fragment>
              <Stack component={Paper} sx={{ padding: 2, marginTop: 4 }} spacing={2}>
                <FormPaper mode='form' paperId={formId} getAnswerCollector={getAnswerCollector} />
              </Stack>
              <Button size='large' variant='contained' onClick={submit} sx={{ alignSelf: 'end', marginTop: 2 }}>
                <Typography fontWeight={700} fontSize={18}>
                  {'ثبت درخواست'}
                </Typography>
              </Button>
            </Fragment>
          }
        </Stack>
      </Container>
    </Fragment>
  );

};

export default MovieScreeningRequest;