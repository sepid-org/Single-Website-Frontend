import React, { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import { retryImport } from 'commons/utils/retryImport';

const Article = React.lazy(() =>
  retryImport(() => import('apps/article/pages/Article'))
);

const ArticleManagement = React.lazy(() =>
  retryImport(() => import('apps/article/pages/ArticleManagement'))
);

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