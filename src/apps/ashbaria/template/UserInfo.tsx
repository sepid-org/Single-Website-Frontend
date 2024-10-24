import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material";
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

  const handleSubmit = () => {
    updateProfile(userProfile);
  }

  if (!userProfile) return null;

  return (
    <Container maxWidth='lg' component={Paper} sx={{ paddingY: 2 }}>
      <Grid container item spacing={2}>
        {/* First Row */}
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
          <ScoreChip value={"150+"} />
        </Grid>

        {/* Second Row */}
        <Grid item xs={12} md={6}>
          <NameInput handleChange={handleChange} first_name={userProfile.first_name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <LastNameInput handleChange={handleChange} last_name={userProfile.last_name} />
        </Grid>

        {/* Third Row */}
        <NationalCodeInput handleChange={handleChange} national_code={userProfile.national_code} />
        <BirthDayInput data={userProfile} setData={setUserProfile} />

        {/* Fourth Row */}
        <GenderSelector gender={userProfile.gender} />
        <IntroductionSelector handleChange={handleChange} referral_method={userProfile.referral_method} />

        {/* Fifth Row */}
        <RegionSelector data={userProfile} setData={setUserProfile} />

        {/* Sixth Row */}
        <PhoneNumberInput handleChange={handleChange} phone_number={userProfile.phone_number} />
        <PostNumberInput handleChange={handleChange} postal_code={userProfile.postal_code} />

        {/* Seventh Row */}
        <AddressInput handleChange={handleChange} address={userProfile.address} />

        {/* Eighth Row */}
        <ProfileImageSelector profile_image={userProfile.profile_image} setData={setUserProfile} data={userProfile} />

        {/* Last Row */}
        <Grid item xs={12} md={6} sx={{ marginTop: "16px", marginBottom: "16px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "44px",
              minWidth: "82px",
              borderRadius: "100px",
              backgroundClip: "padding-box",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(to right, #FE9C42, #E25100)",
            }}
          >
            <Button
              fullWidth
              sx={{
                height: "42px",
                minWidth: "80px",
                padding: "10px 20px 10px 20px",
                gap: "4px",
                borderRadius: "100px",
                backgroundColor: "#130e15",
                backgroundClip: "padding-box",
                color: "#FE9C42",
                '&: hover': {
                  background: "linear-gradient(180deg, #FE9C42, #E25100)",
                  color: "black"
                }
              }}
              onClick={() => localNavigate('/')}
            >
              {'ولش کن'}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ marginTop: "16px", marginBottom: "16px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "44px",
              minWidth: "82px",
              borderRadius: "100px",
              backgroundClip: "padding-box",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(to right, #FE9C42, #E25100)",
            }}
          >
            <Button
              fullWidth
              sx={{
                height: "42px",
                minWidth: "80px",
                padding: "10px 20px 10px 20px",
                gap: "4px",
                borderRadius: "100px",
                backgroundColor: "#130e15",
                color: "#FE9C42",
                '&: hover': {
                  background: "linear-gradient(180deg, #FE9C42, #E25100)",
                  color: "black"
                }
              }}
              style={{
                borderRadius: "100px"
              }}
              onClick={handleSubmit}
            >
              {'همینو ذخیره کن'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserInfo;
