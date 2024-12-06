import { TextField } from "@mui/material";
import React from "react";

interface PhoneNumberInputProps{
  setPhoneNumber: any;
  phoneNumber: number;
  disabled: boolean;
  label?: string;
}

const PhoneNumberInput = ({ setPhoneNumber, phoneNumber, label, disabled = false }) => {

  const handleChange = (event) => {
    const value = event.target.value;

    // Validate the input: starts with '09', contains only numbers, and is up to 11 characters
    if (/^09\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
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
      label={label? label : null}
    />
  );
}

export default PhoneNumberInput;