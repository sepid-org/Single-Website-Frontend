import React, { FC } from 'react';
import UserSetting from 'commons/template/Setting/UserSetting';
import { Container } from '@mui/material';
import FilmbaziLayout from '../components/molecules/Layout';

type ProfilePropsType = {}

const Profile: FC<ProfilePropsType> = ({ }) => {

  return (
    <FilmbaziLayout>
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          paddingTop: 4,
          paddingBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        <UserSetting />
      </Container>
    </FilmbaziLayout>
  );
};

export default Profile;