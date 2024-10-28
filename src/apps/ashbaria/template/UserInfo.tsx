import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toEnglishNumber } from "commons/utils/translateNumber";
import GenderSelector from "../components/molecules/profileInputs/GenderSelector";
import NameInput from "../components/molecules/profileInputs/NameInput";
import LastNameInput from "../components/molecules/profileInputs/LastNameInput";
import NationalCodeInput from "../components/molecules/profileInputs/NationalIDInput";
import BirthDayInput from "../components/molecules/profileInputs/BirthDayInput";
import IntroductionSelector from "../components/molecules/profileInputs/IntroductionSelector";
import RegionSelector from "../components/molecules/profileInputs/RegionSelector";
import PhoneNumberInput from "../components/molecules/profileInputs/PhoneNumberInput";
import PostNumberInput from "../components/molecules/profileInputs/PostNumberInput";
import AddressInput from "../components/molecules/profileInputs/AddressInput";
import ProfileImageSelector from "../components/molecules/profileInputs/ProfileImageSelector";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/slices/Profile";
import BackButton from "../components/molecules/buttons/Back";
import PersonIcon from "../components/atoms/icons/Person";
import ScoreChip from "../components/molecules/chips/Score";
import useLocalNavigate from "../hooks/useLocalNavigate";
import { ProfileType } from "../types";
import dialogService from "commons/components/organisms/PortalDialog";
import CustomDialogContent from "apps/film-bazi/components/organisms/CustomDialogContent";
import ScoreAnnouncement from "apps/film-bazi/components/atoms/icons/ScoreAnnouncement";

type UserSettingPropsType = {}

const UserInfo: FC<UserSettingPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation();
  const { data: initialProfile, isLoading: isGetProfileLoading } = useGetProfileQuery();
  const [userProfile, setUserProfile] = useState<ProfileType>(null);

  useEffect(() => {
    if (initialProfile) {
      setUserProfile(initialProfile);
    }
  }, [isGetProfileLoading]);

  useEffect(() => {
    if (updateProfileResult?.data?.has_received_reward) {
      dialogService.open({
        component:
          <CustomDialogContent
            image={<ScoreAnnouncement />}
            title={`تبریک! با تکمیل نمایه ۱۵۰ سکه به شما اضافه شد.`}
            onClick={() => {
              dialogService.close();
            }}
          />
      })
    } else if (updateProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
    }
  }, [updateProfileResult.isSuccess]);

  const handleChange = (event) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  const handleGenderChange = (selectedGender) => {
    setUserProfile({
      ...userProfile,
      gender: selectedGender,
    })
  }

  const handleProfileImgChange = (selecedImg) => {
    setUserProfile({
      ...userProfile,
      profile_image: selecedImg,
    });
  }

  const handleSubmit = () => {
    updateProfile(userProfile);
  }

  if (!userProfile) return null;

  return (
    <Container maxWidth='lg' component={Paper} sx={{ paddingY: 2 }}>
      <Grid container item spacing={2}>
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <BackButton />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <PersonIcon />
            <Typography variant="h6" fontSize={24} fontWeight={800}>
              {'نمایه'}
            </Typography>
          </Box>
          <ScoreChip value={150} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NameInput handleChange={handleChange} first_name={userProfile.first_name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LastNameInput handleChange={handleChange} last_name={userProfile.last_name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NationalCodeInput handleChange={handleChange} national_code={userProfile.national_code} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BirthDayInput data={userProfile} setData={setUserProfile} />
        </Grid>
        <Grid item xs={12} md={6}>
          <GenderSelector gender={userProfile.gender} handleChange={handleGenderChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <IntroductionSelector handleChange={handleChange} referral_method={userProfile.referral_method} />
        </Grid>
        <RegionSelector data={userProfile} setData={setUserProfile} />
        <Grid item xs={12} md={6}>
          <PhoneNumberInput handleChange={handleChange} phone_number={userProfile.phone_number} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PostNumberInput handleChange={handleChange} postal_code={userProfile.postal_code} />
        </Grid>
        <Grid item xs={12}>
          <AddressInput handleChange={handleChange} address={userProfile.address} />
        </Grid>
        <Grid item xs={12}>
          <ProfileImageSelector profile_image={userProfile.profile_image} handleChange={handleProfileImgChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={() => localNavigate('/')} fullWidth={true} variant='outlined'>
            {'ولش کن'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button onClick={handleSubmit} fullWidth={true} variant='contained'>
            {'همینو ذخیره کن'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserInfo;