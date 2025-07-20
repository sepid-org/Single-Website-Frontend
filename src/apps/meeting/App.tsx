import React, { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import JoinMeeting from 'apps/meeting/pages/JoinMeeting';


type PropsType = {}

const ArticleApp: FC<PropsType> = ({ }) => {

  return (
    <Fragment>
      <Routes>
        <Route index element={<JoinMeeting />} />

        <Route path="/" element={<PrivateRoute />}>

        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};


export default ArticleApp;