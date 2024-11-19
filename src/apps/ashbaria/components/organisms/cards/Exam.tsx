import { Box, Paper, Stack, Typography } from "@mui/material";
import { Golden } from "apps/film-bazi/constants/colors";
import React, { FC } from "react";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import { useParams } from "react-router-dom";
import { useGetProgramUserFSMsStatusQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import { toPersianNumber } from "commons/utils/translateNumber";

type ExamCardPropsType = {}

const fsmId = process.env.NODE_ENV === 'development' ? 213 : 213;

const ExamCard: FC<ExamCardPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();

  const { programSlug } = useParams();
  const { data: userFSMsStatus, isLoading: isUserFSMsLoading } = useGetProgramUserFSMsStatusQuery({ programSlug });
  const { data: fsm, isLoading: isFSMLoading } = useGetFSMQuery({ fsmId });
  const userCurrentFSM = userFSMsStatus?.filter(userFSM => userFSM.fsm_id === fsmId)[0];
  const isLoading = isUserFSMsLoading || isFSMLoading;
  const remainingParticipations = isLoading ? 0 : fsm?.participant_limit - userCurrentFSM?.finished_players_count;
  const disabled = isLoading || remainingParticipations === 0;

  const onClick = () => {
    if (!disabled) {
      localNavigate(`/start-exam/`);
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s ease',
        opacity: disabled ? 0.6 : 1,
        '&:hover': {
          transform: disabled ? 'none' : 'scale(1.02)',
        },
      }}
      onClick={onClick}
    >
      <Stack
        width={'100%'}
        height={'100%'}
        component={Paper}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
        padding={1}
        sx={{
          borderRadius: 6,
          backgroundColor: disabled ? 'rgba(0, 0, 0, 0.04)' : 'inherit'
        }}
      >
        <Typography
          fontSize={14}
          fontWeight={600}
          color={Golden}
          textAlign={'center'}
        >
          {'آزمونک'}
        </Typography>
        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
          <Typography
            fontSize={10}
            fontWeight={800}
            color={disabled ? 'text.disabled' : 'inherit'}
          >
            {`${toPersianNumber(remainingParticipations || 0)} فرصت باقی‌مانده`}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default ExamCard;