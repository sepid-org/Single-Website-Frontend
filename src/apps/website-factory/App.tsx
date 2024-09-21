import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFoundPage from 'apps/website-display/pages/Message/NotFoundPage';
import PrivateRoute from 'commons/routes/PrivateRoute';
import WebsiteManagement from 'apps/website-factory/pages/WebsiteManagement';

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<PrivateRoute loginUrl='/login2/' />}>
        <Route path="" element={<WebsiteManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
