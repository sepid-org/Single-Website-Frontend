import React, { FC, Fragment, useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import { useGetProgramProfileQuery, useUpdateProgramProfileMutation, } from "apps/ashbaria/redux/slices/Profile";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";

import PersonIcon from "commons/components/atoms/icons/Person";
import ScoreAnnouncement from "commons/components/atoms/icons/ScoreAnnouncement";

import useUserProfile from "commons/hooks/useUserProfile";
import AreYouSure from "commons/components/organisms/dialogs/AreYouSure";
import DateInputField from "commons/components/molecules/profile-inputs/DateInputField";
import PhoneNumberInput from "commons/components/molecules/profile-inputs/PhoneNumberInput";
import ProvinceSelector from "commons/components/molecules/profile-inputs/ProvinceSelector";
import CitySelector from "commons/components/molecules/profile-inputs/CitySelector";
import GenderSelector from "commons/components/molecules/profile-inputs/GenderSelector";
import FirstNameField from "commons/components/molecules/profile-inputs/FirstNameField";
import LastNameField from "commons/components/molecules/profile-inputs/LastNameField";
import NationalCodeField from "commons/components/molecules/profile-inputs/NationalCodeField";
import PostalCodeField from "commons/components/molecules/profile-inputs/PostalCodeField";
import AddressField from "commons/components/molecules/profile-inputs/AddressInput";
import useUserProfileFormValidator from "commons/hooks/useUserProfileFormValidator";
import useLocalNavigate from "apps/parvande-zamingir/hooks/useLocalNavigate";
import { useFSMContext } from "commons/hooks/useFSMContext";
import IntroductionSelector from "../molecules/fields/IntroductionSelector";
import AvatarSelector from "../molecules/fields/AvatarSelector";
import { ProgramProfileType } from "apps/program/types/profile";
import ScoreChip from "../molecules/Score";

type PropsType = {}

const Profile: FC<PropsType> = ({ }) => {
  const { openDialog, closeDialog } = useFSMContext();
  const localNavigate = useLocalNavigate();
  const [updateProgramProfile, updateProgramProfileResult] = useUpdateProgramProfileMutation();
  const { data: initialProgramProfile } = useGetProgramProfileQuery();
  const [programProfile, setProgramProfile] = useState<ProgramProfileType>(null);
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);
  const { data: platformProfile } = useUserProfile();
  const {
    fieldValidationStatus,
    setFieldValidationStatus,
    displayEmptyErrorMessages,
    setDisplayEmptyErrorMessages,
    handleValidationChange,
    allFieldsValid,
  } = useUserProfileFormValidator(['first_name', 'last_name', 'national_code', 'birth_date', 'gender', 'referral_method', 'province', 'city', 'school', 'postal_code', 'address', 'profile_image'])

  useEffect(() => {
    if (platformProfile) {
      setProgramProfile(prevProfile => ({
        ...prevProfile,
        phone_number: platformProfile.phone_number,
      }))
    }
  }, [platformProfile])

  useEffect(() => {
    if (initialProgramProfile) {
      setProgramProfile({
        ...initialProgramProfile,
        phone_number: initialProgramProfile.phone_number || platformProfile?.phone_number
      });
      setFieldValidationStatus({
        first_name: initialProgramProfile?.first_name ? true : false,
        last_name: initialProgramProfile?.last_name ? true : false,
        national_code: initialProgramProfile?.national_code ? true : false,
        birth_date: initialProgramProfile?.birth_date ? true : false,
        postal_code: initialProgramProfile?.postal_code ? true : false,
        address: initialProgramProfile?.address ? true : false,
        province: initialProgramProfile?.province ? true : false,
        city: initialProgramProfile?.city ? true : false,
        referral_method: initialProgramProfile?.referral_method ? true : false,
        gender: initialProgramProfile?.gender ? true : false,
        profile_image: initialProgramProfile?.profile_image ? true : false,
      });
    }
  }, [initialProgramProfile]);

  useEffect(() => {
    if (updateProgramProfileResult?.data?.reward_granted) {
      openDialog(
        <CustomDialogContent
          image={<ScoreAnnouncement />}
          title={`تبریک! با تکمیل نمایه ۱۵۰ سکه به شما اضافه شد.`}
          onClick={() => {
            closeDialog();
          }}
        />
      )
    } else if (updateProgramProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت به‌روز شد');
    } else if (updateProgramProfileResult?.isError) {
      toast.error('مشکلی در به‌روز‌رسانی نمایه وجود داشت');
    }
  }, [updateProgramProfileResult.isSuccess]);

  const handleChange = (event) => {
    setProgramProfile({
      ...programProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  const handleGenderChange = (selectedGender) => {
    setProgramProfile({
      ...programProfile,
      gender: selectedGender,
    })
  }

  const handleProfileImgChange = (selectedImg) => {
    setProgramProfile({
      ...programProfile,
      profile_image: selectedImg,
    });
  }

  const handleSubmit = () => {
    if (allFieldsValid) {
      setIsSubmitConfirmationOpen(true)
    } else {
      for (const property in fieldValidationStatus) {
        if (!fieldValidationStatus[property] && !programProfile[property]) {
          setDisplayEmptyErrorMessages((prevState) => ({ ...prevState, [property]: true }));
        }
      }
      toast.error("لطفا اول موارد خواسته شده رو تکمیل کن.");
    }
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction={'row'} mb={2}>
            <PersonIcon />
            <Typography variant="h6" fontSize={24} fontWeight={700}>
              {'نمایه من'}
            </Typography>
          </Stack>
          <Box position={'absolute'} right={0} top={0}>
            {!programProfile?.has_received_reward && <ScoreChip value={150} />}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            نام
          </Typography>
          <FirstNameField
            value={programProfile?.first_name}
            onChange={handleChange}
            onValidationChange={(isValid) => handleValidationChange('first_name', isValid)}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['first_name']}
            placeholder="نام خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              paddingBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            نام خانوادگی
          </Typography>
          <LastNameField
            onValidationChange={(isValid) => handleValidationChange('last_name', isValid)}
            onChange={handleChange}
            value={programProfile?.last_name}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['last_name']}
            placeholder="نام خانوادگی خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={6}>
          <Typography fontWeight={400} fontSize={14}
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            کد ملی
          </Typography>
          <NationalCodeField
            onChange={handleChange}
            value={programProfile?.national_code}
            onValidationChange={(isValid) => handleValidationChange('national_code', isValid)}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['national_code']}
            placeholder="کد ملی خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            تاریخ تولد
          </Typography>
          <DateInputField
            isRequired={true}
            date={programProfile?.birth_date}
            setDate={(value) => setProgramProfile({ ...programProfile, birth_date: value })}
            handleValidationChange={(isValid) => handleValidationChange('birth_date', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['birth_date']}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            جنسیت
          </Typography>
          <GenderSelector
            handleValidationChange={(isValid) => handleValidationChange('gender', isValid)}
            gender={programProfile?.gender}
            handleChange={handleGenderChange}
            maleGender="M"
            femaleGender="F"
            displayEmptyErrorMessage={displayEmptyErrorMessages['gender']}
          />
        </Grid>
        <Grid item xs={6}>
          <IntroductionSelector
            handleChange={handleChange}
            referral_method={programProfile?.referral_method}
            isRequired={true}
            onValidationChange={(isValid) => handleValidationChange('referral_method', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['referral_method']}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            استان
          </Typography>
          <ProvinceSelector
            isRequired={true}
            data={programProfile}
            setData={setProgramProfile}
            onValidationChange={(isValid) => handleValidationChange('province', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['province']}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            شهر
          </Typography>
          <CitySelector
            isRequired={true}
            data={programProfile}
            setData={setProgramProfile}
            onValidationChange={(isValid) => handleValidationChange('city', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['city']}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              paddingBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            مدرسه
          </Typography>
          <TextField
            fullWidth
            onChange={handleChange}
            value={programProfile?.school || ''}
            name="school"
            placeholder="نام مدرسه خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            تلفن
          </Typography>
          <PhoneNumberInput
            setPhoneNumber={handleChange}
            phoneNumber={programProfile?.phone_number || ''}
            label={undefined}
            editable={true}
            placeHolder={"شماره تلفن خود را وارد کنید."}
            isRequired={true}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            کد پستی
          </Typography>
          <PostalCodeField
            isRequired={true}
            onChange={handleChange}
            value={programProfile?.postal_code}
            onValidationChange={(isValid) => handleValidationChange('postal_code', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['postal_code']}
            placeholder="کد پستی خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fontWeight: 400,
            }}
          >
            آدرس
          </Typography>
          <AddressField
            onChange={handleChange}
            value={programProfile?.address}
            isRequired={true}
            onValidationChange={(isValid) => handleValidationChange('address', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['address']}
            placeholder="آدرس خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={12}>
          <AvatarSelector
            profileImage={programProfile?.profile_image}
            onChange={handleProfileImgChange}
            onValidationChange={(isValid) => handleValidationChange('profile_image', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['profile_image']}
          />
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => localNavigate('/')} size="large" fullWidth={true} variant='outlined'>
            {'ولش کن'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleSubmit}
            disabled={Object.values(programProfile ?? {}).some(value => value === '' || value === null)}
            size="large"
            fullWidth={true}
            variant='contained'
          >
            {'همینو ذخیره کن'}
          </Button>
        </Grid>
      </Grid>
      <AreYouSure
        text='آیا از صحیح بودن اطلاعات مطمئنی؟ جوایز تنها به کاراگاه‌هایی تعلق می‌گیرد که نمایه‌شان را با اطلاعات صحیح تکمیل کرده باشند.'
        open={isSubmitConfirmationOpen}
        handleClose={() => setIsSubmitConfirmationOpen(false)}
        callBackFunction={() => updateProgramProfile(programProfile)}
      />
    </Fragment>
  );
}

export default Profile;