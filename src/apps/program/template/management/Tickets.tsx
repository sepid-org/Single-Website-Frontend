import {
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { toPersianNumber } from 'commons/utils/translateNumber';
import { useParams } from 'react-router-dom';
import EditMerchandise from 'commons/components/organisms/EditMerchandise';
import CreateMerchandiseDialog from 'commons/components/organisms/dialogs/CreateMerchandiseDialog';
import { useGetMerchandisesQuery } from 'apps/website-display/redux/features/sales/Merchandise';
import { useDeleteDiscountCodeMutation, useGetProgramDiscountCodesQuery } from 'apps/website-display/redux/features/sales/DiscountCode';
import CreateDiscountCodeDialog from 'commons/components/organisms/dialogs/CreateDiscountCodeDialog';
import { useLazyGetProgramMerchandisesPurchasesFileQuery } from 'apps/website-display/redux/features/report/ReportSlice';
import { CMS_URL } from 'commons/constants/Constants';
import isValidURL from 'commons/utils/validators/urlValidator';
import downloadFromURL from 'commons/utils/downloadFromURL';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';

type TicketsTabPropsType = {}

const Tickets: FC<TicketsTabPropsType> = ({ }) => {
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [isCreateMerchandiseDialogOpen, setCreateMerchandiseDialogOpen] = useState(false);
  const [isCreateDiscountCodeDialogOpen, setCreateDiscountCodeDialogOpen] = useState(false);
  const { data } = useGetMerchandisesQuery({ programSlug }, { skip: !Boolean(program) });
  const merchandises = data?.results;
  const count = data?.count;

  const { data: discountCodes } = useGetProgramDiscountCodesQuery({ programSlug }, { skip: !Boolean(program) });
  const [deleteDiscountCode] = useDeleteDiscountCodeMutation();

  const handleDeleteDiscountCode = (discountCodeId) => {
    deleteDiscountCode({ discountCodeId })
  }

  const [trigger, result] = useLazyGetProgramMerchandisesPurchasesFileQuery();

  const downloadExcelExport = () => {
    trigger({ programSlug: program.registration_form })
  }

  useEffect(() => {
    if (result.isSuccess) {
      let url = result.data.file;
      if (!isValidURL(url)) {
        url = `${CMS_URL}${result.data.file}`;
      }
      downloadFromURL(url, `purchases.xlsx`);
    }
  }, [result.data])

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'بلیط‌ها'}
          </Typography>
          <Fragment>
            <Button variant='contained' onClick={() => setCreateMerchandiseDialogOpen(!isCreateMerchandiseDialogOpen)}>
              {'افزودن بلیط'}
            </Button>
            <CreateMerchandiseDialog open={isCreateMerchandiseDialogOpen} handleClose={() => setCreateMerchandiseDialogOpen(false)} />
          </Fragment>
        </Stack>
        <Stack spacing={4}>
          {merchandises?.map(merchandise =>
            <Stack key={merchandise.id}>
              <EditMerchandise merchandise={merchandise} />
            </Stack>
          )}
          {merchandises && count === 0 &&
            <Typography>{'بلیطی وجود ندارد.'}</Typography>
          }
        </Stack>
      </Stack>

      <Divider />

      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
          <Typography variant='h2' gutterBottom>
            {'بلیط‌های خریداری‌شده'}
          </Typography>
          <Button endIcon={<FileDownloadIcon />} variant='contained' onClick={downloadExcelExport} disabled={result.isLoading}>
            {'خروجی اکسل'}
          </Button>
        </Stack>
      </Stack>

      <Divider />

      <Stack>
        <Stack padding={2} paddingBottom={0} direction={'row'} alignItems={'start'} justifyContent={'space-between'}>
          <Typography variant='h2' gutterBottom>
            {'کدهای تخفیف'}
          </Typography>
          <Fragment>
            <Button variant='contained' onClick={() => setCreateDiscountCodeDialogOpen(!isCreateDiscountCodeDialogOpen)}>
              {'افزودن کد تخفیف'}
            </Button>
            <CreateDiscountCodeDialog open={isCreateDiscountCodeDialogOpen} handleClose={() => setCreateDiscountCodeDialogOpen(false)} />
          </Fragment>
        </Stack>

        <SimpleTable
          hideRowNumbersColumn={false}
          reverseRowNumber={true}
          headers={[
            { name: 'name', label: 'صاحب' },
            { name: 'code', label: 'کد تخفیف' },
            { name: 'value', label: 'میزان تخفیف' },
            { name: 'merchandises', label: 'بلیط‌ها' },
            { name: 'remaining', label: 'دفعات باقی‌مانده' },
            { name: 'limit', label: 'حداکثر میزان تخفیف (تومان)' },
            { name: 'operation', label: 'عملیات' },
          ]}
          rows={discountCodes?.map((discountCode) => ({
            name:
              discountCode?.user?.first_name && discountCode.user?.last_name ?
                `${discountCode.user.first_name} ${discountCode.user.last_name}` :
                '-'
            ,
            code: discountCode?.code,
            value: toPersianNumber(discountCode?.value),
            merchandises:
              <Stack spacing={1} alignItems={'center'}>
                {discountCode?.merchandises.map(merchandise => <Chip key={merchandise.id} label={`${merchandise.name}${merchandise.is_deleted ? ' (حذف‌شده)' : ''}`} />)}
              </Stack>,
            remaining: toPersianNumber(discountCode?.remaining),
            limit: discountCode?.max_discount_amount ? toPersianNumber(discountCode.max_discount_amount) : '-',
            operation:
              <IconButton size='small'
                onClick={() => { handleDeleteDiscountCode(discountCode?.id) }}>
                <ClearIcon />
              </IconButton>,
          }))}
          count={discountCodes?.length}
        />
      </Stack>
    </Stack >
  );
}

export default Tickets;