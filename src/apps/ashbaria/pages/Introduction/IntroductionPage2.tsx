import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import { useSearchParams } from "react-router-dom";

type IntroductionPage2PropsType = {}

const IntroductionPage2: FC<IntroductionPage2PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Stack width={500} component={Paper} padding={2} spacing={2}>
      {/* <ProgramLogo /> */}
      <Typography align='justify'>
        اسم کامل کتابی که گفتم اینه: "ده راز آشباریا؛ ده اصل طلایی که به من آموخت چگونه مخ مردم را بار فرغون کنم" یه داستان بلند طنز که ماجرای سفر یه روزنامه‌نگار بخت برگشته رو به سرزمین ناشناختۀ آشباریا تعریف می‌کنه. جایی که آدما داخلش به جای روززنامه و تلویزیون و اینترنت و موبایل، با یه سری لوله اخبار و پیام‌ها رو رد و بدل می‌کنن و ظاهراً خوب هم میدونن چطوری به وسیلۀ اونا سر هم کلاه بذارن. شخصیت اصلی داستان توی این کتاب داره همین ها رو توضیح میده. روش‌هایی که توی آشباریا واسه شیره مالیدن سر مردم استفاده می‌شد. امیدوارم دونستن اونا به درد شما هم بخوره (البته در جهت مثبتش :)‌ )
      </Typography>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Button onClick={() => setSearchParams({ page: "1" })}>
          {'بازگشت'}
        </Button>
        <Button onClick={() => setSearchParams({ page: "3" })}>
          {'بعدی'}
        </Button>
      </Stack>
    </Stack>
  );
};

export default IntroductionPage2;
