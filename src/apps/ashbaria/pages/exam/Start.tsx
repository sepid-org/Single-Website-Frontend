import { Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { Golden } from "apps/film-bazi/constants/colors";
import useStartFSM from "commons/hooks/fsm/useStartFSM";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const userExamStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const [startFSM, startFSMResult] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/' });

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack width={300} component={Paper} padding={2} spacing={2}>
        <Typography color={Golden} fontWeight={600} textAlign={'center'}>
          {'آزمون'}
        </Typography>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default StartExamPage;
