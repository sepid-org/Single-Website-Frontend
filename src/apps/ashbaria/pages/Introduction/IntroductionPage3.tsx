import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import React, { FC, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import AshbariaPoster from "apps/ashbaria/components/atoms/icons/AshbariaPoster";
import useLocalNavigate from "apps/ashbaria/hooks/useLocalNavigate";
import BuyBookButton from "apps/ashbaria/components/molecules/buttons/BuyBook";
import bg from "../../assets/introductionPage3.svg";
import CustomDocumentPagination from "apps/ashbaria/components/molecules/CustomPagination";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type IntroductionPage3PropsType = {}

const IntroductionPage3: FC<IntroductionPage3PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const localNavigate = useLocalNavigate();

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        xs={7}
        sx={{
          minHeight: "100%",
          background: "linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: 2
        }}
      >
        <Stack 
          paddingY={{
            xs: 1,
            md: 10
          }}
          spacing={5}
          alignItems={"center"}
        >
          <Typography align='justify'>
            لازمه بگم که اگه کتاب رو هنوز نخوندید هم می‌تونید مسابقه رو شروع کنید، ولی اگه دوست دارین توی کورس رقابت باقی بمونین، لازمه قبل از بازی اون رو مطالعه کنید، چون که خیلی جاها به اطلاعاتی که داخل کتاب اومده نیاز پیدا می‌کنید.
            از این لینک می‌تونید کتاب رو تهیه کنید.
          </Typography>
          <BuyBookButton />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#00000066",
              border: "1px solid #FE9C42",
              color: "#FE9C42",
            }}
            onClick={() => setSearchParams({ page: "2" })}
          >
            <ArrowForwardIcon />
          </IconButton>
          <CustomDocumentPagination numberOfPages={3} currentPage={3} setCurrentPage={setSearchParams} />
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#130e15",
            }}
            onClick={() => { }}
          >
            {"شروع بازی"}
            <ArrowBackIcon />
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default IntroductionPage3;
