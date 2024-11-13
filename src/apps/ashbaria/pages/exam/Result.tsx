import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import backgroundImg from "../../assets/login-background.jpg";
import FullScreenBackgroundImage from "apps/ashbaria/components/molecules/FullScreenBackgroundImage";
import TickCircleIcon from "apps/ashbaria/components/atoms/icons/TickCircle";
import CrossCircleIcon from "apps/ashbaria/components/atoms/icons/CrossCircle";
import ScoreChip from "apps/ashbaria/components/molecules/chips/Score";
import ChanceChip from "apps/ashbaria/components/molecules/chips/Chance";
import RefreshIcon from "apps/ashbaria/components/atoms/icons/Refresh";

type ExamResultPagePropsType = {};

const ExamResultPage: FC<ExamResultPagePropsType> = () => {

  const result = "success";

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
            result === "success" ?
              "آفرین! رفتی برای قرعه‌کشی!" :
              "حیف شد که!"
          }
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {result === "success" ?
            <TickCircleIcon /> :
            <CrossCircleIcon />
          }
          <Typography
            fontSize={24}
            fontWeight={600}
            color={result === "success" ? "#00D387" : "#E22D79"}
          >
            {
              result === "success" ?
                "۵ پاسخ درست دادی" :
                "۳ جواب غلط داشتی"
            }
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "90%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <ChanceChip value={5} />
          <ScoreChip value={200} />
        </Stack>
        <Typography fontSize={16} fontWeight={400}>۱ فرصت دیگه داری</Typography>
        <Button variant="contained" sx={{ width: "90%" }}>
          <RefreshIcon />
          یه بار دیگه
        </Button>
        <Button variant="outlined" sx={{ width: "90%" }}>
          برگردیم به خانه
        </Button>
      </Stack>
    </FullScreenBackgroundImage>);
};

export default ExamResultPage;
