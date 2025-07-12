import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Stack,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';
import ProgramLogo from 'commons/components/atoms/logos/ProgramLogo';
import { useGetMeetingQuery, useJoinMeetingMutation } from '../redux/slices/MeetingSlice';

const JoinMeeting: FC = () => {
  const { programSlug, meetingId } = useParams<{ programSlug: string; meetingId: string }>();
  const { data: meeting } = useGetMeetingQuery({ meetingId });
  const [mode, setMode] = useState<'guest' | 'admin'>('guest');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [joinMeeting, { isLoading }] = useJoinMeetingMutation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setError(null);
    setMode(newValue === 0 ? 'guest' : 'admin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fullName.trim()) {
      setError('لطفاً نام کامل خود را وارد کنید.');
      return;
    }

    try {
      const response = await joinMeeting({
        meetingId: meetingId!,
        fullName,
        password: mode === 'admin' ? password : undefined,
      }).unwrap();

      // هدایت به URL جلسه
      window.location.href = response.join_url;
    } catch (err: any) {
      const msg = err?.data?.detail || err.error;
      setError(msg);
    }
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack spacing={4} alignItems="center" width={400}>
        <Box pb={2}>
          <ProgramLogo size="large" />
        </Box>

        <Paper sx={{ width: '100%', p: 3 }}>
          <Typography textAlign={'center'} variant='h2' component='h1' gutterBottom>
            {`ورود به ${meeting?.title}`}
          </Typography>

          <Tabs value={mode === 'guest' ? 0 : 1} onChange={handleTabChange} centered>
            <Tab label="به‌عنوان مهمان" />
            <Tab label="به‌عنوان مدیر" />
          </Tabs>

          <Box component="form" mt={2} onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="نام کامل"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                fullWidth
                required
              />

              {mode === 'admin' && (
                <TextField
                  label="رمز مدیر جلسه"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  fullWidth
                  required
                />
              )}

              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                endIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                ورود به جلسه
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default JoinMeeting;