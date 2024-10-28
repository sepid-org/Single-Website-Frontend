import React, { Fragment, useState } from "react";
import profilePic1 from "../../../assets/profile1.svg";
import profilePic2 from "../../../assets/profile2.svg";
import profilePic3 from "../../../assets/profile3.svg";
import { Box, Grid, Typography } from "@mui/material";

export default function ProfileImageSelector({ profile_image, setData, data }) {
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>(profile_image);

  const selectBorderColor = (profilePic: string) => {
    return selectedProfilePic === profilePic ? "linear-gradient(to right, #FE9C42, #E25100)" : "none";
  }
  return (
    <Fragment>
      <Typography
        sx={{
          marginBottom: '4px',
          fontSize: 14,
          fonWeight: 400,
        }}
      >
        تصویر نمایه
      </Typography>
      <Box display="flex" paddingX={1}>
        {[profilePic1, profilePic2, profilePic3].map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              width: 84,
              height: 84,
              background: selectBorderColor(item),
              backgroundClip: "padding-box",
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
              width={80}
              height={80}
              sx={{
                borderRadius: "50%",
              }}
            />
          </Box>
        ))}
      </Box>
    </Fragment>
  );
}