import {
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { useLazyGetAnswerSheetsFileQuery } from 'commons/redux/apis/reporting-service/ReportingServiceSlice';
import downloadBlob from 'commons/utils/downloadBlob';
import { useGetFormQuery } from 'apps/website-display/redux/features/form/FormSlice';

type PropsType = {}

const Responses: FC<PropsType> = ({ }) => {
  const { formSlug } = useParams();
  const { data: form } = useGetFormQuery({ formSlug });
  const [trigger, result] = useLazyGetAnswerSheetsFileQuery();

  const downloadExcelExport = async () => {
    try {
      const blob = await trigger({ formId: parseInt(form.id) }).unwrap();
      downloadBlob(blob, `answer_sheets_${form.id}.xlsx`);
    } catch (e) {
      console.error('Export failed', e);
    }
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography variant='h2'>
          {'پاسخ‌ها'}
        </Typography>
        <Tooltip title='هر بار پاسخ به فرم، اینجا نمایش داده می‌شود.'>
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

      {/* <SimpleTable
        headers={[
          { name: 'first_name', label: 'نام' },
          { name: 'last_name', label: 'نام خانوادگی' },
        ]}
        rows={[]}
      /> */}
    </Stack>
  );
}

export default Responses;