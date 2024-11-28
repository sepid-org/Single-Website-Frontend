import { TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ handleChange, postal_code }) {
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        کد پستی
      </Typography>
      <TextField
        fullWidth
        required
        value={postal_code || ''}
        name="postal_code"
        onChange={handleChange}
        placeholder="کد پستی خود را وارد کنید."
      />
    </Fragment>
  );
}