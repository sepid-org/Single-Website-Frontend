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
import { Golden } from "../constants/colors";

type UserSettingPropsType = {}

const UserInfo: FC<UserSettingPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation();
  const { data: initialAshbariaProfile } = useGetProfileQuery();
  const [AshbariaProfile, setAshbariaProfile] = useState<AshbariaProfileType>(null);
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] = useState(false);
  const { data: userProfile } = useUserProfile();
  const {
    fieldValidationStatus,
    setFieldValidationStatus,
    displayEmptyErrorMessages,
    setDisplayEmptyErrorMessages,
    handleValidationChange,
    allFieldsValid,
  } = useUserProfileFormValidator(['first_name', 'last_name', 'national_code', 'birth_date', 'gender', 'referral_method', 'province', 'city', 'postal_code', 'address', 'profile_image'])

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
      setFieldValidationStatus({
        first_name: initialAshbariaProfile?.first_name ? true : false,
        last_name: initialAshbariaProfile?.last_name ? true : false,
        national_code: initialAshbariaProfile?.national_code ? true : false,
        birth_date: initialAshbariaProfile?.birth_date ? true : false,
        postal_code: initialAshbariaProfile?.postal_code ? true : false,
        address: initialAshbariaProfile?.address ? true : false,
        province: initialAshbariaProfile?.province ? true : false,
        city: initialAshbariaProfile?.city ? true : false,
        referral_method: initialAshbariaProfile?.referral_method ? true : false,
        gender: initialAshbariaProfile?.gender ? true : false,
        profile_image: initialAshbariaProfile?.profile_image ? true : false,
      });
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
            onValidationChange={(isValid) => handleValidationChange('first_name', isValid)}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['first_name']}
            placeholder="نام خود را وارد کنید."
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
            onValidationChange={(isValid) => handleValidationChange('last_name', isValid)}
            onChange={handleChange}
            value={AshbariaProfile?.last_name}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['last_name']}
            placeholder="نام خانوادگی خود را وارد کنید."
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
            onValidationChange={(isValid) => handleValidationChange('national_code', isValid)}
            isRequired={true}
            displayEmptyErrorMessage={displayEmptyErrorMessages['national_code']}
            placeholder="کد ملی خود را وارد کنید."
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
          <DateInputField
            isRequired={true}
            date={AshbariaProfile?.birth_date}
            setDate={(value) => setAshbariaProfile({ ...AshbariaProfile, birth_date: value })}
            handleValidationChange={(isValid) => handleValidationChange('birth_date', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['birth_date']}
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
            جنسیت
          </Typography>
          <GenderSelector
            handleValidationChange={(isValid) => handleValidationChange('gender', isValid)}
            gender={AshbariaProfile?.gender}
            handleChange={handleGenderChange}
            primaryColor={Golden}
            secondaryColor={"#60557E"}
            primaryBGColor={"#FFC66F33"}
            secondaryBGColor={"rgba(0, 0, 0, 0.5)"}
            maleGender="M"
            femaleGender="F"
            displayEmptyErrorMessage={displayEmptyErrorMessages['gender']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IntroductionSelector
            handleChange={handleChange}
            referral_method={AshbariaProfile?.referral_method}
            isRequired={true}
            onValidationChange={(isValid) => handleValidationChange('referral_method', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['referral_method']}
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
            استان
          </Typography>
          <ProvinceSelector
            isRequired={true}
            data={AshbariaProfile}
            setData={setAshbariaProfile}
            onValidationChange={(isValid) => handleValidationChange('province', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['province']}
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
            شهر
          </Typography>
          <CitySelector
            isRequired={true}
            data={AshbariaProfile}
            setData={setAshbariaProfile}
            onValidationChange={(isValid) => handleValidationChange('city', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['city']}
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
            تلفن
          </Typography>
          <PhoneNumberInput
            setPhoneNumber={handleChange}
            phoneNumber={AshbariaProfile?.phone_number}
            label={undefined}
            editable={true}
            placeHolder={"شماره تلفن خود را وارد کنید."}
            isRequired={true}
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
          <PostalCodeField
            isRequired={true}
            onChange={handleChange}
            value={AshbariaProfile?.postal_code}
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
              fonWeight: 400,
            }}
          >
            آدرس
          </Typography>
          <AddressField
            onChange={handleChange}
            value={AshbariaProfile?.address}
            isRequired={true}
            onValidationChange={(isValid) => handleValidationChange('address', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['address']}
            placeholder="آدرس خود را وارد کنید."
          />
        </Grid>
        <Grid item xs={12}>
          <ProfileImageSelector
            profile_image={AshbariaProfile?.profile_image}
            handleChange={handleProfileImgChange}
            onValidationChange={(isValid) => handleValidationChange('profile_image', isValid)}
            displayEmptyErrorMessage={displayEmptyErrorMessages['profile_image']}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button onClick={() => localNavigate('/')} size="large" fullWidth={true} variant='outlined'>
            {'ولش کن'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            onClick={() => {
              if (allFieldsValid) {
                setIsSubmitConfirmationOpen(true)
              } else {
                for (const property in fieldValidationStatus) {
                  if (!fieldValidationStatus[property] && !AshbariaProfile[property]) {
                    setDisplayEmptyErrorMessages((prevState) => ({ ...prevState, [property]: true }));
                  }
                }
                toast.error("لطفا اول موارد خواسته شده رو تکمیل کن.");
              }
            }}
            disabled={ Object.values(AshbariaProfile ?? {}).some(value => value === null)}
            size="large"
            fullWidth={true}
            variant='contained'
          >
            {'همینو ذخیره کن'}
          </Button>
        </Grid>
      </Grid>
      <AreYouSure
        text='توجه کن که تنها یک بار می‌تونی نمایه‌ت را ذخیره کنی. آیا مطمئنی؟'
        open={isSubmitConfirmationOpen}
        handleClose={() => setIsSubmitConfirmationOpen(false)}
        callBackFunction={() => updateProfile(AshbariaProfile)}
      />
    </Container >

  );
}

export default UserInfo;