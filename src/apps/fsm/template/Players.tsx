import {
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import { useGetFSMMentorsQuery } from 'apps/fsm/redux/slices/fsm/MentorSlice';
import { useLazyGetAnswerSheetsFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';
import isValidURL from 'commons/utils/validators/urlValidator';
import { CMS_URL } from 'commons/configs/Constants';
import downloadFromURL from 'commons/utils/downloadFromURL';

type PropsType = {}

const Players: FC<PropsType> = ({ }) => {
  const fsmId = parseInt(useParams().fsmId);
  const { data: fsmMentors } = useGetFSMMentorsQuery({ fsmId });
  const [trigger, result] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = () => {
    trigger({ fsmId })
  }
  useEffect(() => {
    if (result.isSuccess) {
      let url = result.data.file;
      if (!isValidURL(url)) {
        url = `${CMS_URL}${result.data.file}`;
      }
      downloadFromURL(url, `answer-sheets.xlsx`);
    }
  }, [result.data])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant='h2'>
          {'شرکت‌کنندگان'}
        </Typography>
        <Tooltip title='هر بار شرکت در کارگاه، اینجا نمایش داده می‌شود.'>
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider />

      <Stack spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'پاسخ‌های داده شده'}
          </Typography>
          <Button variant='contained' onClick={downloadExcelExport} disabled={result.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
      </Stack>

      <Divider />

      <SimpleTable
        headers={[
          { name: 'first_name', label: 'نام' },
          { name: 'last_name', label: 'نام خانوادگی' },
          { name: 'phone_number', label: 'شماره تماس' },
          { name: 'email', label: 'ایمیل' },
        ]}

        rows={fsmMentors?.map(mentor => ({
          ...mentor,
        }))}
      />
    </Stack>
  );
}

export default Players;