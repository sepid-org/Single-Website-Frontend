import { Button, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import useStartFSM from "commons/hooks/fsm/useStartFSM";
import WhiteCupIcon from "apps/ashbaria/components/atoms/icons/WhiteCup";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { toPersianNumber } from "commons/utils/translateNumber";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import { MediaUrls } from "apps/ashbaria/constants/mediaUrls";

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

type StartExamPagePropsType = {};

const StartExamPage: FC<StartExamPagePropsType> = () => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: userFSMsStatus, isLoading: isUserFSMsLoading } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const [startFSM] = useStartFSM({ fsmId, redirectPath: '/program/ashbaria/exam/', reloadOnRedirect: true });
  const { data: fsm, isLoading: isFSMLoading } = useGetFSMQuery({ fsmId });

  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];
  const remainingParticipations = fsm?.participant_limit - userCurrentFSM?.finished_players_count;
  const isLoading = isUserFSMsLoading || isFSMLoading;

  return (
    <FullScreenBackgroundImage image={MediaUrls.SKY_AND_BUILDINGS} styles={{ padding: 2 }}>
      <Stack
        width={400}
        component={Paper}
        padding={2}
        paddingX={4}
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Stack spacing={2} width="100%" alignItems={'center'} justifyContent={'center'}>
            <Skeleton variant="rounded" width="60%" height={40} />
            <Skeleton variant="rounded" width="100%" height={40} />
            <Skeleton variant="rounded" width="100%" height={30} />
            <Skeleton variant="rounded" width="100%" height={30} />
            <Skeleton variant="rounded" width="40%" height={30} />
          </Stack>
        ) : (
          <>
            <Stack direction={'row'}>
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
              {remainingParticipations ?
                toPersianNumber(remainingParticipations) +
                " فرصت واسه شرکت توی آزمونک داری. با هر جواب درست توی آزمون ۴۰ اعتبار دادبستانی به‌دست میاری"
                :
                'فرصت‌های شرکت در آزمونت تموم شده :('
              }
            </Typography>
            <Button
              fullWidth
              variant="contained"
              disabled={isLoading || remainingParticipations === 0}
              onClick={() => startFSM({})}
            >
              برو که بریم!
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => localNavigate("/")}
            >
              فعلا بیخیالش!
            </Button>
            <Button
              fullWidth
              variant="text"
              size="large"
              sx={{
                color: "#FFA800",
              }}
              href='https://qandilsch.ir/product/10-raz-ashbaria/'
              target='_blank'
            >
              هنوز کتاب رو نخریدم :(
            </Button>
          </>
        )}
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default StartExamPage;
