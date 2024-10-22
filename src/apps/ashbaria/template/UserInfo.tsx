import { Box, Button, Container, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useUpdateUserProfileMutation } from "apps/website-display/redux/features/party/ProfileSlice";
import useUserProfile from "commons/hooks/useUserProfile";
import React, {FC, useEffect, useState} from "react";
import { toast } from "react-toastify";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { UserInfoType } from 'commons/types/profile';
import GenderSelector from "../components/molecules/profileInputs/GenderSelector";
import profileIcon from "../assets/profile.svg";
import verifyIcon from "../assets/verify.svg";
import NameInput from "../components/molecules/profileInputs/NameInput";
import LastNameInput from "../components/molecules/profileInputs/LastNameInput";
import NationalIDInput from "../components/molecules/profileInputs/NationalIDInput";
import BirthDayInput from "../components/molecules/profileInputs/BirthDayInput";
import IntroductionSelector from "../components/molecules/profileInputs/IntroductionSelector";
import RegionSelector from "../components/molecules/profileInputs/RegionSelector";
import PhoneNumberInput from "../components/molecules/profileInputs/PhoneNumberInput";
import PostNumberInput from "../components/molecules/profileInputs/PostNumberInput";
import AddressInput from "../components/molecules/profileInputs/AddressInput";
import ProfileImageSelector from "../components/molecules/profileInputs/ProfileImageSelector";


type UserSettingPropsType = {
    onSuccessfulSubmission?: any;
    isInForm?: boolean;
    //data:  Partial<UserInfoType>;
    //setData: Function;
}

  
const hasUserCompletedPrimaryInformation = (userInfo) => {
    const { first_name, last_name, birth_date, gender, province, city } = userInfo;
    return first_name && last_name && birth_date && gender && province && city;
}


const UserInfo: FC<UserSettingPropsType> = ({onSuccessfulSubmission, isInForm,}) => {
  const [updateUserProfile, updateUserProfileResult] = useUpdateUserProfileMutation();
  const { isFetching, isSuccess, data: initialUserProfile } = useUserProfile();
  const [userProfile, setUserProfile] = useState(initialUserProfile);

  useEffect(() => {
    if (!isFetching && isSuccess) {
      setUserProfile(initialUserProfile);
    }
  }, [isFetching]);

  useEffect(() => {
    if (updateUserProfileResult?.isSuccess) {
      toast.success('اطلاعات با موفقیت ثبت شد');
      onSuccessfulSubmission?.()
    }
  }, [updateUserProfileResult]);

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

  const [gender, setGender] = useState('boy');

  const [data, setData] = useState({
    first_name: "سیده فاطمه",
    last_name: "احمدزاده",
    national_id: "",
    birth_date: "",
    city: "",
    province: "",
    phone_number: "",
    gender: "",
    address: "",
    post_number: "",
    profile_logo: "",
    introduction: ""
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });

  }

  const [currentScore, setCurrentScore] = useState(150);
  

  return(
    <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "85%",
          padding: "16px 0px 0px 0px",
          gap: "16px",
          borderRadius: "20px",
          border: "2px",
          marginTop: "20px",
          marginBottom: "20px",
          borderTop: "2px solid #FFFFFF80",
          background: "linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)"
        }}
      >
        <Grid container item xs={12} spacing={2}>
          {/* First Row */}
          <Grid 
            item 
            container 
            justifyContent="space-between" 
            alignItems="center"
          >
            <Button 
              sx={{color: "#FE9C42", fontSize: "30px"}}
              onClick={() => {}}
            >
              →
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
            <Box 
                component="img"
                src={profileIcon}
                width="28px"
                height= "28px"
              />
              <Typography 
                variant="h6"
                sx={{fontSize: "18px", fontWeight: 800, color: "white"}}
              >
                نمایه
              </Typography>
            </Box>
            <Box 
              sx={{ 
                width: "85px",
                height: "36px",
                padding: "4px 8px 4px 12px",
                gap: "4px",
                borderRadius: "20px",
                border: "2px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00000080",
                backdropFilter: "blur(4px)",
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              <Typography 
                variant="body2" 
                sx={{
                  fontSize: "16px", 
                  fontWeight: 800,
                  color: "white"
                }}
              >
                {toPersianNumber(currentScore)}+
              </Typography>
              <Box 
                component="img"
                src={verifyIcon}
                width="28px"
                height="28px"
              />
            </Box>
          </Grid>

          {/* Second Row */}
          <NameInput handleChange={handleChange} first_name={data.first_name} />
          <LastNameInput handleChange={handleChange} last_name={data.last_name} />

          {/* Third Row */}
          <NationalIDInput handleChange={handleChange} national_id={data.national_id} />
          <BirthDayInput data={data} setData={setData} />

          {/* Fourth Row */}
          <GenderSelector gender={data.gender}/>
          <IntroductionSelector handleChange={handleChange} introduction={data.introduction} />
          {/* Fifth Row */}
          <RegionSelector data={data} setData={setData} />
          {/* Sixth Row */}
          <PhoneNumberInput handleChange={handleChange} phone_number={data.phone_number} />
          <PostNumberInput handleChange={handleChange} post_number={data.post_number} />

          {/* Seventh Row */}
          <AddressInput handleChange={handleChange} address={data.address} />

          {/* Eighth Row */}
          <ProfileImageSelector profile_logo={data.profile_logo} setData={setData} data={data} />
          {/* Last Row */}
          <Grid item xs={12} md={6} sx={{marginTop: "16px", marginBottom: "16px"}}>
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
                  '&: hover':{
                    background: "linear-gradient(180deg, #FE9C42, #E25100)",
                    color: "black"
                  }
                }}
                style={{
                  borderRadius: "100px"
                }}
                onClick={() => {}}
              >
                ذخیره
              </Button>
            </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: "16px", marginBottom: "16px"}}>
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
                    '&: hover':{
                      background: "linear-gradient(180deg, #FE9C42, #E25100)",
                      color: "black"
                    }
                  }}
                  onClick={() => {}}
                >
                  انصراف
                </Button>
              </Box>
          </Grid>
        </Grid>
      </Container>
  );

}

export default UserInfo;
