import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { DiscountCodeType } from 'apps/film-bazi/types';

type DiscountCodeInfoPropsType = {
  discountCode: DiscountCodeType;
}

const DiscountCodeInfo: FC<DiscountCodeInfoPropsType> = ({ discountCode }) => {
  const {
    code,
    percentage,
    film,
    usage_count,
    max_uses,
    start_date,
    end_date,
  } = discountCode;

  return (
    <Card sx={{ width: '100%', boxShadow: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          کد تخفیف: {code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          درصد تخفیف: {toPersianNumber(percentage)}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          نام فیلم: {film.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          تعداد استفاده: {toPersianNumber(usage_count)} از {toPersianNumber(max_uses)}
        </Typography>
        {start_date && (
          <Typography variant="body2" color="text.secondary">
            Start Date: {new Date(start_date).toLocaleDateString()}
          </Typography>
        )}
        {end_date && (
          <Typography variant="body2" color="text.secondary">
            End Date: {new Date(end_date).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscountCodeInfo;