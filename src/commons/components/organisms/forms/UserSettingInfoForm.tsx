import { Grid } from '@mui/material';
import React, { FC, useState } from 'react';
import { toEnglishNumber } from 'commons/utils/translateNumber';
import { useTheme } from '@mui/material/styles';
import { UserInfoType } from 'commons/types/profile';
import DateInputField from 'commons/components/molecules/fields/DateInputField';
import PhoneNumberInput from 'commons/components/molecules/profile-inputs/PhoneNumberInput';
import GenderSelector from 'commons/components/molecules/profile-inputs/GenderSelector';
import { Workshop } from "commons/configs/themes/MuiVariables";
import ProvinceSelector from "../../molecules/profile-inputs/ProvinceSelector";
import CitySelector from 'commons/components/molecules/profile-inputs/CitySelector';
import ProfileImageUploader from 'commons/components/molecules/profile-inputs/ProfileImageUploader';
import FirstNameField from 'commons/components/molecules/profile-inputs/FirstNameField';
import LastNameField from 'commons/components/molecules/profile-inputs/LastNameField';

type UserSettingInfoFormPropsType = {
  data: Partial<UserInfoType>;
  setData: Function;
}

const UserSettingInfoForm: FC<UserSettingInfoFormPropsType> = ({
  data,
  setData,
}) => {

  const theme = useTheme();

  const [fieldValidationStatus, setFieldValidationStatus] = useState({
    first_name: false,
    last_name: false,
    national_code: false,
    birth_date: false,
    gender: false,
    referral_method: false,
    province: false,
    city: false,
    postal_code: false,
    address: false,
    profile_image: false,
  });

  const [displayEmptyErrorMessage, setDisplayEmptyErrorMessage] = useState({
    first_name: false,
    last_name: false,
    birth_date: false,
    gender: false,
    province: false,
    city: false,
    profile_image: false,
  });

  const handleValidationChange = (field: string, isValid: boolean) => {
    setFieldValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: isValid,
    }));
  };

  const allFieldsValid = Object.values(fieldValidationStatus).every((status) => status);


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
          justifyContent={{sm: 'end', xs: "center"}}
        >
          <ProfileImageUploader
            file={data.profile_image}
            setFile={handleProfileImageChange}
          />
        </Grid>
        <Grid item container xs={12} sm={6} spacing={2}>
          <Grid item xs={12}>
            <FirstNameField
              label='نام'
              onChange={handleChange}
              value={data.first_name}
              isRequired={true}
              placeholder="نام خود را وارد کنید."
              onValidationChange={(isValid) => handleValidationChange('first_name', isValid)}
              displayEmptyErrorMessage={displayEmptyErrorMessage.first_name}
            />
          </Grid>

          <Grid item xs={12}>
            <LastNameField
              label='نام خانوادگی'
              onChange={handleChange}
              value={data.last_name}
              isRequired={true}
              displayEmptyErrorMessage={displayEmptyErrorMessage.last_name}
              onValidationChange={(isValid) => handleValidationChange('last_name', isValid)}
              placeholder="نام خانوادگی خود را وارد کنید."
            />
          </Grid>

          <Grid item xs={12}>
            <PhoneNumberInput
              phoneNumber={data.phone_number}
              setPhoneNumber={handleChange}
              label={"شماره موبایل"}
              iconColor={theme.palette.text.secondary}
              editable={true}
              placeHolder={"شماره تلفن خود را وارد کنید."}
              isRequired={true}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={6}>
        <DateInputField
          date={data.birth_date}
          setDate={(birthDate) => setData({ ...data, birth_date: birthDate })}
          isRequired={true}
          handleValidationChange={(isValid) => handleValidationChange('birth_date', isValid)}
          displayEmptyErrorMessage={displayEmptyErrorMessage.birth_date}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <GenderSelector
          gender={data.gender}
          handleChange={handleGenderChange}
          primaryColor={Workshop.colors.secondary}
          displayEmptyErrorMessage={displayEmptyErrorMessage.gender}
          handleValidationChange={(isValid) => handleValidationChange('gender', isValid)}
        />
      </Grid>

      <Grid item container spacing={2}>
        {/* Second Row */}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12} sm={6}>
            <ProvinceSelector
              data={data}
              setData={setData}
              label='استان'
              isRequired={true}
              onValidationChange={(isValid) => handleValidationChange('province', isValid)}
              displayEmptyErrorMessage={displayEmptyErrorMessage.province}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CitySelector
              data={data}
              isRequired={true}
              setData={setData}
              label='شهر'
              onValidationChange={(isValid) => handleValidationChange('city', isValid)}
              displayEmptyErrorMessage={displayEmptyErrorMessage.city}
            />
          </Grid>
        </Grid>
      </Grid>

    </Grid >
  );
}

export default UserSettingInfoForm;