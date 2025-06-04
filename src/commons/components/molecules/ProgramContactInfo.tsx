import React from "react";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import { toPersianNumber } from "commons/utils/translateNumber";
import { ProgramContactInfoType } from "commons/types/models";
import RubikaIcon from "../atoms/icons/Rubika";
import InstagramIcon from "../atoms/icons/Instagram";
import ShadIcon from "../atoms/icons/Shad";
import TelegramIcon from "../atoms/icons/Telegram";
import BaleIcon from "../atoms/icons/Bale";
import EitaaIcon from "../atoms/icons/Eitaa";
import WhatsappIcon from "../atoms/icons/Whatsapp";

type ProgramContactInfoPropsType = {
  programContactInfo: ProgramContactInfoType
}

const ProgramContactInfo: FC<ProgramContactInfoPropsType> = ({
  programContactInfo,
}) => {

  if (!programContactInfo) {
    return null;
  }

  const {
    bale_link,
    eitaa_link,
    instagram_link,
    phone_number,
    shad_link,
    telegram_link,
    whatsapp_link,
  } = programContactInfo;

  if (!bale_link && !eitaa_link && !instagram_link && !phone_number && !shad_link && !telegram_link && !whatsapp_link) {
    return null;
  }

  const socialMedias = [
    {
      icon: EitaaIcon,
      href: programContactInfo.eitaa_link,
    },
    {
      icon: BaleIcon,
      href: programContactInfo.bale_link,
    },
    {
      icon: TelegramIcon,
      href: programContactInfo.telegram_link,
    },
    {
      icon: ShadIcon,
      href: programContactInfo.shad_link,
    },
    {
      icon: InstagramIcon,
      href: programContactInfo.instagram_link,
    },
    {
      icon: RubikaIcon,
      href: programContactInfo.rubika_link,
    },
    {
      icon: WhatsappIcon,
      href: programContactInfo.whatsapp_link,
    },
  ]

  return (
    <Stack alignItems={'center'} spacing={3}>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-evenly'} alignContent={'space-between'}>
        {socialMedias.filter(socialMedia => socialMedia.href).map((socialMedia, index) =>
          <IconButton
            key={index}
            component="a"
            href={socialMedia.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              padding: 0,
              transition: 'transform 0.1s ease-in-out',
              ":hover": {
                transform: 'translateY(-0.1rem) scale(1.05)',
              }
            }}
          >
            <socialMedia.icon size={36} />
          </IconButton>
        )}
      </Stack>
      {programContactInfo.phone_number &&
        <Stack>
          <Typography fontSize={15} textAlign={'center'}>
            {'شماره پشتیبانی:'}
          </Typography>
          <Typography fontSize={20}>
            {toPersianNumber(programContactInfo.phone_number)}
          </Typography>
        </Stack>
      }
    </Stack>
  )
}

export default ProgramContactInfo;