import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Program from 'apps/website-display/pages/Program';
import ProgramManagement from 'apps/website-display/pages/ProgramManagement';
import NotFoundPage from 'apps/website-display/pages/Message/NotFoundPage';
import Registration from 'apps/website-display/pages/Registration';
import TeamSetting from 'apps/website-display/pages/TeamSetting';
import PrivateRoute from 'commons/routes/PrivateRoute';

const App = () => {

  return (
    <Routes>
      <Route path="/:programSlug/*" element={<Program />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/:programSlug/form/" element={<Registration />} />
        <Route path="/:programSlug/team-setting/" element={<TeamSetting />} />
        <Route path="/:programSlug/manage/" element={<ProgramManagement />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
