import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import WebsiteManagement from 'apps/website-factory/pages/WebsiteManagement';
import NotFoundPage from 'commons/pages/NotFoundPage';
import PageBuilder from './pages/PageBuilder';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute loginUrl='/login/' />}>
        <Route path="" element={<WebsiteManagement />} />
        <Route path="build-page" element={<PageBuilder />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
