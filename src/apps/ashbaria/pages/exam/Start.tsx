import { Box, Paper, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack width={300} component={Paper} padding={2} spacing={2}>
        {/* todo */}
      </Stack>
    </Box>
  );
};

export default StartExamPage;
