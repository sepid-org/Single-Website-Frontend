import { TextField } from "@mui/material";
import React from "react";

interface NameInputProps {
  handleChange: any;
  first_name: string;
  label?: string;
}

const NameInput: React.FC<NameInputProps> = ({ handleChange, first_name, label }) => {
  return (
    <TextField
      required
      fullWidth
      value={first_name || ''}
      name="first_name"
      onChange={handleChange}
      placeholder="نام خود را وارد کنید."
      label={label? label : null}
    />
  );
}

export default NameInput;