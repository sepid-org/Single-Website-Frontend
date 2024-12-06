import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import edit from "../../atoms/icons/edit.svg";
import React, { Fragment, useState } from "react";
import ChangePhoneNumberDialog from "commons/components/organisms/dialogs/ChangePhoneNumberDialog";

interface PhoneNumberInputProps {
  setPhoneNumber: any;
  phoneNumber: number;
  disabled: boolean;
  label?: string;
}

const PhoneNumberInput = ({ setPhoneNumber, phoneNumber, label, disabled = false }) => {


  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);
  
  const handleChange = (event) => {
    const value = event.target.value;

    // Validate the input: starts with '09', contains only numbers, and is up to 11 characters
    if (/^09\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Fragment>
      <TextField
        disabled={disabled}
        fullWidth
        required
        value={phoneNumber || ''}
        name="phone_number"
        onChange={handleChange}
        placeholder="شماره تلفن خود را وارد کنید."
        inputProps={{
          maxLength: 11,
          inputMode: "numeric",
        }}
        label={label ? label : null}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setIsChangePhoneNumberDialogOpen(!isChangePhoneNumberDialogOpen)}
                disabled={phoneNumber ? false : true}
              >
                <Box component="img" src={edit} width={20} height={20} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <ChangePhoneNumberDialog
        handleClose={() => setIsChangePhoneNumberDialogOpen(state => !state)}
        open={isChangePhoneNumberDialogOpen}
      />
    </Fragment>
  );
}

export default PhoneNumberInput;