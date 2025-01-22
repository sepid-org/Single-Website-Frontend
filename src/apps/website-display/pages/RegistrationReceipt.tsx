import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';
import { faSeri } from 'commons/utils/translateNumber';
import Layout from 'commons/template/Layout';
import { toast } from 'react-toastify';
import { useGetReceiptQuery } from 'apps/website-display/redux/features/form/ReceiptSlice';
import AnswerSheet from 'commons/template/AnswerSheet';
import getInstituteFullName from 'commons/utils/getInstituteFullName';
import convertToPersianDate from 'commons/utils/convertToPersianDate';
import { stringToColor } from 'commons/utils/stringToColor';
import { useValidateRegistrationReceiptMutation } from '../redux/features/program/Registration';
import { RegistrationReceiptTypes } from 'commons/types/models';

type RegistrationReceiptPropsType = {}

const RegistrationReceipt: FC<RegistrationReceiptPropsType> = ({
}) => {
  const t = useTranslate();
  const { receiptId } = useParams();
  const [status, setStatus] = useState<RegistrationReceiptTypes>(null);
  const { data: registrationReceipt } = useGetReceiptQuery({ receiptId });
  const [validateRegistrationReceipt, validateRegistrationResult] = useValidateRegistrationReceiptMutation({})

  useEffect(() => {
    if (registrationReceipt?.status) {
      setStatus(registrationReceipt.status);
    }
  }, [registrationReceipt])

  useEffect(() => {
    if (validateRegistrationResult.isSuccess) {
      toast.success('وضعیت رسید ثبت‌نام با موفقیت ثبت شد.')
    }
  }, [validateRegistrationResult])

  const userInfo = registrationReceipt?.user;
  const answers = registrationReceipt?.answers;

  const handleButtonClick = () => {
    if (!status) {
      toast.error('لطفاً وضعیت ثبت‌نام را تعیین کن!');
      return;
    }
    validateRegistrationReceipt({ receiptId: parseInt(receiptId), status });
  }

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={2} alignItems='flex-start'>
        <Grid xs={12} sm={8} container item>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            <AnswerSheet answerSheetId={receiptId} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            {userInfo &&
              <Fragment>
                <Stack alignItems={"center"} direction='row' spacing={1}>
                  <Avatar
                    src={userInfo.profile_image}
                    sx={{ backgroundColor: stringToColor(userInfo.first_name) }}
                    alt="avatar"
                  />
                  <Typography variant='h3'>
                    {(userInfo.first_name && userInfo.last_name) ? `${userInfo.first_name} ${userInfo.last_name}` : 'بی‌نام'}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography >{`زمان ثبت‌نام: ${registrationReceipt ? convertToPersianDate(registrationReceipt?.created_at) : '?'}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >{`مدرسه: ${getInstituteFullName(registrationReceipt.school_studentship?.school)}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`پایه: ${registrationReceipt.school_studentship?.grade ? faSeri(registrationReceipt.school_studentship?.grade) : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`جنسیت: ${userInfo.gender == 'Male' ? 'پسر' : (userInfo.gender == 'Female' ? 'دختر' : '؟')}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`استان: ${userInfo.province ? userInfo.province : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`شهر: ${userInfo.city ? userInfo.city : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >{`شماره تماس: ${userInfo.phone_number ? userInfo.phone_number : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >{`ایمیل: ${userInfo.email ? userInfo.email : '؟'}`}</Typography>
                  </Grid>
                </Grid>
                {status &&
                  <Fragment>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>وضعیت ثبت‌نام</InputLabel>
                      <Select
                        value={status}
                        // todo: it also should be disabled when registrationForm.accepting_status === AutoAccept
                        disabled={registrationReceipt?.is_participating}
                        onChange={(e) => setStatus(e.target.value as RegistrationReceiptTypes)}
                        name='status'
                        label='وضعیت ثبت‌نام'>
                        <MenuItem value={'Waiting'} >{'منتظر'}</MenuItem>
                        <MenuItem value={'Accepted'} >{'مجاز به پرداخت'}</MenuItem>
                        <MenuItem value={'Rejected'} >{'ردشده'}</MenuItem>
                      </Select>
                    </FormControl >
                    <Box mt={1}>
                      <Button
                        disabled={registrationReceipt?.is_participating}
                        fullWidth variant='contained'
                        onClick={handleButtonClick}
                        color='primary'>
                        {registrationReceipt?.is_participating ? 'ثبت‌نام قطعی است' : 'ثبت'}
                      </Button>
                    </Box>
                  </Fragment>
                }
              </Fragment>
            }
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
}

export default RegistrationReceipt;