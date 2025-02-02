import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Route, Routes } from 'react-router-dom';

import { useGetFSMQuery } from 'apps/fsm/redux/slices/fsm/FSMSlice';
import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import FSM from '../fsm/pages/FSM';
import Correction from '../fsm/pages/Correction';
import FSMManagement from '../fsm/pages/FSMManagement';
import ArticleManagement from './pages/ArticleManagement';
import Article from './pages/Article';


type PropsType = {}

const ArticleApp: FC<PropsType> = ({ }) => {

  return (
    <Fragment>
      <Routes>
        <Route index element={<Article />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="manage" element={<ArticleManagement />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};


export default ArticleApp;