import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useGetProgramQuery } from "apps/website-display/redux/features/program/ProgramSlice";
import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import backgroundImg from "../../assets/profileBackground.svg"
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { toEnglishNumber } from "commons/utils/translateNumber";

type EnterPhoneNumberPropsType = {}

const EnterPhoneNumber: FC<EnterPhoneNumberPropsType> = () => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug })
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // چه‌جوری یه پیپر توش بندازم؟ پیپری که آبجکت کاستوم/پلیس‌هولkدر هم می‌گیره

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(toEnglishNumber(e.target.value))
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Stack maxWidth={'sm'} component={Paper} padding={2} spacing={4}>
        <ProgramLogo />
        <Stack spacing={1}>
          <Typography>
            {'بی‌زحمت شماره موبایلتو بزن:'}
          </Typography>
          <TextField
            value={phoneNumber}
            placeholder='09123456789'
            onChange={handleChangePhoneNumber}
            inputProps={{ dir: 'ltr' }}
          />
        </Stack>

        <Button variant='contained'>
          {'ورود'}
        </Button>
      </Stack>
    </Box>
  );
};

export default EnterPhoneNumber;
