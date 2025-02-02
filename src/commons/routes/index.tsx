import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { retryImport } from 'commons/utils/retryImport';
import { BrowserRouter } from 'react-router-dom';

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

const ArticleApp = React.lazy(() =>
  retryImport(() => import('apps/article/App'))
);

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/article/:articleId/*" element={<ArticleApp />} />
        <Route path="/fsm/:fsmId/*" element={<FSMApp />} />
        <Route path="/program/:programSlug/*" element={<ProgramApp />} />
        <Route path="/management/*" element={<WebsiteFactoryApp />} />
        <Route path="*" element={<WebsiteDisplayApp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;