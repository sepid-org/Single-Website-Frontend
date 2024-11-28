import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { Fragment } from "react";

export default function ({ handleChange, referral_method }) {

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
          value={referral_method || ''}
          onChange={handleChange}
        >
          <MenuItem value="دوستان">دوستان</MenuItem>
          <MenuItem value="مدرسه">مدرسه</MenuItem>
          <MenuItem value="تبلیغات تلوزیونی">تبلیغات تلوزیونی</MenuItem>
          <MenuItem value="پیامک">پیامک</MenuItem>
          <MenuItem value="سایر">سایر</MenuItem>
        </Select>
      </FormControl>
    </Fragment>
  );
}