import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import VerifyPhoneNumber from 'commons/components/molecules/VerifyPhoneNumber';
import { useChangePhoneNumberMutation } from 'commons/redux/apis/party/UserApi';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ChangePhoneNumberDialogPropsType = {
  open: boolean;
  handleClose: any;
}

const ChangePhoneNumberDialog: FC<ChangePhoneNumberDialogPropsType> = ({
  open,
  handleClose,
}) => {
  const initialData = {
    phoneNumber: '',
    verificationCode: '',
  }
  const [data, setData] = useState(initialData);
  const [changePhoneNumber, result] = useChangePhoneNumberMutation();

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('شماره تلفن همراه با موفقیت تغییر کرد.')
      setData(initialData);
      handleClose();
    }
  }, [result])

  const onClick = () => {
    changePhoneNumber({ phone_number: data.phoneNumber, code: data.verificationCode });
  }

  return (
    <Dialog disableScrollLock open={open} onClose={handleClose}>
      <DialogTitle>{'تغییر شماره تلفن همراه'}</DialogTitle>
      <DialogContent sx={{ paddingTop: '8px !important' }}>
        <VerifyPhoneNumber
          verificationType='change-user-phone-number'
          data={data}
          setData={setData}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
          disabled={!data.phoneNumber || !data.verificationCode}>
          {'ثبت'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePhoneNumberDialog;
