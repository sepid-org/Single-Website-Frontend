import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ handleChange, referral_method }) {
  console.log(referral_method);
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        نحوه‌ی آشنایی
      </Typography>
      <FormControl
        required
        fullWidth
      >
        <Select
          name="referral_method"
          defaultValue={referral_method || ''}
          onChange={handleChange}
        >
          <MenuItem value="1">Select Option</MenuItem>
          <MenuItem value="2">option</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  );
}