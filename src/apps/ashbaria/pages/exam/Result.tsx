import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import TickCircleIcon from "apps/ashbaria/components/atoms/icons/TickCircle";
import CrossCircleIcon from "apps/ashbaria/components/atoms/icons/CrossCircle";
import ScoreChip from "apps/ashbaria/components/molecules/chips/Score";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { toPersianNumber } from "commons/utils/translateNumber";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useGetMyPlayerQuery } from "apps/fsm/redux/slices/fsm/PlayerSlice";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import usePlayerPerformance from "commons/hooks/fsm/useGetPlayerPerformance";
import { ASHBARIA_EXAM_QUESTION_COIN_REWARD } from "apps/ashbaria/constants/game-info";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type ExamResultPagePropsType = {};

const ExamResultPage: FC<ExamResultPagePropsType> = () => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: player, isLoading: isLoadingPlayer } = useGetMyPlayerQuery({ fsmId });
  const { data: userFSMsStatus, isLoading: isLoadingUserFSMsStatus } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const [startFSM] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/' });
  const { data: fsm, isLoading: isLoadingFSM } = useGetFSMQuery({ fsmId });
  const { correctAnswersCount, isLoading: isLoadingPlayerPerformance } = usePlayerPerformance({ playerId: parseInt(player?.id) });

  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];

  const isLoading = isLoadingPlayer || isLoadingUserFSMsStatus || isLoadingFSM || isLoadingPlayerPerformance;

  return (
    <FullScreenBackgroundImage image={backgroundImg} styles={{ padding: 2 }}>
      <Stack
        width={400}
        component={Paper}
        padding={2}
        paddingX={4}
        spacing={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography
          color="#FFA800"
          fontWeight={600}
          fontSize={24}
        >
          {
            isLoading ? (
              <Skeleton width={100} height={30} />
            ) : (
              correctAnswersCount > 3 ? "آفرین!" : "حیف شد که!"
            )
          }
        </Typography>

        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={isLoading ? 1 : 0}>
          {isLoading ? (
            <Skeleton width={40} height={40} variant="circular" />
          ) : correctAnswersCount > 3 ? (
            <TickCircleIcon />
          ) : (
            <CrossCircleIcon />
          )}
          {isLoading ? (
            <Skeleton width={100} height={40} />
          ) : (
            correctAnswersCount !== null ? (
              <Typography
                fontSize={24}
                fontWeight={600}
                color={correctAnswersCount > 3 ? "#00D387" : "#E22D79"}
              >
                {correctAnswersCount > 3 ?
                  `${correctAnswersCount} پاسخ درست دادی` :
                  `${6 - correctAnswersCount} جواب غلط داشتی`}
              </Typography>
            ) : null
          )}
        </Stack>

        <Stack
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {isLoadingPlayerPerformance ? (
            <Skeleton width={100} height={30} />
          ) : (
            <ScoreChip value={correctAnswersCount * ASHBARIA_EXAM_QUESTION_COIN_REWARD} isLoading={isLoading} />
          )}
        </Stack>

        {isLoading ? (
          <Skeleton width={'100%'} height={40} />
        ) : (
          correctAnswersCount ? (
            fsm?.participant_limit - userCurrentFSM?.finished_players_count > 0 ?
              <Typography fontSize={16} fontWeight={400}>
                {`${toPersianNumber(fsm?.participant_limit - userCurrentFSM?.finished_players_count)} فرصت دیگه داری`}
              </Typography> :
              <Typography fontSize={16} fontWeight={400}>از همه‌ی فرصت‌هات استفاده کردی!</Typography>
          ) : null
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={() => startFSM({})}
          disabled={fsm?.participant_limit - userCurrentFSM?.finished_players_count <= 0 || isLoading}
          startIcon={<RefreshIcon />}
        >
          {"یه بار دیگه"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => localNavigate("/")}
        >
          برگردیم به خانه
        </Button>
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default ExamResultPage;
