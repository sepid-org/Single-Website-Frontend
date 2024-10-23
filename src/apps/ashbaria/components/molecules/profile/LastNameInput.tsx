import React from "react";
import { Stack, TextField, Typography } from "@mui/material";

export default function LastNameInput({ handleChange, last_name }) {
  return (
    <Stack>
      <Typography
        sx={{
          paddingBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        نام خانوادگی
      </Typography>
      <TextField
        fullWidth
        required
        value={last_name || ''}
        name="last_name"
        onChange={handleChange}
        placeholder="نام خانوادگی خود را وارد کنید."
      />
    </Stack>
  );
}