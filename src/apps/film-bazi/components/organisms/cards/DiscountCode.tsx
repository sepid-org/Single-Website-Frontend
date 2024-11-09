import React, { FC } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { DiscountCodeType } from 'apps/film-bazi/types';
import moment from 'moment-jalaali';
import { Link } from 'react-router-dom';
import ShareDiscountCodeButton from '../../molecules/buttons/ShareDiscountCode';
import CopyDiscountCodeButton from '../../molecules/buttons/CopyDiscountCode';

moment.loadPersian({ usePersianDigits: true });

type PropsType = {
  discountCode: DiscountCodeType;
}

const DiscountCode: FC<PropsType> = ({ discountCode }) => {
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
    <Card sx={{ width: '100%', boxShadow: 3, position: 'relative' }}>
      <Box position={'absolute'} top={6} right={8}>
        <CopyDiscountCodeButton discountCode={discountCode} />
        <ShareDiscountCodeButton discountCode={discountCode} />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {code}
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
        {end_date &&
          <Typography variant="body2" color="text.secondary">
            تاریخ انقضا: {moment(end_date).format('jYYYY/jMM/jDD')}
          </Typography>
        }
        <Typography variant="body2" color="text.secondary">
          {'لینک خرید از سایت '}
          <Link
            to={film.gisheh7_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#ff4759', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
          >
            {'گیشه۷'}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiscountCode;