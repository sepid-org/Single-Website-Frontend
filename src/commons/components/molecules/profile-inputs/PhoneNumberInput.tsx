import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import ChangePhoneNumberDialog from "commons/components/organisms/dialogs/ChangePhoneNumberDialog";
import { ReactComponent as EditIcon } from "../../atoms/icons/edit.svg";

interface PhoneNumberInputProps {
  setPhoneNumber: any;
  phoneNumber: string;
  label?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ setPhoneNumber, phoneNumber = '', label,  }) => {


  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^09\d{0,9}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  return (
    <Fragment>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          required
          value={phoneNumber}
          name="phone_number"
          onChange={handleChange}
          placeholder="شماره تلفن خود را وارد کنید."
          inputProps={{
            maxLength: 11,
            inputMode: "numeric",
            readOnly: true,
          }}
          label={label ? label : null}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  position: 'absolute',
                  right: 4,
                }}
              >
                <IconButton
                  onClick={() => setIsChangePhoneNumberDialogOpen(!isChangePhoneNumberDialogOpen)}
                >
                  <EditIcon  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <ChangePhoneNumberDialog
        handleClose={() => setIsChangePhoneNumberDialogOpen(state => !state)}
        open={isChangePhoneNumberDialogOpen}
      />
    </Fragment>
  );
}

export default PhoneNumberInput;