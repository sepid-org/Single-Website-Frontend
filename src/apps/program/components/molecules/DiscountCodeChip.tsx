import React from "react";
import {
  Chip,
} from "@mui/material";
import { DiscountCodeType } from "commons/types/models";
import { toPersianNumber } from "commons/utils/translateNumber";


const DiscountCodeChip: React.FC<{ code: DiscountCodeType }> = ({ code }) => (
  <Chip
    label={`کد تخفیف: ${code.code} (٪${toPersianNumber(Math.round(code.value * 100))})`}
    size="small"
    variant="outlined"
    sx={{ direction: "ltr" }}
  />
);

export default DiscountCodeChip;