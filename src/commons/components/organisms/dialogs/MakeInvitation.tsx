import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import isNumber from 'commons/utils/validators/isNumber';
import { useInviteMemberMutation } from 'apps/website-display/redux/features/team/InvitationSlice';
import PhoneNumberInput from 'commons/components/molecules/profile-inputs/PhoneNumberInput';

type MakeInvitationDialogPropsType = {
  handleClose: any;
  teamId: string;
  open: boolean;
}

const MakeInvitationDialog: FC<MakeInvitationDialogPropsType> = ({
  handleClose,
  teamId,
  open,
}) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [inviteMember, { isSuccess }] = useInviteMemberMutation();

  const sendInvitation = () => {
    if (!phoneNumber) return;
    inviteMember({ teamId, username: phoneNumber });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setPhoneNumber('');
    }
  }, [isSuccess])

  return (
    <Dialog disableScrollLock maxWidth="sm" open={open} onClose={handleClose}>
      <DialogContent>
        <Typography gutterBottom>
          {'شماره تلفن فرد مورد نظر را وارد کنید.'}
        </Typography>
        <PhoneNumberInput
          setPhoneNumber={(value) => {
            setPhoneNumber(value);
          }}
          phoneNumber={phoneNumber}
          label={undefined}
          editable={false}
          placeHolder={'مثال: 09123456789'}
          isRequired={false}
          textDir={"ltr"}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={sendInvitation}>
          {'ارسال دعوت‌نامه'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MakeInvitationDialog;