import {
  Stack,
} from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ProgramContactInfo from 'commons/components/molecules/ProgramContactInfo';
import { useGetProgramQuery, useGetProgramUserPermissionsQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import YourScore from '../atoms/buttons/YourScore';
import DashboardButton from '../atoms/buttons/DashboardButton';
import RankingIcon from '../atoms/icons/RankingIcon';
import ShareIcon from '../atoms/icons/ShareIcon';
import DashboardButton2 from '../atoms/buttons/DashboardButton2';
import useLocalNavigate from 'apps/film-bazi/hooks/useLocalNavigate';
import CupIcon from '../atoms/icons/CupIcon';

type DashboardSidebarPropsType = {}

const DashboardSidebar: FC<DashboardSidebarPropsType> = ({ }) => {
  const localNavigate = useLocalNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const { data: programPermissions } = useGetProgramUserPermissionsQuery({ programSlug });

  if (!program) return null;


  return (
    <Stack justifyContent={'space-between'} spacing={2} width={220}>
      <Stack spacing={1} sx={{ userSelect: 'none' }} alignItems={'center'}>
        <img src={program.cover_page} alt='program-cover-page' width={200} style={{ borderRadius: 8 }} />
      </Stack>
      <ProgramContactInfo programContactInfo={program.program_contact_info} />
      <Stack spacing={2} justifyContent={'space-between'}>
        <YourScore />
        <DashboardButton2 label='صندلی بازی' icon={<CupIcon />} onClick={() => { localNavigate(`/seats-game/`) }} />
        <DashboardButton2 label='پروفایل' onClick={() => { localNavigate(`/profile/`) }} />
        <DashboardButton label='جدول امتیازات' icon={<RankingIcon />} onClick={() => { localNavigate(`/scoreboard/`) }} />
        {/* <DashboardButton label='دوستاتو دعوت کن' icon={<ShareIcon />} /> */}
        {programPermissions?.is_manager &&
          <DashboardButton label='مدیریت دوره' onClick={() => { localNavigate(`/admin-dashboard/`) }} />
        }
      </Stack>
    </Stack>
  );
}

export default DashboardSidebar;
