import React, { Fragment, useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ScrollableStack from "commons/components/organisms/ScrollableStack";

export default function ProfileImageSelector({
  profile_image,
  handleChange,
  onValidationChange,
  displayEmptyErrorMessage,
}) {
  const [selectedProfilePic, setSelectedProfilePic] = useState<string>(profile_image);

  useEffect(() => {
    if (profile_image) {
      setSelectedProfilePic(profile_image);
      onValidationChange(true);
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
      <ScrollableStack>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
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
                flexShrink: 0, // Prevent shrinking
                width: 88, // Fixed width
                height: 88,
                marginRight: 1, // Add spacing between items
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
                }}
              />
            </Box>
          );
        })}
      </ScrollableStack>
      <Typography
        fontSize={12}
        sx={{
          color: "#d32f2f",
          marginTop: "3px",
        }}
      >
        {(!profile_image && displayEmptyErrorMessage) ? 'این فیلد نمی‌تواند خالی باشد.' : ''}
      </Typography>
    </Fragment>
  );
}