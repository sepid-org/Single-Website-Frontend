import React, { useState } from "react";
import profilePic1 from "../../assets/profile1.svg";
import profilePic2 from "../../assets/profile2.svg";
import profilePic3 from "../../assets/profile3.svg";
import { Box, Grid, Typography } from "@mui/material";

export default function ProfileImageSelector({profile_logo, setData, data}){
    const [selectedProfilePic, setSelectedProfilePic] = useState(profile_logo);

    const selectBorderColor = (profilePic: string) => {
        return selectedProfilePic === profilePic ? "linear-gradient(to right, #FE9C42, #E25100)" : "none";
    }
    return(
        <Grid item xs={12} sx={{marginTop: "16px"}}>
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
            تصویر نمایه
          </Typography>
            <Box display="flex" justifyContent="flex-start">
            {[profilePic1, profilePic2, profilePic3].map((item) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "84px",
                  height: "84px",
                  background: selectBorderColor(item),
                  backgroundClip: "padding-box",
                  margin: "15px",
                }}
                  onClick={() => {
                    setSelectedProfilePic(item);
                    setData(
                      {
                        ...data,
                        profile_logo: item
                      }
                    )
                  }}
              >
                <Box
                  component="img"
                  src={item}
                  width= "80px"
                  height= "80px"
                  padding= "1.67px"
                  sx={{
                    borderRadius: "50%",
                  }}
                />
                </Box>
              ))}
            </Box>
          </Grid>

    );
}