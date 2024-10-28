import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function ProfileImageSelector({ profile_image, handleChange }) {
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>(profile_image);
  const profileOptions = [
    "https://kamva-minio-storage.darkube.app/sepid/projects/ashbaria/profile1.svg",
    "https://kamva-minio-storage.darkube.app/sepid/projects/ashbaria/profile2.svg",
    "https://kamva-minio-storage.darkube.app/sepid/projects/ashbaria/profile3.svg",
  ]
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
        {profileOptions.map((item, index) => (
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
              handleChange(item);
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