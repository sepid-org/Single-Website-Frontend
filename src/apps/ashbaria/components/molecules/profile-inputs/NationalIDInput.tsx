import React, { Fragment } from "react";
import { TextField, Typography } from "@mui/material";


export default function NationalCodeInput({ handleChange, national_code }) {
  return (
    <Fragment>
      <Typography fontWeight={400} fontSize={14}
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        کد ملی
      </Typography>
      <TextField
        fullWidth
        required
        value={national_code || ''}
        name="national_code"
        onChange={handleChange}
        placeholder="کد ملی خود را وارد کنید."
        inputProps={{
          maxLength: 10,
          inputMode: "numeric",
        }}
      />
    </Fragment>
  );
}