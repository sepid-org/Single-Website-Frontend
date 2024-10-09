import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { DiscountCodeType } from 'apps/film-bazi/types';
import moment from 'moment-jalaali';

moment.loadPersian({ usePersianDigits: true });

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
        {end_date && (
          <Typography variant="body2" color="text.secondary">
            تاریخ انقضا: {moment(end_date).format('jYYYY/jMM/jDD')}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DiscountCodeInfo;