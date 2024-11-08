import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material';
import copyToClipboard from 'commons/utils/CopyToClipboard';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';


type ShareProgramButtonPropsType = {}

const ShareProgramButton: FC<ShareProgramButtonPropsType> = ({

}) => {
  const { programSlug } = useParams();

  function copyToClipboardWrapper() {
    copyToClipboard(
      `${window.location.origin}/program/${programSlug}/`,
      'لینک اشتراک دوره با موفقیت کپی شد',
      'مشکلی در کپی‌کردن لینک وجود داشت'
    );
  }

  return (
    <Tooltip title='لینک اشتراک دوره' arrow>
      <IconButton onClick={copyToClipboardWrapper}>
        <ShareIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
}

export default ShareProgramButton;
