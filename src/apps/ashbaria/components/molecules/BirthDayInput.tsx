import { FormControl, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import moment from "moment";

export default function BirthDayInput({data, setData}){
    return(
        <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
            <Typography
              sx={{
                paddingBottom: "4px", 
                gap: "10px",
                fontSize: "14px",
                fonWeight: "400",
                lineHeight: "20.88px",
                textAlign: "left",
              }}
            >
              تاریخ تولد
            </Typography>
            <FormControl 
              required 
              fullWidth
              sx={{
                padding: "0px 16px 0px 16px",
                gap: "10px",
                borderRadius: "8px",
                border: "1px",
                '& .MuiOutlinedInput-root':{
                  height: "44px",
                  width: "100%"
                }
              }}
            >  
              <LocalizationProvider dateAdapter={AdapterDateFnsJalali} dateFormats={{ monthShort: 'MMMM' }}>
                <DatePicker
                  openTo='year'
                  views={['year', 'month', 'day']}
                  value={data.birth_date ? new Date(data.birth_date) : null}
                  onChange={(date) => setData({ ...data, birth_date: moment(date).format('YYYY-MM-DD') })}
                  sx={{overflow: "visible"}}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
    );
}