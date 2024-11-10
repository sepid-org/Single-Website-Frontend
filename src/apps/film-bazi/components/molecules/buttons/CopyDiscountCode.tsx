import React, { FC } from "react";
import { IconButton, Tooltip } from '@mui/material';
import { DiscountCodeType } from "apps/film-bazi/types";
import copyToClipboard from "commons/utils/CopyToClipboard";
import { ContentCopy } from "@mui/icons-material";

type PropsType = {
  discountCode: DiscountCodeType;
}

const CopyDiscountCodeButton: FC<PropsType> = ({ discountCode }) => {

  const copyToClipboardWrapper = () => {
    if (discountCode) {
      copyToClipboard(discountCode.code, 'کد تخفیف با موفقیت کپی شد');
    }
  };

  return (
    <Tooltip title='کپی‌کردن کد تخفیف' arrow>
      <IconButton onClick={copyToClipboardWrapper} color="primary">
        <ContentCopy />
      </IconButton>
    </Tooltip>
  )
}

export default CopyDiscountCodeButton;