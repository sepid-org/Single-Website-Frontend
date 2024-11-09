import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Skeleton, Stack, Typography } from '@mui/material';
import FormPaper from 'commons/template/Paper/Form';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useNavigate, useParams } from 'react-router-dom';
import { useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import useLocalNavigate from '../hooks/useLocalNavigate';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FullScreenBackgroundImage from 'apps/ashbaria/components/molecules/FullScreenBackgroundImage';
import MovieScreeningRequestSVG from "../assets/movie-screening-request.jpg";

type MovieScreeningRequestPropsType = {}

const MovieScreeningRequest: FC<MovieScreeningRequestPropsType> = ({ }) => {
  const [isUserSubmittedForm, setIsUserSubmittedForm] = useState(false);
  const localNavigate = useLocalNavigate();
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const formId = program?.registration_form;
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const [submitForm, { isSuccess, isLoading }] = useSubmitFormMutation();

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

  return (
    <Fragment>
      <FullScreenBackgroundImage image={MovieScreeningRequestSVG}>
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
              {program?.cover_page ?
                <Box
                  component="img"
                  src={program?.cover_page}
                  alt="program-cover-page"
                  width={200}
                  sx={{ borderRadius: 1, cursor: 'pointer' }}
                  onClick={() => window.open('http://filmbazi.ir/')}
                /> :
                <Skeleton variant='rounded' width={200} height={160} />
              }
              <Typography variant="h2">{'درخواست اکران فیلم'}</Typography>
              <Typography paddingTop={1} textAlign={'center'}>
                {'برای درخواست اکران فیلم در شهرهای بدون سینما یا در مدرسه، مسجد، دانشگاه و ... اطلاعات زیر رو تکمیل کنید تا درخواست‌تون ثبت بشه. ما خیلی زود برای هماهنگی باهاتون تماس می‌گیریم.'}
              </Typography>
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
                <Button disabled={isLoading} size='large' variant='contained' onClick={submit} sx={{ alignSelf: 'end', marginTop: 2 }}>
                  <Typography fontWeight={700} fontSize={18}>
                    {'ثبت درخواست'}
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

export default MovieScreeningRequest;