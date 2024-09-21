import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WebsiteDisplayApp from 'apps/website-display/App';
import WebsiteFactoryApp from 'apps/website-factory/App';
import ProgramManagerApp from 'apps/program-manager/App';

const Root = () => {

  return (
    <Routes>
      <Route path="/program/*" element={<ProgramManagerApp />} />
      <Route path="/management/*" element={<WebsiteFactoryApp />} />
      <Route path="*" element={<WebsiteDisplayApp />} />
    </Routes>
  );
};

export default Root;
