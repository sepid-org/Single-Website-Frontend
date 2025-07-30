import React, { FC, JSX, useMemo } from 'react';
import { Skeleton } from '@mui/material';
import { useFSMContext } from 'commons/hooks/useFSMContext';
import ScaleToFit from './ScaleToFit';
import EditablePlaceholder from './edit';

import ExamTimer from './dynamics/ExamTimer';
import UserFirstName from './dynamics/UserFirstName';
import UserLastName from './dynamics/UserLastName';
import UserFullName from './dynamics/UserFullName';
import UserPhoneNumber from './dynamics/UserPhoneNumber';
import UserAvatar from './dynamics/UserAvatar';
import CurrencyAmount from './dynamics/CurrencyAmount';
import CurrencyRank from './dynamics/CurrencyRank';
import AnswerCount from './dynamics/AnswerCount';

export { EditablePlaceholder };

type Props = { name: string };

const Placeholder: FC<Props> = ({ name }) => {
  const { dynamicObjects } = useFSMContext();

  const builtIn: JSX.Element = useMemo(() => {
    const amountMatch = name.match(/^user\.resources\.([^.]+)\.amount$/);
    if (amountMatch) return <CurrencyAmount currency={amountMatch[1]} />;

    const rankMatch = name.match(/^user\.resources\.([^.]+)\.rank$/);
    if (rankMatch) return <CurrencyRank currency={rankMatch[1]} />;

    const staticMap: Record<string, JSX.Element> = {
      'exam.timer': <ExamTimer />,
      'user.first_name': <UserFirstName />,
      'user.last_name': <UserLastName />,
      'user.full_name': <UserFullName />,
      'user.phone_number': <UserPhoneNumber />,
      'user.avatar': <UserAvatar />,
      'user.answer-sheet.correct': <AnswerCount variant="correct" />,
      'user.answer-sheet.wrong': <AnswerCount variant="wrong" />,
      'user.answer-sheet.unknown': <AnswerCount variant="unknown" />,
    };

    return (
      staticMap[name] ?? (
        <Skeleton width={160} height={90} variant="rounded" />
      )
    );
  }, [name]);

  const DynamicComp = dynamicObjects?.[name];
  if (DynamicComp) {
    return (
      <ScaleToFit>
        <DynamicComp />
      </ScaleToFit>
    );
  }

  return <ScaleToFit>{builtIn}</ScaleToFit>;
};

export default Placeholder;