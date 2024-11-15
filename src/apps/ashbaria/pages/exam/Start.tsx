import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/examStartBG.svg";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { Golden } from "apps/film-bazi/constants/colors";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import WhiteCupIcon from "apps/ashbaria/components/atoms/icons/WhiteCup";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const userExamStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const [startFSM, startFSMResult] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/' });

  return (
    <FullScreenBackgroundImage image={backgroundImg}>
      <Stack 
        width={400} 
        component={Paper} 
        padding={2} 
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <WhiteCupIcon />
          <Typography
            fontWeight={600}
            fontSize={24}
            color={"#FFA800"}
          >
            {"آزمونک کتاب"}
          </Typography>
        </Stack>
        <Typography
          align="center"
          fontWeight={400}
          fontSize={16}
        >
          {"3تا فرصت واسه شرکت توی آزمونک داری. هر جواب درست توی آزمون 1 شانس قرع کشی جایزه و 10 اعتبار دادبستانی بدست میاری"}
        </Typography>
        <Button variant="contained" sx={{width: "90%"}}>برو که بریم!</Button>
        <Button variant="outlined" sx={{width: "90%"}}>فعلا بیخیالش!</Button>
        <Button variant="text" size="large" sx={{color: "#FFA800", width: "90%"}}>هنوز کتاب رو نخریدم:(</Button>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default StartExamPage;
