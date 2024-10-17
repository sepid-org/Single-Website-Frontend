import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function NameInput({handleChange, first_name}){
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
              نام
            </Typography>
            <TextField 
                required
                fullWidth
                value={first_name || ''}
                name="first_name"
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
                placeholder="نام خود را وارد کنید."
            />
          </Grid>
    );
}