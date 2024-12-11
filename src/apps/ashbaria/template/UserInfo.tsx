import React, { FC, useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import IntroductionSelector from "../components/molecules/profile-inputs/IntroductionSelector";
import ProfileImageSelector from "../components/molecules/profile-inputs/ProfileImageSelector";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/slices/Profile";
import BackButton from "../components/molecules/buttons/Back";
import PersonIcon from "../components/atoms/icons/Person";
import ScoreChip from "../components/molecules/chips/Score";
import useLocalNavigate from "../hooks/useLocalNavigate";
import { AshbariaProfileType } from "../types";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "commons/components/molecules/CustomDialogContent";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";
import useUserProfile from "commons/hooks/useUserProfile";
import AreYouSure from "commons/components/organisms/dialogs/AreYouSure";
import DateInputField from "commons/components/molecules/fields/Date";
import PhoneNumberInput from "commons/components/molecules/profile-inputs/PhoneNumberInput";
import AddressInput from "commons/components/molecules/profile-inputs/AddressInput";
import { customTheme } from "../styles/Theme";
import ProvinceSelector from "commons/components/molecules/profile-inputs/ProvinceSelector";
import CitySelector from "commons/components/molecules/profile-inputs/CitySelector";
import GenderSelector from "commons/components/molecules/profile-inputs/GenderSelector";
import FirstNameField from "commons/components/molecules/profile-inputs/FirstNameField";
import LastNameField from "commons/components/molecules/profile-inputs/LastNameField";
import NationalCodeField from "commons/components/molecules/profile-inputs/NationalCodeField";
import PostalCodeField from "commons/components/molecules/profile-inputs/PostalCodeField";

type UserSettingPropsType = {}

const UserInfo: FC<UserSettingPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation();
  const { data: initialAshbariaProfile } = useGetProfileQuery();
  const [AshbariaProfile, setAshbariaProfile] = useState<AshbariaProfileType>(null);
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    if (userProfile) {
      setAshbariaProfile(prevProfile => ({
        ...prevProfile,
        phone_number: userProfile.phone_number,
      }))
    }
  }, [userProfile])

  useEffect(() => {
    if (initialAshbariaProfile) {
      setAshbariaProfile(initialAshbariaProfile);
    }
  }, [initialAshbariaProfile]);

  useEffect(() => {
    if (updateProfileResult?.data?.reward_granted) {
      dialogService.open({
        component:
          <CustomDialogContent
            image={<ScoreAnnouncement />}
            title={`تبریک! با تکمیل نمایه ۱۵۰ سکه به شما اضافه شد.`}
            onClick={() => {
              dialogService.close();
              localNavigate('/');
            }}
          />
      })
    } else if (updateProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت به‌روز شد');
    } else if (updateProfileResult?.isError) {
      toast.error('مشکلی در به‌روز‌رسانی نمایه وجود داشت');
    }
  }, [updateProfileResult.isSuccess]);

  const handleChange = (event) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  const [validationStatus, setValidationStatus] = useState({
    firstName: false,
    lastName: false,
    nationalCode: false,
    birthDate: false,
    postalCode: false,
  });

  const handleValidationChange = (field: string, isValid: boolean) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: isValid,
    }));
  };

  const allValid = Object.values(validationStatus).every((status) => status);

  const handleGenderChange = (selectedGender) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      gender: selectedGender,
    })
  }

  const handleProfileImgChange = (selectedImg) => {
    setAshbariaProfile({
      ...AshbariaProfile,
      profile_image: selectedImg,
    });
  }

  const handleSubmit = () => {
    if (checkForBlankFields(AshbariaProfile)) {
      toast.error('لطفاً همه‌ی مشخصات رو کامل کن');
      return;
    }
    if (AshbariaProfile.national_code.length != 10) {
      toast.error('لطفاً یک کد ملی صحیح وارد کن');
      return;
    }
    if (AshbariaProfile.postal_code.length != 10) {
      toast.error('لطفاً یک کد پستی صحیح وارد کن');
      return;
    }
    updateProfile(AshbariaProfile);
  }

  return (
    <Container maxWidth='md' component={Paper} sx={{ position: 'relative', paddingY: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
        >
          <Box position={'absolute'} left={10} top={10}>
            <BackButton />
          </Box>
          <Stack direction={'row'}>
            <PersonIcon />
            <Typography variant="h6" fontSize={24} fontWeight={800}>
              {'نمایه'}
            </Typography>
          </Stack>
          <Box position={'absolute'} right={10} top={10}>
            {AshbariaProfile?.has_received_reward === false && <ScoreChip value={150} />}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            نام
          </Typography>
          <FirstNameField
            value={AshbariaProfile?.first_name}
            onChange={handleChange}
            onValidationChange={(isValid) => handleValidationChange('firstName', isValid)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              paddingBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            نام خانوادگی
          </Typography>
          <LastNameField
            onValidationChange={(isValid) => handleValidationChange('lastName', isValid)}
            onChange={handleChange}
            value={AshbariaProfile?.last_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography fontWeight={400} fontSize={14}
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            کد ملی
          </Typography>
          <NationalCodeField
            onChange={handleChange}
            value={AshbariaProfile?.national_code}
            onValidationChange={(isValid) => handleValidationChange('nationalCode', isValid)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            تاریخ تولد
          </Typography>
          <DateInputField date={AshbariaProfile?.birth_date} setDate={(value) => setAshbariaProfile({ ...AshbariaProfile, birth_date: value })} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            جنسیت
          </Typography>
          <GenderSelector
            gender={AshbariaProfile?.gender}
            handleChange={handleGenderChange}
            primaryColor={"#FFA800"}
            secondareyColor={"#60557E"}
            primaryBGColor={"#FFC66F33"}
            secondareyBGColor={"#00000080"}
            changeBGColor={true}
            maleGender="M"
            femaleGender="F"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IntroductionSelector handleChange={handleChange} referral_method={AshbariaProfile?.referral_method} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            استان
          </Typography>
          <ProvinceSelector data={AshbariaProfile} setData={setAshbariaProfile} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            شهر
          </Typography>
          <CitySelector data={AshbariaProfile} setData={setAshbariaProfile} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            تلفن
          </Typography>
          <PhoneNumberInput
            setPhoneNumber={handleChange}
            phoneNumber={AshbariaProfile?.phone_number}
            label={undefined}
            iconColor={customTheme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            کد پستی
          </Typography>
          <PostalCodeField onChange={handleChange} value={AshbariaProfile?.postal_code} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              marginBottom: '4px',
              fontSize: 14,
              fonWeight: 400,
            }}
          >
            آدرس
          </Typography>
          <AddressInput onChange={handleChange} value={AshbariaProfile?.address} />
        </Grid>
        <Grid item xs={12}>
          <ProfileImageSelector profile_image={AshbariaProfile?.profile_image} handleChange={handleProfileImgChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={() => localNavigate('/')} size="large" fullWidth={true} variant='outlined'>
            {'ولش کن'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={Boolean(AshbariaProfile?.profile_completion_count_from_28Nov) || !allValid}
            onClick={() => setIsSubmitConfirmationOpen(true)}
            size="large" fullWidth={true} variant='contained'
          >
            {'همینو ذخیره کن'}
          </Button>
        </Grid>
      </Grid>
      <AreYouSure
        text='توجه کن که تنها یک بار می‌تونی نمایه‌ت را ذخیره کنی. آیا مطمئنی؟'
        open={isSubmitConfirmationOpen}
        handleClose={() => setIsSubmitConfirmationOpen(false)}
        callBackFunction={handleSubmit}
      />
    </Container>
  );
}

export default UserInfo;

const checkForBlankFields = (profile: AshbariaProfileType): boolean => {
  const requiredFields = [
    'first_name',
    'last_name',
    'national_code',
    'birth_date',
    'gender',
    'province',
    'city',
    'phone_number',
    'postal_code',
    'address',
  ];

  return requiredFields.some((field) => profile[field as keyof AshbariaProfileType] === null || profile[field as keyof AshbariaProfileType] === '');
};