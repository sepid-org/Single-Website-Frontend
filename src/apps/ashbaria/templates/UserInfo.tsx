import { Box, Button, Container, FormControl, FormControlLabel, Grid, IconButton, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useUpdateUserProfileMutation } from "apps/website-display/redux/features/party/ProfileSlice";
import useUserProfile from "commons/hooks/useUserProfile";
import React, {FC, useEffect, useState} from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from "react-toastify";
import { toEnglishNumber, toPersianNumber } from "commons/utils/translateNumber";
import { UserInfoType } from 'commons/types/profile';
import GenderSelector from "../components/molecules/GenderSelector";
import profileIcon from "../assets/profile.svg";
import verifyIcon from "../assets/verify.svg";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import moment from "moment";
import Iran from 'commons/utils/iran';
import profilePic1 from "../assets/profile1.svg";
import profilePic2 from "../assets/profile2.svg";
import profilePic3 from "../assets/profile3.svg";


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
    profile_logo: ""
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });

  }

  const [currentScore, setCurrentScore] = useState(150);
  const [selectedProfilePic, setSelectedProfilePic] = useState(data.profile_logo);

  const selectBorderColor = (profilePic: string) => {
    return selectedProfilePic === profilePic ? "linear-gradient(to right, #FE9C42, #E25100)" : "none";
  }

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
        <Grid container item xs={11} spacing={2}>
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
          <Grid container spacing={2} sx={{display: "center", justifyContent: "center"}}></Grid>
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
            <Typography 
              sx={{
                paddingBottom: "4px", 
                gap: "10px",
                fontSize: "14px",
                fonWeight: "400",
                lineHeight: "20.88px",
                textAlign: "left"
              }}
            >
              نام
            </Typography>
            <TextField 
                required
                fullWidth
                value={data.first_name || ''}
                name="first_name"
                onChange={handleChange} 
                sx={{
                    padding: "0px 16px 0px 16px",
                    gap: "10px",
                    borderRadius: "8px",
                    border: "1px",
                    '& .MuiOutlinedInput-root':{
                      height: "44px",
                      width: "100%"
                    }
                }}
                placeholder="نام خود را وارد کنید."
            />
          </Grid>
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography 
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            نام خانوادگی
          </Typography>
            <TextField 
                fullWidth 
                required
                value={data.last_name || ''}
                name="last_name"
                onChange={handleChange}
                sx={{
                    padding: "0px 16px 0px 16px",
                    gap: "10px",
                    borderRadius: "8px",
                    border: "1px",
                    '& .MuiOutlinedInput-root':{
                      height: "44px",
                      width: "100%"
                    }
                }}
                placeholder="نام خانوادگی خود را وارد کنید."
            />
          </Grid>

          {/* Third Row */}
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            کد ملی
          </Typography>
          <TextField 
            fullWidth 
            required
            value={data.national_id || ''}
            name="national_id"
            onChange={handleChange}
            sx={{
                padding: "0px 16px 0px 16px",
                gap: "10px",
                borderRadius: "8px",
                border: "1px",
                '& .MuiOutlinedInput-root':{
                  height: "44px",
                  width: "100%"
                }
            }}
            placeholder="کد ملی خود را وارد کنید."
          />
          </Grid>
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
            <Typography
              sx={{
                paddingBottom: "4px", 
                gap: "10px",
                fontSize: "14px",
                fonWeight: "400",
                lineHeight: "20.88px",
                textAlign: "left",
              }}
            >
              تاریخ تولد
            </Typography>
            <FormControl 
              required 
              fullWidth
              sx={{
                padding: "0px 16px 0px 16px",
                gap: "10px",
                borderRadius: "8px",
                border: "1px",
                '& .MuiOutlinedInput-root':{
                  height: "44px",
                  width: "100%"
                }
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: 'MMMM' }}>
                <DatePicker
                  openTo='year'
                  views={['year', 'month', 'day']}
                  value={data.birth_date ? new Date(data.birth_date) : null}
                  onChange={(date) => setData({ ...data, birth_date: moment(date).format('YYYY-MM-DD') })}
                  sx={{overflow: "visible"}}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          {/* Fourth Row */}
          <GenderSelector gender={data.gender}/>
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography 
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            نحوه‌ی آشنایی
          </Typography>
          <FormControl
            required 
            fullWidth
            sx={{
              padding: "0px 16px 0px 16px",
              gap: "10px",
              borderRadius: "8px",
              border: "1px",
              '& .MuiOutlinedInput-root':{
                height: "44px",
                width: "100%"
              }
            }}
          >
            <Select 
              defaultValue={data.first_name || ''}
              onChange={handleChange}
            >
              <MenuItem value="1">Select Option</MenuItem>
              <MenuItem value="2">option</MenuItem>
            </Select>
            </FormControl>
          </Grid>

          {/* Fifth Row */}
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            استان
          </Typography>
          <FormControl
            required 
            fullWidth
            sx={{
              padding: "0px 16px 0px 16px",
              gap: "10px",
              borderRadius: "8px",
              border: "1px",
              '& .MuiOutlinedInput-root':{
                height: "44px",
                width: "100%"
              }
            }}
          >
            <Select 
              defaultValue={data.province || ''}
              onChange={(event) => {setData({...data, province: event.target.value})}}
            >
              {Iran.Provinces.map((province) => (
                <MenuItem key={province.id} value={province.title}>
                  {province.title}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            </Grid>
            <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
            <Typography
              sx={{
                paddingBottom: "4px", 
                gap: "10px",
                fontSize: "14px",
                fonWeight: "400",
                lineHeight: "20.88px",
                textAlign: "left"
              }}
            >
              شهر
            </Typography>
            <FormControl
            required 
            fullWidth
            sx={{
              padding: "0px 16px 0px 16px",
              gap: "10px",
              borderRadius: "8px",
              border: "1px",
              '& .MuiOutlinedInput-root':{
                height: "44px",
                width: "100%"
              }
            }}
          >
            <Select 
              disabled={!data.province && !data.city}
              value={data.city || ''}
              onChange={(event) => {setData({...data, city: event.target.value})}}
            >
              {Iran.Cities.filter((city) =>
              city.province_id == Iran.Provinces.find(province => province.title == data.province)?.id)
              .map((city) => (
                <MenuItem key={city.id} value={city.title}>
                  {city.title}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>

          {/* Sixth Row */}
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
            <Typography
              sx={{
                paddingBottom: "4px", 
                gap: "10px",
                fontSize: "14px",
                fonWeight: "400",
                lineHeight: "20.88px",
                textAlign: "left"
              }}
            >
              تلفن
            </Typography>
            <TextField 
              fullWidth 
              required
                value={data.phone_number || ''}
                name="phone_number"
                onChange={handleChange}
                sx={{
                    padding: "0px 16px 0px 16px",
                    gap: "10px",
                    borderRadius: "8px",
                    border: "1px",
                    '& .MuiOutlinedInput-root':{
                      height: "44px",
                      width: "100%"
                    }
                  }} 
                placeholder="شماره تلفن خود را وارد کنید."
              />
          </Grid>
          <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            کد پستی
          </Typography>
            <TextField 
              fullWidth 
              required
              value={data.post_number || ''}
              name="post_number"
              onChange={handleChange}
              sx={{
                  padding: "0px 16px 0px 16px",
                  gap: "10px",
                  borderRadius: "8px",
                  border: "1px",
                  '& .MuiOutlinedInput-root':{
                    height: "44px",
                    width: "100%"
                  }
              }}
              placeholder="کد پستی خود را وارد کنید."
            />
          </Grid>

          {/* Seventh Row */}
          <Grid item xs={11} md={12} sx={{marginTop: "16px"}}>
          <Typography
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            آدرس
          </Typography>
            <TextField 
              fullWidth 
              required
              value={data.address || ''}
              name="address"
              onChange={handleChange}
              sx={{
                  padding: "0px 16px 0px 16px",
                  gap: "10px",
                  borderRadius: "8px",
                  border: "1px",
                  '& .MuiOutlinedInput-root':{
                    height: "44px",
                    width: "100%"
                  }
              }}  
              placeholder="آدرس خود را وارد کنید."
            />
          </Grid>

          {/* Eighth Row */}
          <Grid item xs={11} sx={{marginTop: "16px"}}>
          <Typography
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            تصویر نمایه
          </Typography>
            <Box display="flex" justifyContent="flex-start">
            {[profilePic1, profilePic2, profilePic3].map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "84px",
                  height: "84px",
                  background: selectBorderColor(item),
                  backgroundClip: "padding-box",
                  margin: "15px",
                }}
                  onClick={() => {
                    setSelectedProfilePic(item);
                  }}
              >
                <Box
                  component="img"
                  src={item}
                  width= "80px"
                  height= "80px"
                  padding= "1.67px"
                  sx={{
                    borderRadius: "50%",
                  }}
                />
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Last Row */}
          <Grid item xs={11} md={6} sx={{marginTop: "16px", marginBottom: "16px"}}>
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
            <Grid item xs={11} md={6} sx={{marginTop: "16px", marginBottom: "16px"}}>
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
