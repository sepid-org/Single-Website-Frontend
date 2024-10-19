import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function({handleChange, address}){
    return(
        <Grid item xs={11} md={12} sx={{marginTop: "16px"}}>
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
          آدرس
        </Typography>
          <TextField 
            fullWidth 
            required
            value={address || ''}
            name="address"
            onChange={handleChange}
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
            placeholder="آدرس خود را وارد کنید."
          />
        </Grid>
    );
}