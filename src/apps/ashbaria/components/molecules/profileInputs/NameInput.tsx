import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

export default function NameInput({ handleChange, first_name }) {
  return (
    <Stack>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        نام
      </Typography>
      <TextField
        required
        fullWidth
        value={first_name || ''}
        name="first_name"
        onChange={handleChange}
        placeholder="نام خود را وارد کنید."
      />
    </Stack>
  );
}