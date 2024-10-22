import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function({handleChange, post_number}){
    return(
        <Grid item xs={12} md={6} sx={{marginTop: "16px"}}>
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
            کد پستی
          </Typography>
            <TextField 
              fullWidth 
              required
              value={post_number || ''}
              name="post_number"
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
              placeholder="کد پستی خود را وارد کنید."
            />
          </Grid>
    );
}