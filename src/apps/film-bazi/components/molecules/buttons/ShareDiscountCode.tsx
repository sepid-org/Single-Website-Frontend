import React, { FC } from "react";
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material';
import useShare from "commons/hooks/useShare";
import { DiscountCodeType } from "apps/film-bazi/types";
import { toPersianNumber } from "commons/utils/translateNumber";

type PropsType = {
  discountCode: DiscountCodeType;
}

const getShareText = (discountCode: DiscountCodeType) => {
  return (`
با این کد تخفیف، می‌تونی بلیت فیلم سینمایی ${discountCode.film.name} رو با ${toPersianNumber(discountCode.percentage)} درصد تخفیف تهیه کنی و یه تجربه‌ی جذاب رو رقم بزنی😍

کد تخفیف: ${discountCode.code}

لینک خرید: ${discountCode.film.gisheh7_link}
`);
}

const ShareDiscountCodeButton: FC<PropsType> = ({ discountCode }) => {
  const { share } = useShare();

  const handleShare = () => {
    share(getShareText(discountCode), 'متن دعوت‌نامه با موفقیت کپی شد')
  }

  return (
    <Tooltip title='اشتراک‌گذاری کد تخفیف' arrow>
      <IconButton onClick={handleShare}>
        <ShareIcon />
      </IconButton>
    </Tooltip>
  )
}


export default ShareDiscountCodeButton;