import { Box, Paper, Stack } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {
  const fsmId = process.env.NODE_ENV === 'development' ? "7" : "213";
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const userExamStatus = userFSMsStatus.find(status => status.fsm_id === fsmId);

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
