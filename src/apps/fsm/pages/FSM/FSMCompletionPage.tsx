import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import FullScreenBackgroundImage from "commons/components/molecules/FullScreenBackgroundImage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFSMQuery } from "apps/fsm/redux/slices/fsm/FSMSlice";
import PlayerPerformance from "../../template/PlayerPerformance";
import Confetti from 'react-confetti'

type PropsType = {
  playerId: number;
};

const FSMCompletionPage: FC<PropsType> = ({
  playerId,
}) => {
  const fsmId = parseInt(useParams().fsmId);
  const navigate = useNavigate();
  const { data: fsm } = useGetFSMQuery({ fsmId });

  if (!fsm) {
    return null;
  }

  return (
    <FullScreenBackgroundImage styles={{ padding: 2 }}>
      <Stack
        maxWidth={'sm'}
        component={Paper}
        padding={2}
        paddingX={4}
        spacing={2}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography variant="h1" fontWeight={600} textAlign={'center'} gutterBottom>
          {`شما ${fsm.name} را به پایان رساندید 🥳`}
        </Typography>

        {fsm.show_player_performance_on_end &&
          <PlayerPerformance playerId={playerId} />
        }

        {fsm.program_slug ?
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate(`/program/${fsm.program_slug}/`)}
          >
            {'بازگشت به دوره'}
          </Button> :
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/')}
          >
            {'بازگشت به خانه'}
          </Button>
        }
      </Stack>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        gravity={0.4}
        tweenDuration={3000}
        numberOfPieces={600}
      />
    </FullScreenBackgroundImage>
  );
};

export default FSMCompletionPage;