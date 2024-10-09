import {
  Button,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useUpdateUserProfileMutation } from 'apps/website-display/redux/features/party/ProfileSlice';
import { deepEqual } from 'commons/utils/ObjectEqualityChecker';
import UserSettingInfoForm from 'commons/components/organisms/forms/UserSettingInfoForm';
import useUserProfile from 'commons/hooks/useUserProfile';

type UserSettingPropsType = {
  onSuccessfulSubmission?: any;
  isInForm?: boolean;
}

const hasUserCompletedPrimaryInformation = (userInfo) => {
  const { first_name, last_name, birth_date, gender, province, city } = userInfo;
  return first_name && last_name && birth_date && gender && province && city;
}

const UserSetting: FC<UserSettingPropsType> = ({
  onSuccessfulSubmission,
  isInForm,
}) => {
  const [updateUserProfile, updateUserProfileResult] = useUpdateUserProfileMutation();
  const { isFetching, isSuccess, data: initialUserProfile } = useUserProfile();
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      setUserProfile(initialUserProfile);
    }
  }, [isFetching])

  useEffect(() => {
    if (updateUserProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
      onSuccessfulSubmission?.()
    }
  }, [updateUserProfileResult])

  if (!userProfile) return null;

  const submitUserInfo = () => {
    if (!hasUserCompletedPrimaryInformation(userProfile)) {
      toast.error('لطفاً همه‌ی اطلاعات خواسته‌شده را وارد کنید');
      return;
    }

    updateUserProfile({
      userId: userProfile.id,
      ...userProfile,
    });
  }

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h2" gutterBottom>اطلاعات فردی</Typography>
          {!isInForm &&
            <Button
              disabled={deepEqual(initialUserProfile, userProfile)}
              onClick={submitUserInfo}
              variant="contained"
              color="secondary">
              {'به‌روز‌رسانی'}
            </Button>
          }
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <UserSettingInfoForm data={userProfile} setData={setUserProfile} />
      </Grid>
      {isInForm &&
        <Grid item xs={12}>
          <Button
            onClick={submitUserInfo}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      }
    </Grid >
  );
}

export default UserSetting;