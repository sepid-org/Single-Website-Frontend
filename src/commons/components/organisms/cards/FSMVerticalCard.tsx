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
import React, { useState, Fragment, FC } from 'react';
import { Link } from 'react-router-dom';

import EnterFSMPasswordDialog from 'commons/components/organisms/dialogs/EnterFSMPasswordDialog';
import { FSMType, UserFSMStatusType } from 'commons/types/models';
import useStartFSM from 'commons/hooks/fsm/useStartFSM';

type VerticalFSMCardPropsType = {
  fsm: Partial<FSMType>;
  isLoading?: boolean;
  userStatus?: UserFSMStatusType;
}

export const FSMVerticalCard: FC<VerticalFSMCardPropsType> = ({
  fsm,
  isLoading = false,
  userStatus,
}) => {
  const [openPassword, setOpenPassword] = useState(false);
  const [startFSM, result] = useStartFSM({ fsmId: fsm?.id });

  // todo: temporarily ignore is_enabled_for_user, until enabling conditions are sat
  const isCardEnabled = fsm?.is_active; // fsm?.is_active && userStatus?.is_enabled_for_user;

  const handleCardClick = () => {
    if (isCardEnabled) {
      startFSM({});
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: 360,
        cursor: isCardEnabled ? 'pointer' : 'default',
        opacity: isCardEnabled ? 1 : 0.6,
        transition: 'opacity 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: isCardEnabled ? 6 : 3,
        },
      }}
      onClick={handleCardClick}
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
                {userStatus?.is_user_mentor &&
                  <IconButton
                    component={Link}
                    to={`/fsm/${fsm?.id}/manage/`}
                    onClick={(e) => e.stopPropagation()} // Prevent card click when clicking the button
                    size="small"
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
              {fsm?.fsm_p_type === 'Team' &&
                <Chip
                  icon={fsm?.fsm_p_type === 'Team' ? <Group /> : <Person />}
                  label={fsm?.fsm_p_type === 'Team' ? 'تیمی' : 'فردی'}
                  size="small"
                  variant="outlined"
                />
              }
            </Stack>
          </CardContent>
        </Fragment>
      )}
      <EnterFSMPasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={fsm?.id}
      />
    </Card>
  );
};

export default FSMVerticalCard;