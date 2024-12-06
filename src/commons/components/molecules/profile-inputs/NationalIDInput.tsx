import React, { Fragment } from "react";
import { TextField, Typography } from "@mui/material";

interface NationalCodeInputProps {
  handleChange: any;
  national_code: string;
  label?: string;
}

const NationalCodeInput: React.FC<NationalCodeInputProps> = ({ handleChange, national_code, label }) => {
  return (
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
      label={label? label : null}
    />
  );
}

export default NationalCodeInput;