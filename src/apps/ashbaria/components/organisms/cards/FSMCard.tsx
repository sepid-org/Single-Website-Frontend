import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Skeleton,
  Chip,
} from '@mui/material';
import { Group, Person } from '@mui/icons-material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import React, { Fragment, FC } from 'react';

import { FSMType, UserFSMStatusType } from 'commons/types/models';
import { Link } from 'react-router-dom';
import useStartFSM from 'commons/hooks/fsm/useStartFSM';

type FSMCardPropsType = {
  fsm: Partial<FSMType>;
  isLoading?: boolean;
  userFSMStatus?: UserFSMStatusType;
}

export const FSMCard: FC<FSMCardPropsType> = ({
  fsm,
  isLoading = false,
  userFSMStatus,
}) => {
  const [_startFSM, result] = useStartFSM({ fsmId: fsm?.id, redirectPath: `/program/ashbaria/court/${fsm.id}/` });

  const startFSM = () => {
    _startFSM({})
  }

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: 380, // Set a fixed height for consistency
        cursor: fsm?.is_active ? 'pointer' : 'default',
        opacity: fsm?.is_active ? 1 : 0.6,
        transition: 'opacity 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: fsm?.is_active ? 6 : 3,
        },
      }}
      onClick={startFSM}
    >
      {isLoading ? (
        <Skeleton
          width='100%'
          height='100%'
          animation="wave"
          variant="rectangular"
        />
      ) : (
        <Fragment>
          {fsm.cover_image && (
            <CardMedia
              component="img"
              sx={{ height: 240, objectFit: 'cover' }}
              image={fsm.cover_image}
              title={fsm.name}
            />
          )}
          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              height: 160, // Fixed height for content area
              padding: 2,
              '&:last-child': { paddingBottom: 2 }, // Override MUI's default padding
            }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack direction="row" alignItems="center" width={'100%'}>
                <Typography component="h2" variant="h4" noWrap sx={{ maxWidth: '100%' }}>
                  {fsm.name}
                </Typography>
                {userFSMStatus?.is_user_mentor &&
                  <IconButton
                    component={Link}
                    to={`/program/ashbaria/court/${fsm?.id}/manage/`}
                    size='small'
                  >
                    <ModeEditTwoToneIcon />
                  </IconButton>
                }
              </Stack>
            </Stack>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                flexGrow: 1,
              }}
            >
              {fsm.description}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* {fsm?.has_entrance_lock && <Lock fontSize="small" />} */}
              <Chip
                icon={fsm?.fsm_p_type === 'Team' ? <Group /> : <Person />}
                label={fsm?.fsm_p_type === 'Team' ? 'تیمی' : 'فردی'}
                size="small"
                variant="outlined"
              />
            </Stack>
          </CardContent>
        </Fragment>
      )}
    </Card>
  );
};

export default FSMCard;