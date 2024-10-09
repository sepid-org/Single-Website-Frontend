import React, { FC, Fragment } from 'react';

import Layout from 'commons/template/Layout';
import Profile from 'commons/template/Profile';

type ProfilePropsType = {}

const ProfilePage: FC<ProfilePropsType> = ({ }) => {

  return (
    <Layout appbarMode='DASHBOARD'>
      <Profile />
    </Layout>
  );
}

export default ProfilePage;