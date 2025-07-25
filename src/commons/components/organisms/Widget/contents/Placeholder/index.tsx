import React, { JSX } from 'react';
import EditablePlaceholder from './edit';
import { Skeleton } from '@mui/material';
import ScaleToFit from './ScaleToFit';

import ExamTimer from './dynamics/ExamTimer';
import UserFirstName from './dynamics/UserFirstName';
import UserLastName from './dynamics/UserLastName';
import UserFullName from './dynamics/UserFullName';
import UserPhoneNumber from './dynamics/UserPhoneNumber';
import UserAvatar from './dynamics/UserAvatar';
import CurrencyAmount from './dynamics/CurrencyAmount';
import CurrencyRank from './dynamics/CurrencyRank';
import AnswerCount from './dynamics/AnswerCount';   // <— تازه

export { EditablePlaceholder };

type Props = { name: string };

const Placeholder: React.FC<Props> = ({ name }) => {
  const amountMatch = name?.match(/^user\\.resources\\.([^.]+)\\.amount$/);
  const rankMatch = name?.match(/^user\\.resources\\.([^.]+)\\.rank$/);

  let final: JSX.Element;

  switch (true) {
    case name === 'exam.timer':
      final = <ExamTimer />;
      break;

    case name === 'user.first_name':
      final = <UserFirstName />;
      break;

    case name === 'user.last_name':
      final = <UserLastName />;
      break;

    case name === 'user.full_name':
      final = <UserFullName />;
      break;

    case name === 'user.phone_number':
      final = <UserPhoneNumber />;
      break;

    case name === 'user.avatar':
      final = <UserAvatar />;
      break;

    case Boolean(amountMatch):
      final = <CurrencyAmount currency={amountMatch![1]} />;
      break;

    case Boolean(rankMatch):
      final = <CurrencyRank currency={rankMatch![1]} />;
      break;

    case name === 'user.answer-sheet.correct':
      final = <AnswerCount variant="correct" />;
      break;

    case name === 'user.answer-sheet.wrong':
      final = <AnswerCount variant="wrong" />;
      break;

    case name === 'user.answer-sheet.unknown':
      final = <AnswerCount variant="unknown" />;
      break;

    default:
      final = <Skeleton width={160} height={90} variant="rounded" />;
  }

  return <ScaleToFit>{final}</ScaleToFit>;
};

export default Placeholder;