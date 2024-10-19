import { FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

export default function({handleChange, introduction}){
    return(
        <Grid item xs={11} md={6} sx={{marginTop: "16px"}}>
          <Typography 
            sx={{
              paddingBottom: "4px", 
              gap: "10px",
              fontSize: "14px",
              fonWeight: "400",
              lineHeight: "20.88px",
              textAlign: "left"
            }}
          >
            نحوه‌ی آشنایی
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
            <Select 
              defaultValue={introduction || ''}
              onChange={handleChange}
            >
              <MenuItem value="1">Select Option</MenuItem>
              <MenuItem value="2">option</MenuItem>
            </Select>
            </FormControl>
          </Grid>
    );
}