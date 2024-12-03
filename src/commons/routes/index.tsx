import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { retryImport } from 'commons/utils/retryImport';

// Lazy-loaded components with retry logic
const WebsiteDisplayApp = React.lazy(() =>
  retryImport(() => import('apps/website-display/App'))
);
const WebsiteFactoryApp = React.lazy(() =>
  retryImport(() => import('apps/website-factory/App'))
);
const ProgramApp = React.lazy(() =>
  retryImport(() => import('apps/program/App'))
);
const FSMApp = React.lazy(() =>
  retryImport(() => import('apps/fsm/App'))
);

const Root = () => {
  return (
    <Suspense
      fallback={
        <Backdrop open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
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