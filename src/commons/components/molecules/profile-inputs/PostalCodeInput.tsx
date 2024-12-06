import { TextField } from "@mui/material";
import React from "react";

interface PostalCodeInputProps{
  handleChange: any;
  postal_code: number;
  label?: string;
}

const PostalCodeInput: React.FC<PostalCodeInputProps> = ({ handleChange, postal_code, label }) => {
  return (
    <TextField
      fullWidth
      required
      value={postal_code || ''}
      name="postal_code"
      onChange={handleChange}
      placeholder="کد پستی خود را وارد کنید."
      inputProps={{
        maxLength: 10,
        inputMode: "numeric",
      }}
      label={label? label : null}
    />
  );
}

export default PostalCodeInput;