import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toPersianNumber } from 'commons/utils/translateNumber';

type DiscountCodeType = {
  code: string;
  usageCount: number;
}

type DiscountDialogProps = {
  open: boolean;
  onClose: () => void;
  filmName: string;
  discountCode: DiscountCodeType;
};

const DiscountDialog: React.FC<DiscountDialogProps> = ({
  open,
  onClose,
  filmName,
  discountCode,
}) => {

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>{`کد تخفیف فیلم "${filmName}"`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`از کد تخفیف زیر برای دعوت دوستان خود به تماشای فیلم ${filmName} استفاده کنید.`}
        </DialogContentText>
        <Typography variant="h3" component="div" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
          {discountCode.code}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>
          {`تا حالا 🤩${toPersianNumber(discountCode.usageCount)} نفر از کد تخفیف شما استفاده کرده‌اند.`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose} color="primary">
          {'متوجه شدم'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DiscountDialog;