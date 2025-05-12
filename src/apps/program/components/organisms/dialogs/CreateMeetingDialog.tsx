import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';
import { useCreateMeetingMutation } from 'apps/program/redux/slices/MeetingSlice';
import { MeetingType } from 'apps/program/template/types';
import MeetingInfo from '../forms/MeetingInfo';

type CreateMeetingDialogProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateMeetingDialog: FC<CreateMeetingDialogProps> = ({ open, handleClose }) => {
  const { programSlug } = useParams<{ programSlug: string }>();
  const { data: program } = useGetProgramQuery({ programSlug });
  const [createMeeting, result] = useCreateMeetingMutation();

  const [meetingData, setMeetingData] = useState<Partial<MeetingType>>({
    title: '',
    description: '',
    start_time: '',
    end_time: '',
    location_type: 'online',
  });

  // On success, notify and close
  useEffect(() => {
    if (result.isSuccess) {
      toast.success('جلسه با موفقیت ساخته شد.');
      handleClose();
      setMeetingData({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location_type: 'online',
      });
    }
  }, [result.isSuccess]);

  const handleCreate = () => {
    if (!meetingData.title) {
      toast.error('لطفاً یک عنوان مناسب انتخاب کنید.');
      return;
    }
    if (!meetingData.start_time || !meetingData.end_time) {
      toast.error('لطفاً زمان آغاز و پایان جلسه را تعیین کنید.');
      return;
    }
    createMeeting({
      ...meetingData,
      program: parseInt(program?.id),
    } as Omit<MeetingType, 'id' | 'created_at' | 'updated_at' | 'duration'>);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{'ایجاد جلسه جدید'}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{'مشخصات جلسه را وارد کنید:'}</Typography>
        <MeetingInfo data={meetingData} setData={setMeetingData} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => {
          handleClose();
          setMeetingData({
            title: '',
            description: '',
            start_time: '',
            end_time: '',
            location_type: 'online',
          });
        }}>
          {'انصراف'}
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          {'ایجاد'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMeetingDialog;