import { TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ setPhoneNumber, phoneNumber, disabled = false }) {

  const handleChange = (event) => {
    const value = event.target.value;

    // Validate the input: starts with '09', contains only numbers, and is up to 11 characters
    if (/^09\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        تلفن
      </Typography>
      <TextField
        disabled={disabled}
        fullWidth
        required
        value={phoneNumber}
        name="phone_number"
        onChange={handleChange}
        placeholder="شماره تلفن خود را وارد کنید."
        inputProps={{
          maxLength: 11,
          inputMode: "numeric",
        }}
      />
    </Fragment>
  );
}