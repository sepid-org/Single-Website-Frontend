import {
  Stack,
} from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProgramContactInfo from 'commons/components/molecules/ProgramContactInfo';
import { useGetProgramQuery, useGetProgramUserPermissionsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import MyScoresChip from '../atoms/chips/MyScoresChip';
import DashboardButton from '../atoms/buttons/DashboardButton';
import RankingIcon from '../atoms/icons/RankingIcon';
import DashboardButton2 from '../atoms/buttons/DashboardButton2';
import useLocalNavigate from 'apps/film-bazi/hooks/useLocalNavigate';
import CupIcon from '../atoms/icons/CupIcon';
import MovieIcon from '../atoms/icons/MovieIcon';
import TicketIcon from '../atoms/icons/Ticket';
import MyCapitalChip from '../atoms/chips/MyCapital';
import MyRankChip from '../atoms/chips/MyRank';
import MyInfoChip from '../atoms/chips/MyInfo';

type DashboardSidebarPropsType = {
  tab: 'films' | 'games';
}

const DashboardSidebar: FC<DashboardSidebarPropsType> = ({
  tab,
}) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: programPermissions } = useGetProgramUserPermissionsQuery({ programSlug });

  if (!program) return null;

  return (
    <Stack justifyContent={'space-between'} spacing={2} width={220}>
      <Stack spacing={1} sx={{ userSelect: 'none' }} alignItems={'center'}>
        <img src={program.cover_image} alt='program-cover-page' width={200} style={{ borderRadius: 8 }} />
      </Stack>
      <ProgramContactInfo programContactInfo={program.program_contact_info} />
      <Stack spacing={2} justifyContent={'space-between'}>
        <MyInfoChip />
        {tab === 'films' ?
          <DashboardButton2 label='بازی‌ها' icon={<CupIcon />} onClick={() => { localNavigate(`/games/`) }} /> :
          <DashboardButton2 label='فیلم‌ها' icon={<MovieIcon />} onClick={() => { localNavigate(`/films/`) }} />
        }
        <DashboardButton label='سرمایه من' icon={<TicketIcon />} onClick={() => { localNavigate(`/capital/`) }} />
        <DashboardButton label='جدول امتیازات' icon={<RankingIcon />} onClick={() => { localNavigate(`/scoreboard/`) }} />
        {programPermissions?.is_manager &&
          <DashboardButton label='مدیریت دوره' onClick={() => { localNavigate(`/admin-dashboard/`) }} />
        }
      </Stack>
    </Stack>
  );
}

export default DashboardSidebar;
