
import {
  Button,
  Grid,
  Typography,
  Stack,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import SchoolSettingInfoForm from 'commons/components/organisms/forms/SchoolSettingInfoForm';
import { SchoolType } from 'commons/types/models';
import useUserProfile from 'commons/hooks/useUserProfile';
import { useUpdateSchoolStudentshipMutation } from 'commons/redux/apis/party/ProfileSlice';

type SchoolSettingPropsType = {
  onSuccessfulSubmission?: any;
  isInForm?: boolean;
}

const hasUserCompletedStudentshipInformation = (schoolStudentship) => {
  const { grade, school } = schoolStudentship;
  return grade && school;
}

const SchoolSetting: FC<SchoolSettingPropsType> = ({
  onSuccessfulSubmission,
  isInForm,
}) => {
  const { isFetching, isSuccess, data: userProfile } = useUserProfile();
  const [schoolStudentship, setSchoolStudentship] = useState<{ id: string; school: SchoolType; grade: number; }>(userProfile.school_studentship);
  const [updateSchoolStudentship, updateUserStudentshipResult] = useUpdateSchoolStudentshipMutation();

  useEffect(() => {
    if (!isFetching && isSuccess && userProfile?.school_studentship) {
      setSchoolStudentship(userProfile.school_studentship)
    }
  }, [isFetching])

  useEffect(() => {
    if (updateUserStudentshipResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
      onSuccessfulSubmission?.()
    }
  }, [updateUserStudentshipResult])

  if (!userProfile || !schoolStudentship) return null;

  const submitSchoolStudentship = () => {
    if (!hasUserCompletedStudentshipInformation(schoolStudentship)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }
    updateSchoolStudentship(schoolStudentship);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant="h2" gutterBottom>{'اطلاعات دانش‌آموزی'}</Typography>
          {!isInForm &&
            <Button
              disabled={deepEqual(schoolStudentship, userProfile.school_studentship)}
              onClick={submitSchoolStudentship}
              variant="contained"
              color="secondary">
              {'به‌روز‌رسانی'}
            </Button>
          }
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <SchoolSettingInfoForm data={schoolStudentship} setData={setSchoolStudentship} />
      </Grid>

      {isInForm &&
        <Grid item xs={12}>
          <Button
            onClick={submitSchoolStudentship}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      }
    </Grid>
  );
}

export default SchoolSetting;