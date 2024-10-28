import React, { FC, ReactNode, useEffect, useState } from "react";
import backgroundImg from "../../assets/profileBackground.svg";
import { Box, Paper, Stack, Typography } from "@mui/material";

type LandscapeCheckWrapperPropsType = {
  children: ReactNode;
}

const LandscapeCheckWrapper: FC<LandscapeCheckWrapperPropsType> = ({
  children,
}) => {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    // Detect if on mobile and in portrait mode, alert user to rotate
    const checkOrientation = () => {
      if (window.innerWidth >= window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };

    // Initial check
    checkOrientation();

    // Listen for orientation changes
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (isLandscape) {
    return children;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack component={Paper} padding={4}>
        <Typography variant="h4" textAlign="center">
          {'لطفاً گوشی را در به‌صورت افقی بگیرید!'}
        </Typography>
      </Stack>
    </Box>
  );
};

export default LandscapeCheckWrapper;
