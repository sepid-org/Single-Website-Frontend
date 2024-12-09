import { Grid } from '@mui/material';
import React, { FC } from 'react';
import { toEnglishNumber } from 'commons/utils/translateNumber';
import { useTheme } from '@mui/material/styles';
import { UserInfoType } from 'commons/types/profile';
import DateInputField from 'commons/components/molecules/fields/Date';
import NameInput from 'commons/components/molecules/profile-inputs/NameInput';
import LastNameInput from 'commons/components/molecules/profile-inputs/LastNameInput';
import PhoneNumberInput from 'commons/components/molecules/profile-inputs/PhoneNumberInput';
import GenderSelector from 'commons/components/molecules/profile-inputs/GenderSelector';
import { Workshop } from "commons/configs/themes/MuiVariables";
import ProvinceSelector from "../../molecules/profile-inputs/ProvinceSelector";
import CitySelector from 'commons/components/molecules/profile-inputs/CitySelector';
import ProfileImageUploader from 'commons/components/molecules/profile-inputs/ProfileImageUploader';

type UserSettingInfoFormPropsType = {
  data: Partial<UserInfoType>;
  setData: Function;
}

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

const UserSettingInfoForm: FC<UserSettingInfoFormPropsType> = ({
  data,
  setData,
}) => {

  const theme = useTheme();

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  }

  const handleGenderChange = (selectedGender) => {
    setData({
      ...data,
      gender: selectedGender,
    })
  }

  const handleProfileImageChange = (file) => {
    setData({
      ...data,
      profile_image: file,
    })
  }

  return (
    <Grid container spacing={2}>
      <Grid
        item
        container
        xs={12}
        spacing={2}
        direction={'row-reverse'}
        alignItems={'start'}
      >
        <Grid
          container
          item
          xs={12}
          sm={6}
          justifyContent={'end'}
        >
          <ProfileImageUploader
            file={data.profile_image}
            setFile={handleProfileImageChange}
          />
        </Grid>
        <Grid item container xs={12} sm={6} spacing={2}>
          <Grid item xs={12}>
            <NameInput label='نام' handleChange={handleChange} first_name={data.first_name} />
          </Grid>

          <Grid item xs={12}>
            <LastNameInput label='نام خانوادگی' handleChange={handleChange} last_name={data.last_name} />
          </Grid>

          <Grid item xs={12}>
            <PhoneNumberInput
              phoneNumber={data.phone_number}
              setPhoneNumber={handleChange}
              label={"شماره موبایل"}
              iconColor={theme.palette.text.secondary}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <DateInputField
          date={data.birth_date}
          setDate={(birthDate) => setData({ ...data, birth_date: birthDate })}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <GenderSelector gender={data.gender} handleChange={handleGenderChange} primaryColor={Workshop.colors.secondary} />
      </Grid>


      {/* <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={userInfo.national_code || ''}
            name="national_code"
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                handleFieldsChange(e);
              }
            }}
            inputProps={{ className: 'ltr-input' }}
            label="کد ملی"
          />
        </Grid> */}

      {/* todo: hide email temporarily */}
      {/* <Grid item xs={12} sm={6}>
          <TextField
            disabled={true}
            fullWidth
            value={userInfo.email || ''}
            name="email"
            onChange={handleFieldsChange}
            inputProps={{ className: 'ltr-input' }}
            label="ایمیل"
          />
        </Grid> */}

      <Grid item container spacing={2}>
        {/* Second Row */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <ProvinceSelector data={data} setData={setData} label='استان' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CitySelector data={data} setData={setData} label='شهر' />
          </Grid>
        </Grid>
      </Grid>


      {/* <Grid item xs={12}>
        <TextField
          fullWidth
          helperText='جوایز و یادگاری‌ها به این آدرس ارسال می‌شوند.'
          value={data.address || ''}
          name="address"
          multiline
          rows={2}
          onChange={handleChange}
          label="آدرس منزل (اختیاری)"
        />
      </Grid> */}

      {/* <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="postal_code"
          value={data.postal_code || ''}
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              handleChange(e);
            }
          }}
          inputProps={{ className: 'ltr-input' }}
          label="کد پستی (اختیاری)"
        />
      </Grid> */}
    </Grid >
  );
}

export default UserSettingInfoForm;