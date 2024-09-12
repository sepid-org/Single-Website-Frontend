import React, { FC, useState, useEffect } from 'react';
import Layout from 'commons/components/template/Layout';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Box,
  Paper
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NotificationType } from '../types/models';
import { fakeNotifications } from '../fakeNotifications';

type NotificationsPropsType = {};

const Notifications: FC<NotificationsPropsType> = ({ }) => {
  const initialNotifications = fakeNotifications;
  const [notificationList, setNotificationList] = useState<NotificationType[]>(initialNotifications);

  useEffect(() => {
    setNotificationList(initialNotifications);
  }, [initialNotifications]);

  const handleToggleSeen = (id: number) => {
    setNotificationList(prevList =>
      prevList.map(notification =>
        notification.id === id ? { ...notification, seen: !notification.seen } : notification
      )
    );
  };

  return (
    <Layout appbarMode='DASHBOARD'>
      <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {'اعلان‌ها'}
        </Typography>
        {notificationList.length > 0 ? (
          <List>
            {notificationList.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" aria-label="toggle seen" onClick={() => handleToggleSeen(notification.id)}>
                      {notification.seen ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={notification.sender.name} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.sender.name}
                        </Typography>
                        {` — ${notification.content}`}
                        <Typography variant="caption" display="block">
                          {new Date(notification.sent_datetime).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notificationList.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1">
              {'در حال حاضر هیچ اعلانی وجود ندارد.'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Layout>
  );
};

export default Notifications;