import {
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import SimpleTable from 'commons/components/organisms/tables/SimpleTable';
import { useAddMentorToFSMMutation, useGetFSMMentorsQuery, useRemoveMentorFromFSMMutation } from 'apps/website-display/redux/features/fsm/MentorSlice';

type MentorsPropsType = {}

const Mentors: FC<MentorsPropsType> = ({ }) => {
  const { fsmId } = useParams();
  const [username, setUsername] = useState<string>('');
  const [addMentorToFSM, addMentorToFSMResult] = useAddMentorToFSMMutation()
  const [removeMentorFromFSM] = useRemoveMentorFromFSMMutation()
  const { data: fsmMentors } = useGetFSMMentorsQuery({ fsmId });

  const addMentor = () => {
    addMentorToFSM({
      username,
      fsmId,
    });
  };

  useEffect(() => {
    if (addMentorToFSMResult.isSuccess) {
      setUsername('');
    }
  }, [addMentorToFSMResult])

  const removeMentor = (username) => {
    removeMentorFromFSM({
      fsmId,
      username,
    });
  }

  return (
    <Stack spacing={2} alignItems={'stretch'} justifyContent={'center'}>
      <Stack padding={2} spacing={2}>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant='h2'>
            {'همیاران کارگاه'}
          </Typography>
          <Tooltip title='همیار کارگاه تنها به تنظیمات یک کارگاه دسترسی دارد؛ از جمله می‌تواند محتوای کارگاه را ویرایش کند، پاسخ‌های شرکت‌کنندگان را تصحیح کند یا به درخواست آن‌ها پاسخ دهد.'>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={username}
                size="small"
                fullWidth
                variant="outlined"
                label="نام کاربری"
                name="username"
                inputProps={{ className: 'ltr-input' }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={!username}
                fullWidth
                variant="contained"
                color="primary"
                onClick={addMentor}>
                {'افزودن همیار جدید'}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

      <Divider />

      <SimpleTable
        headers={[
          { name: 'first_name', label: 'نام' },
          { name: 'last_name', label: 'نام خانوادگی' },
          { name: 'phone_number', label: 'شماره تماس' },
          { name: 'email', label: 'ایمیل' },
          { name: 'activities', label: 'عملیات' },
        ]}

        rows={fsmMentors?.map(mentor => ({
          ...mentor,
          activities:
            <Tooltip title='حذف همیار' arrow>
              <IconButton size='small'
                onClick={() => removeMentor(mentor.username)}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
        }))}
      />
    </Stack>
  );
}

export default Mentors;