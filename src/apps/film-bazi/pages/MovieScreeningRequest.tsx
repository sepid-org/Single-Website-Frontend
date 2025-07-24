import React, { FC, Fragment, useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Skeleton, Stack, Typography } from '@mui/material';
import FormPaper from 'commons/template/Paper/Form';
import useCollectWidgetsAnswers from 'commons/hooks/useCollectWidgetsAnswers';
import { useParams } from 'react-router-dom';
import { useSubmitFormMutation } from 'apps/website-display/redux/features/form/FormSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FullScreenBackgroundImage from 'commons/components/molecules/FullScreenBackgroundImage';
import { MediaUrls } from '../constants/mediaUrls';

type MovieScreeningRequestPropsType = {}

const MovieScreeningRequest: FC<MovieScreeningRequestPropsType> = ({ }) => {
  const [isUserSubmittedForm, setIsUserSubmittedForm] = useState(false);
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { answers, getAnswerCollector } = useCollectWidgetsAnswers([]);
  const [submitForm, { isSuccess, isLoading }] = useSubmitFormMutation();

  const submit = () => {
    submitForm({
      formSlug: program.registration_form_slug,
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
      <FullScreenBackgroundImage image={MediaUrls.MOVIE_SCREENING_REQUEST_BACKGROUND}>
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
              {program?.cover_image ?
                <Box
                  component="img"
                  src={program?.cover_image}
                  alt="program-cover-page"
                  width={200}
                  sx={{ borderRadius: 1, cursor: 'pointer' }}
                  onClick={() => window.open('http://filmbazi.ir/')}
                /> :
                <Skeleton variant='rounded' width={200} height={160} />
              }
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
                <Typography paddingTop={1} textAlign={'center'}>
                  {'برای درخواست اکران فیلم در شهرهای بدون سینما یا در مدرسه، مسجد، دانشگاه و ... اطلاعات زیر رو تکمیل کنید تا درخواست‌تون ثبت بشه. ما خیلی زود برای هماهنگی باهاتون تماس می‌گیریم.'}
                </Typography>
                <Stack component={Paper} sx={{ padding: 2, marginTop: 4 }} spacing={2}>
                  <FormPaper mode='form' paperId={program?.registration_form} getAnswerCollector={getAnswerCollector} />
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