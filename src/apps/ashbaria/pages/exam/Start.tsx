import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/examStartBG.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import WhiteCupIcon from "apps/ashbaria/components/atoms/icons/WhiteCup";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { toPersianNumber } from "commons/utils/translateNumber";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const userExamStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const [startFSM, startFSMResult] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/' });
  const { data: fsm } = useGetFSMQuery({ fsmId });
  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];

  const navigate = useNavigate();

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

          {
            toPersianNumber(fsm?.participant_limit - userCurrentFSM?.finished_players_count) +
            "تا فرصت واسه شرکت توی آزمونک داری. هر جواب درست توی آزمون ۴۰ اعتبار دادبستانی بدست میاری"
          }
        </Typography>
        <Button
          variant="contained"
          sx={{ width: "90%" }}
          onClick={() => navigate("/program/ashbaria/exam")}
        >
          برو که بریم!
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "90%" }}
          onClick={() => navigate("/program/ashbaria/menu")}
        >
          فعلا بیخیالش!
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{
            color: "#FFA800",
            width: "90%"
          }}
          onClick={() => {
            window.open('https://qandilsch.ir/product/10-raz-ashbaria/', '_blank');
          }}
        >
          هنوز کتاب رو نخریدم:(
        </Button>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default StartExamPage;
