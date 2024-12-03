import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const WebsiteDisplayApp = React.lazy(() => import('apps/website-display/App'));
const WebsiteFactoryApp = React.lazy(() => import('apps/website-factory/App'));
const ProgramApp = React.lazy(() => import('apps/program/App'));
const FSMApp = React.lazy(() => import('apps/fsm/App'));

const Root = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/fsm/:fsmId/*" element={<FSMApp />} />
        <Route path="/program/:programSlug/*" element={<ProgramApp />} />
        <Route path="/management/*" element={<WebsiteFactoryApp />} />
        <Route path="*" element={<WebsiteDisplayApp />} />
      </Routes>
    </Suspense>
  );
};

export default Root;