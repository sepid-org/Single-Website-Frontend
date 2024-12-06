import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { FC, useState } from 'react';
import Iran from 'commons/utils/iran';
import { toEnglishNumber } from 'commons/utils/translateNumber';
import isNumber from 'commons/utils/validators/isNumber';
import ChangePhoneNumberDialog from 'commons/components/organisms/dialogs/ChangePhoneNumberDialog';
import UploadImage from 'commons/components/molecules/UploadImage';
import { UserInfoType } from 'commons/types/profile';
import DateInputField from 'commons/components/molecules/fields/Date';
import NameInput from 'commons/components/molecules/profile-inputs/NameInput';
import LastNameInput from 'commons/components/molecules/profile-inputs/LastNameInput';
import PhoneNumberInput from 'commons/components/molecules/profile-inputs/PhoneNumberInput';
import GenderSelector from 'commons/components/molecules/profile-inputs/GenderSelector';


type UserSettingInfoFormPropsType = {
  data: Partial<UserInfoType>;
  setData: Function;
}

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

const UserSettingInfoForm: FC<UserSettingInfoFormPropsType> = ({
  data,
  setData,
}) => {
  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);

  console.log(data);
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

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <UploadImage
          setFile={(file) => {
            setData({
              ...data,
              profile_image: file,
            })
          }}
          file={data.profile_image || PROFILE_PICTURE}
          showImageSelf={true} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <NameInput label='نام' handleChange={handleChange} first_name={data.first_name} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <LastNameInput label='نام خانوادگی' handleChange={handleChange} last_name={data.last_name} />
      </Grid>

      <Grid item xs={12} sm={6}>
        <DateInputField
          date={data.birth_date}
          setDate={(birthDate) => setData({ ...data, birth_date: birthDate })}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <PhoneNumberInput phoneNumber={data.phone_number} setPhoneNumber={handleChange} label={"شماره موبایل"} disabled={true}/>
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

      <Grid item xs={12} sm={6}>
        <GenderSelector gender={data.gender} handleChange={handleGenderChange}/>
      </Grid>

      <Grid item container xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>استان</InputLabel>
          <Select
            value={data.province || ''}
            onChange={handleChange}
            name="province"
            label="استان">
            {Iran.Provinces.map((province) => (
              <MenuItem key={province.id} value={province.title}>
                {province.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item container xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>شهر</InputLabel>
          <Select
            disabled={!data.province && !data.city}
            value={data.city || ''}
            onChange={handleChange}
            name="city"
            label="شهر">
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