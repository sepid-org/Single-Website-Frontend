import { Grid, TextField, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ handleChange, address }) {
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        آدرس
      </Typography>
      <TextField
        fullWidth
        required
        value={address || ''}
        name="address"
        onChange={handleChange}
        placeholder="آدرس خود را وارد کنید."
      />
    </Fragment>
  );
}