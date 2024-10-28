import { FormControl, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { Fragment } from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import moment from "moment";

export default function BirthDayInput({ data, setData }) {
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
      <FormControl
        required
        fullWidth
      >
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: 'MMMM' }}>
          <DatePicker
            openTo='year'
            views={['year', 'month', 'day']}
            value={data.birth_date ? new Date(data.birth_date) : null}
            onChange={(date) => setData({ ...data, birth_date: moment(date).format('YYYY-MM-DD') })}
            sx={{ overflow: "visible" }}
          />
        </LocalizationProvider>
      </FormControl>
    </Fragment>
  );
}