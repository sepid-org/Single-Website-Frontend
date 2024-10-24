import { Grid, TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ handleChange, phone_number }) {
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
        fullWidth
        required
        value={phone_number || ''}
        name="phone_number"
        onChange={handleChange}
        placeholder="شماره تلفن خود را وارد کنید."
      />
    </Fragment>
  );
}