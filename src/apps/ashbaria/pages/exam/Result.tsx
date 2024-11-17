import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC, Fragment } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import TickCircleIcon from "apps/ashbaria/components/atoms/icons/TickCircle";
import CrossCircleIcon from "apps/ashbaria/components/atoms/icons/CrossCircle";
import ScoreChip from "apps/ashbaria/components/molecules/chips/Score";
import RefreshIcon from "apps/ashbaria/components/atoms/icons/Refresh";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type ExamResultPagePropsType = {};

const ExamResultPage: FC<ExamResultPagePropsType> = () => {
  const { programSlug } = useParams();
  const { data: userFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const userExamStatus = userFSMsStatus?.find(status => status.fsm_id === fsmId);
  const [startFSM, startFSMResult] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/' });
  const { data: fsm } = useGetFSMQuery({ fsmId });

  const navigate = useNavigate();
  const numberOfTrueAnswers = 2;
  console.log(userFSMsStatus);
  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];

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
          alignItems: "center"
        }}
      >
        <Typography
          color="#FFA800"
          fontWeight={600}
          fontSize={24}
        >
          {
            numberOfTrueAnswers > 3 ?
              "آفرین!" :
              "حیف شد که!"
          }
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {numberOfTrueAnswers > 3 ?
            <TickCircleIcon /> :
            <CrossCircleIcon />
          }
          <Typography
            fontSize={24}
            fontWeight={600}
            color={numberOfTrueAnswers > 3 ? "#00D387" : "#E22D79"}
          >
            {
              numberOfTrueAnswers > 3 ?
                numberOfTrueAnswers.toString() + "پاسخ درست دادی" :
                "۳ جواب غلط داشتی"
            }
          </Typography>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <ScoreChip value={200} />
        </Stack>
        {fsm?.participant_limit - userCurrentFSM?.finished_players_count > 0 &&
          <Typography fontSize={16} fontWeight={400}>۱ فرصت دیگه داری</Typography>
        }
        <Button
          variant="contained"
          sx={{ width: "90%" }}
          onClick={() => navigate("/program/ashbaria/exam")}
          disabled={fsm?.participant_limit - userCurrentFSM?.finished_players_count === 0}
        >
          <RefreshIcon />
          یه بار دیگه
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "90%" }}
          onClick={() => navigate("/program/ashbaria/menu")}
        >
          برگردیم به خانه
        </Button>
      </Stack>
    </FullScreenBackgroundImage>);
};

export default ExamResultPage;
