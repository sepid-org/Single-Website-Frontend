import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SchoolType } from 'commons/types/models';
import { GenderType } from 'commons/types/profile';
import isNumber from 'commons/utils/validators/isNumber';
import { useCreateInstituteMutation } from 'commons/redux/apis/party/InstituteSlice';
import PhoneNumberInput from 'commons/components/molecules/profile-inputs/PhoneNumberInput';

type AddInstituteDialogPropsType = {
  open: boolean;
  handleClose: any;
  onSuccess?: (result: any) => void;
  province: string;
  city: string;
  gender_type: GenderType;
}

const AddInstituteDialog: FC<AddInstituteDialogPropsType> = ({
  open,
  handleClose,
  onSuccess,
  province,
  city,
  gender_type,
}) => {
  const [data, setData] = useState<SchoolType>(null);
  const [createInstitute, result] = useCreateInstituteMutation();

  const setDataWrapper = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleButtonClick = () => {
    if (!data?.name || !data.school_type) {
      toast.error('لطفاً همه‌ی موارد ستاره‌دار را تکمیل کنید.');
      return;
    }
    createInstitute({
      institute_type: 'School',
      province,
      city,
      gender_type,
      ...data,
    });
  };

  useEffect(() => {
    if (result.isSuccess) {
      handleClose(false);
      onSuccess(result);
      setData(null);
    }
  }, [result])

  return (
    <Dialog disableScrollLock maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {'افزودن مدرسه‌ی جدید'}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>نوع</InputLabel>
              <Select
                value={data?.school_type || ''}
                onChange={setDataWrapper}
                name="school_type"
                label="پایه">
                <MenuItem value={'Elementary'}>
                  {'دبستان'}
                </MenuItem>
                <MenuItem value={'JuniorHigh'}>
                  {'دبیرستان دوره اول'}
                </MenuItem>
                <MenuItem value={'High'}>
                  {'دبیرستان دوره دوم'}
                </MenuItem>
                <MenuItem value={'SchoolOfArt'}>
                  {'هنرستان'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>دخترانه یا پسرانه</InputLabel>
              <Select
                value={gender_type}
                disabled
                onChange={setDataWrapper}
                name="gender_type"
                label="دخترانه یا پسرانه">
                <MenuItem value={'Female'}>
                  {'دخترانه'}
                </MenuItem>
                <MenuItem value={'Male'}>
                  {'پسرانه'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="name"
              value={data?.name || ''}
              onChange={setDataWrapper}
              label="نام مدرسه"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <PhoneNumberInput
              setPhoneNumber={(value) => {
                setData(data => ({
                  ...data,
                  phone_number: value,
                }));
              }}
              phoneNumber={data?.phone_number}
              label={"شماره‌تلفن مدرسه"}
              editable={false}
              isRequired={false}
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="principal_name"
              value={data?.principal_name || ''}
              onChange={setDataWrapper}
              label="نام مدیر"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <PhoneNumberInput
              setPhoneNumber={(value) => {
                setData(data => ({
                  ...data,
                  principal_phone: value,
                }));
              }}
              phoneNumber={data?.principal_phone}
              label={"شماره‌تلفن مدیر"}
              editable={false}
              isRequired={false}
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="استان"
              value={province}
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="شهر"
              value={city}
            />
          </Grid>

          <Grid item container xs={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              name="address"
              value={data?.address || ''}
              onChange={setDataWrapper}
              label="آدرس"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="postal_code"
              value={data?.postal_code || ''}
              onChange={(event) => {
                if (isNumber(event.target.value)) {
                  setDataWrapper(event);
                }
              }}
              label="کد پستی"
            />
          </Grid>

          <Grid item container xs={12} sm={6}></Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button
            disabled={result.isLoading}
            onClick={handleButtonClick}
            fullWidth
            variant="contained"
            color="secondary">
            ثبت
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default AddInstituteDialog;
