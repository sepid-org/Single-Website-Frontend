import React, { FC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import JoinMeeting from 'apps/meeting/pages/JoinMeeting';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import Authentication from './pages/Authentication';


type PropsType = {}

const ArticleApp: FC<PropsType> = ({ }) => {
  const { meetingId } = useParams();

  return (
    <Routes>
      <Route element={<AnonymousRoute base={`/meeting/${meetingId}/`} />}>
        <Route path="/auth/" element={<Authentication />} />
      </Route>

      <Route element={<PrivateRoute loginUrl={`/meeting/${meetingId}/auth/`} />}>
        <Route index element={<JoinMeeting />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


export default ArticleApp;