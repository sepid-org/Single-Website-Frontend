import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import DateInputField from "commons/components/molecules/fields/Date";

export default function BirthDateInput({ birthDate, setBirthDate }) {
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        تاریخ تولد
      </Typography>
      <DateInputField date={birthDate} setDate={setBirthDate} />
    </Fragment>
  );
}