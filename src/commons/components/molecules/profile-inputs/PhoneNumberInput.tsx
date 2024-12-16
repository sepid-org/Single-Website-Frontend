import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { Fragment, useState } from "react";
import ChangePhoneNumberDialog from "commons/components/organisms/dialogs/ChangePhoneNumberDialog";
import { ReactComponent as EditIcon } from "../../atoms/icons/edit.svg";
import { toPersianNumber } from "commons/utils/translateNumber";

interface PhoneNumberInputProps {
  setPhoneNumber: any;
  phoneNumber: string;
  label?: string;
  iconColor?: string;
  placeHolder?: string;
  editable: boolean;
  textDir?: string;
  isRequired: boolean;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  setPhoneNumber,
  phoneNumber = '',
  label,
  iconColor,
  placeHolder,
  editable,
  textDir,
  isRequired
}) => {


  const [isChangePhoneNumberDialogOpen, setIsChangePhoneNumberDialogOpen] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    if (
      value === '' ||
      (/^[۰0]$/.test(value)) ||
      value === '09' ||
      (/^09\d{1,9}$/.test(value)) ||
      value === '+' ||
      value === '+9' ||
      value === '+98' ||
      (/^\+98\d{1,10}$/.test(value))
    ) {
      setPhoneNumber(value);
    }
  };

  return (
    <Fragment>
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          required={isRequired}
          value={phoneNumber}
          name="phone_number"
          onChange={handleChange}
          placeholder={placeHolder}
          inputProps={{
            maxLength: 13,
            readOnly: editable,
            dir: textDir
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
                {editable &&
                  <IconButton
                    onClick={() => setIsChangePhoneNumberDialogOpen(!isChangePhoneNumberDialogOpen)}
                  >
                    <EditIcon />
                  </IconButton>
                }
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