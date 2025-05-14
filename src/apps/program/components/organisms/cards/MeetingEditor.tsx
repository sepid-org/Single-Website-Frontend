import React, { FC, Fragment, useState } from 'react';
import {
  Button,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { CopyAll as CopyIcon, Edit as EditIcon } from '@mui/icons-material';
import copyToClipboard from 'commons/utils/CopyToClipboard';
import { MeetingType } from 'apps/program/template/types';
import { useLazyGetJoinMeetingLinkQuery } from 'apps/program/redux/slices/MeetingSlice';
import MeetingDialog from '../dialogs/MeetingDialog';
import { formatDuration, formatStart } from 'apps/program/utils';

/**
 * Meeting Card with Edit capability
 */
type PropsType = { meeting: MeetingType };

const MeetingEditorCard: FC<PropsType> = ({ meeting }) => {

  const [triggerJoin] = useLazyGetJoinMeetingLinkQuery();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCopyLink = async (asModerator: boolean) => {
    try {
      const result = await triggerJoin({ meetingId: meeting.meeting_id, asModerator });
      const url = result.data?.join_url;
      if (url) copyToClipboard(url, 'پیوند جلسه با موفقیت کپی شد');
    } catch (err) {
      console.error('Error fetching join link', err);
    }
  };

  return (
    <Fragment>
      <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
        <CardHeader
          title={meeting.title || 'بدون عنوان'}
          subheader={`آغاز: ${formatStart(meeting.start_time)}`}
          titleTypographyProps={{ variant: 'h4' }}
          subheaderTypographyProps={{ variant: 'subtitle2' }}
          action={
            <IconButton
              aria-label="ویرایش جلسه"
              onClick={() => setDialogOpen(true)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <EditIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>توضیحات:</strong> {meeting.description || 'بدون توضیحات'}
            </Typography>
            <Typography variant="body2">
              <strong>مدت:</strong> {formatDuration(meeting.duration)}
            </Typography>

          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
          <Stack alignItems="start">
            <Button onClick={() => handleCopyLink(true)} startIcon={<CopyIcon />}>
              پیوند ارائه‌دهنده
            </Button>
            <Button onClick={() => handleCopyLink(false)} startIcon={<CopyIcon />}>
              پیوند شرکت‌کننده
            </Button>
          </Stack>
        </CardActions>
      </Card>

      {/* Edit Dialog */}
      <MeetingDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} meeting={meeting} />
    </Fragment>
  );
};

export default MeetingEditorCard;