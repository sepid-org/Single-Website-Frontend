import React from 'react';
import EditablePlaceholder from './edit';

import { Box, Skeleton } from '@mui/material';
import ExamTimer from './dynamics/ExamTimer';
import UserFullName from './dynamics/UserFullName';
import UserAvatar from './dynamics/UserAvatar';
import CurrencyAmount from './dynamics/CurrencyAmount';
import CurrencyRank from './dynamics/CurrencyRank';
import ScaleToFit from './ScaleToFit';
import UserPhoneNumber from './dynamics/UserPhoneNumber';
import UserFirstName from './dynamics/UserFirstName';
import UserLastName from './dynamics/UserLastName';

export { EditablePlaceholder };

type Props = { name: string };

const Placeholder: React.FC<Props> = ({ name }) => {
  /* الگوهای داینامیک */
  const amountMatch = name.match(/^user\.resources\.([^.]+)\.amount$/);
  const rankMatch = name.match(/^user\.resources\.([^.]+)\.rank$/);

  let finalComponent = null;

  switch (true) {
    case name === 'exam.timer':
      finalComponent = <ExamTimer />;
      break;

    case name === 'user.first_name':
      finalComponent = <UserFirstName />;
      break;

    case name === 'user.last_name':
      finalComponent = <UserLastName />;
      break;

    case name === 'user.full_name':
      finalComponent = <UserFullName />;
      break;

    case name === 'user.phone_number':
      finalComponent = <UserPhoneNumber />;
      break;

    case name === 'user.avatar':
      finalComponent = <UserAvatar />;
      break;

    case Boolean(amountMatch):
      finalComponent = <CurrencyAmount currency={amountMatch![1]} />;
      break;

    case Boolean(rankMatch):
      finalComponent = <CurrencyRank currency={rankMatch![1]} />;
      break;

    default:
      finalComponent = <Skeleton width={160} height={90} variant="rounded" />

      break;
  }

  return (
    <ScaleToFit>
      {finalComponent}
    </ScaleToFit>
  );
};

export default Placeholder;
