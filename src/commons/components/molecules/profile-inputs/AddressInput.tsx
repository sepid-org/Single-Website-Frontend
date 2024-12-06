import { TextField } from "@mui/material";
import React from "react";

interface AddressInputProps {
  handleChange: any;
  address: string;
  label?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ handleChange, address, label }) => {
  return (
    <TextField
      fullWidth
      required
      multiline
      minRows={2}
      value={address || ''}
      name="address"
      onChange={handleChange}
      placeholder="آدرس خود را وارد کنید."
      label={label? label : null}
    />
  );
}

export default AddressInput;