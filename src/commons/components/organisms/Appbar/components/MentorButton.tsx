import { Button } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { requestMentorAction } from 'apps/website-display/redux/slices/currentState';
import useWidth from 'commons/utils/UseWidth';
import { toast } from 'react-toastify';
import { useFSMStateContext } from 'commons/hooks/useFSMStateContext';
import { useParams } from 'react-router-dom';
import { useFSMContext } from 'commons/hooks/useFSMContext';


function MentorButton({ callMentor }) {
  const t = useTranslate();
  const fsmId = parseInt(useParams().fsmId);
  const { player } = useFSMContext();
  const { teamId } = useFSMStateContext();
  const [isEnable, setEnable] = useState(true);
  const width = useWidth();

  return (
    <Button
      size={'small'}
      variant="contained"
      color="primary"
      disabled={!isEnable}
      sx={{ fontSize: width == 'xs' ? 12 : 14 }}
      onClick={() => {
        callMentor({ player: player.id, teamId, fsmId: +fsmId })
        toast.success('درخواست شما با موفقیت ثبت شد.')
        setEnable(false);
        setTimeout(() => {
          setEnable(true);
        }, 60000)
      }}>
      {isEnable ? t('callMentor') : 'یک دقیقه صبر کنید'}
    </Button>
  );
}

export default connect(null, { callMentor: requestMentorAction })(MentorButton);
