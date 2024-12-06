import React from "react";
import { TextField } from "@mui/material";

interface LastNameInputProps {
  handleChange: any;
  last_name: string;
  label?: string;
}

const LastNameInput: React.FC<LastNameInputProps> = ({ handleChange, last_name, label }) => {
  return (
    <TextField
      fullWidth
      required
      value={last_name || ''}
      name="last_name"
      onChange={handleChange}
      placeholder="نام خانوادگی خود را وارد کنید."
      label={label? label : null}
    />
  );
}

export default LastNameInput;