import React, { Fragment, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function ProfileImageSelector({ profile_image, handleChange }) {
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>(profile_image);

  useEffect(() => {
    if (profile_image) {
      setSelectedProfilePic(profile_image);
    }
  }, [profile_image]);

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
      <Stack direction={"row"} spacing={1}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => {
          const imageSrc = `https://kamva-minio-storage.darkube.app/sepid/projects/ashbaria/profile${item}.png`;
          return (
            <Box
              key={item}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: "50%",
                overflow: "hidden",
                width: 88,
                height: 88,
                background: selectedProfilePic === imageSrc ? "linear-gradient(to right, #FE9C42, #E25100)" : null,
                backgroundClip: "padding-box",
              }}
            >
              <Box
                component="img"
                src={imageSrc}
                width={80}
                height={80}
                onClick={() => {
                  setSelectedProfilePic(imageSrc);
                  handleChange(imageSrc);
                }}
                sx={{
                  borderRadius: "50%",
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    padding: 2,
                    background: 'linear-gradient(to right, #FE9C42, #E25100)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }
                }}
              />
            </Box>
          )
        })}
      </Stack>
    </Fragment >
  );
}