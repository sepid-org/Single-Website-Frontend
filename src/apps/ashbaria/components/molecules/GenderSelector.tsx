import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import girlSelectedIcon from "../../assets/girl-yellow-head.svg";
import girlUnsellectedIcon from "../../assets/girl-purple-head.svg"
import boyUnselectedIcon from "../../assets/Boy-purple-head.svg";

export default function GenderSelector({gender}){
    const [selectedGender, setSelectedGender] = useState(gender);
    const selectColor  = (genderValue: string) => {
       return selectedGender === genderValue ? "#FFA800" : "#A198BB";
    }
    const selectBackgroundColor = (genderValue: string) => {
        return selectedGender === genderValue ? "#FFC66F33" : "#00000080";
    }
    return(
        <Grid
            item
            md={6}
            xs={12}
            sx={{
                marginTop: "16px"
            }}
        >
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
                جنسیت
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    padding: "0px 16px 0px 16px",
                    
                    height: "44px"
                }}
            >
                <Box
                    onClick={() => setSelectedGender("boy")}
                    sx={{
                        width: "50%",
                        height: "44px",
                        padding: "0px 12px 0px 12px",
                        gap: "4px",
                        borderRadius: "12px 0px 0px 12px",
                        border: "1px solid",
                        borderColor: selectColor("boy"),
                        backgroundColor: selectBackgroundColor("boy"),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={boyUnselectedIcon}
                        width= "20px"
                        height= "20px"
                        padding= "1.67px"

                    />
                    <Typography sx={{color: selectColor("boy")}}>پسر</Typography>
                </Box>
                <Box
                    onClick={() => setSelectedGender("girl")}
                    sx={{
                        width: "50%",
                        height: "44px",
                        padding: "0px 12px 0px 12px",
                        gap: "4px",
                        borderRadius: "0px 12px 12px 0px",
                        border: "1px solid",
                        borderColor: selectColor("girl"),
                        backgroundColor: selectBackgroundColor("girl"),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={selectedGender === "girl" ? girlSelectedIcon : girlUnsellectedIcon}
                        width= "20px"
                        height= "20px"
                        padding= "1.67px"
                    />
                    <Typography sx={{color: selectColor("girl")}}>دختر</Typography>
                </Box>
            </Box>
        </Grid>
    );
}