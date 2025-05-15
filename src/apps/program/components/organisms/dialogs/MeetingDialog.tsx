import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import MeetingInfo from '../forms/MeetingInfo';
import { MeetingType } from 'apps/program/template/types';
import {
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} from 'apps/program/redux/slices/MeetingSlice';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import AreYouSure from 'commons/components/organisms/dialogs/AreYouSure';

/**
 * Combined Create/Edit/Delete Meeting Dialog with confirmation dialog
 */
type MeetingDialogProps = {
  open: boolean;
  handleClose: () => void;
  meeting?: MeetingType;
};

export const MeetingDialog: FC<MeetingDialogProps> = ({ open, handleClose, meeting }) => {
  const { programSlug } = useParams<{ programSlug: string }>();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [createMeeting, createResult] = useCreateMeetingMutation();
  const [updateMeeting, updateResult] = useUpdateMeetingMutation();
  const [deleteMeeting, deleteResult] = useDeleteMeetingMutation();

  const [meetingData, setMeetingData] = useState<Partial<MeetingType>>({
    title: '',
    description: '',
    start_time: '',
    duration: '',
    location_type: 'online',
  });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Populate fields when editing or resetting when creating
  useEffect(() => {
    if (open) {
      if (meeting) {
        setMeetingData({
          title: meeting.title,
          description: meeting.description,
          start_time: meeting.start_time,
          duration: meeting.duration,
          location_type: meeting.location_type,
        });
      } else {
        setMeetingData({
          title: '',
          description: '',
          start_time: '',
          duration: '',
          location_type: 'online',
        });
      }
    }
  }, [meeting, open]);

  // Handle API success
  useEffect(() => {
    if (createResult.isSuccess) {
      toast.success('جلسه با موفقیت ساخته شد.');
      handleClose();
    }
    if (updateResult.isSuccess) {
      toast.success('جلسه با موفقیت ویرایش شد.');
      handleClose();
    }
    if (deleteResult.isSuccess) {
      toast.success('جلسه با موفقیت حذف شد.');
      handleClose();
    }
  }, [createResult.isSuccess, updateResult.isSuccess, deleteResult.isSuccess]);

  const handleSubmit = () => {
    if (!meetingData.title) return toast.error('لطفاً یک عنوان مناسب انتخاب کنید.');
    if (!meetingData.start_time || !meetingData.duration)
      return toast.error('لطفاً زمان آغاز و پایان جلسه را تعیین کنید.');

    const payload = {
      ...meetingData,
      program: parseInt(program?.id || '0', 10),
    } as Omit<MeetingType, 'id' | 'created_at' | 'updated_at'>;

    if (meeting) {
      updateMeeting({ meeting_id: meeting.meeting_id, changes: payload });
    } else {
      createMeeting(payload);
    }
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (meeting) {
      deleteMeeting({ meetingId: meeting.meeting_id, programId: parseInt(program.id) });
    }
    setConfirmOpen(false);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Dialog open={open} maxWidth="sm" fullWidth>
        <DialogTitle>
          {meeting ? 'ویرایش جلسه' : 'ایجاد جلسه جدید'}
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            {meeting ? 'مشخصات جلسه را ویرایش کنید:' : 'مشخصات جلسه را وارد کنید:'}
          </Typography>
          <MeetingInfo data={meetingData} setData={setMeetingData} />
        </DialogContent>
        <DialogActions sx={{ justifyContent: meeting ? 'space-between' : 'flex-end' }}>
          {meeting && (
            <Button variant="text" color="error" onClick={handleDeleteClick}>
              حذف جلسه
            </Button>
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={handleClose}>
              انصراف
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {meeting ? 'ذخیره' : 'ایجاد'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <AreYouSure
        open={confirmOpen}
        handleClose={handleConfirmClose}
        callBackFunction={handleConfirm}
      />
    </>
  );
};

export default MeetingDialog;