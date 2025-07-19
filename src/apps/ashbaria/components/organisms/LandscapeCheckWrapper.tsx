import React, { FC, ReactNode, useEffect, useState } from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";

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
        backgroundImage: `url(${MediaUrls.WALL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Grid container component={Paper} padding={4} alignItems={'center'} justifyContent={'center'}>
        <Grid item xs={12} sm={4} container alignItems={'center'} justifyContent={'center'}>
          <Box
            component="img"
            src={process.env.PUBLIC_URL + '/images/rotate.svg'}
            sx={{
              width: 200,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack spacing={2}>
            <Typography variant="h4" textAlign="center" lineHeight={1.5}>
              {'لطفاً دستگاه رو به‌صورت افقی بگیر!'}
            </Typography>
            <Typography textAlign="center">
              {'توجه کن که قابلیت چرخش خودکار در تنظیمات دستگاهت فعال باشه'}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandscapeCheckWrapper;
