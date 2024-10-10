import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { OfflineBolt } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';

import { stringToColor } from 'commons/utils/stringToColor';
import { TeamType } from 'commons/types/models';
import { useFSMContext } from 'commons/hooks/useFSMContext';

const TeamAvatar = () => {
  const { teamId } = useFSMContext();
  const myTeam = {
    name: 'NOT_IMPLEMENTED',
    members: [
      {
        id: '-1',
        user: {
          first_name: 'NOT',
          last_name: 'IMPLEMENTED',
        }
      }
    ],
    team_head: 'NOT_IMPLEMENTED',
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Tooltip
        onClick={handleClick}
        arrow
        title={`تیم ${myTeam?.name}`}>
        <IconButton sx={{ padding: 0 }}>
          <Avatar
            sx={{
              backgroundColor: stringToColor(`تیم ${myTeam?.name}`),
              border: '0.1px solid lightgray',
            }}>
            {myTeam?.name.trim()[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu disableScrollLock
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}>
        <MenuItem>
          {`تیم ${myTeam?.name ? myTeam?.name : '؟'}`}
        </MenuItem>
        {myTeam?.members?.map((member) =>
          <MenuItem key={member.id}>
            <Badge
              key={member.id}
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              invisible={myTeam?.team_head !== member.id}
              badgeContent={<OfflineBolt style={{ color: 'gold' }} />}>
              <Avatar
                style={{
                  backgroundColor: stringToColor(
                    `${member.user.first_name} ${member.user.last_name}`
                  ),
                  border: '0.1px solid lightgray',
                }}>
                {`${member.user.first_name ? member.user.first_name[0] : '؟'}`}
              </Avatar>
            </Badge>
            <Box ml={1}>
              {`${member.user.first_name ? member.user.first_name : 'بی‌نام'} ${member.user.last_name ? member.user.last_name : 'بی‌نام‌زاده'}`}
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default TeamAvatar;
