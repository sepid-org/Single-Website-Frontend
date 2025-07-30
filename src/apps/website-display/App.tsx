import React, { Fragment, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import { retryImport } from 'commons/utils/retryImport';
import Articles from './pages/Articles';
import Programs from './pages/Programs';
import SiteSupport from './components/organisms/SiteSupport';
import Authentication from './pages/Authentication';

const Profile = React.lazy(() =>
  retryImport(() => import('apps/website-display/pages/Profile'))
);

const Notifications = React.lazy(() =>
  retryImport(() => import('apps/chat/pages/Notifications'))
);

const Setting = React.lazy(() =>
  retryImport(() => import('apps/website-display/pages/Setting'))
);

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === "ashbaria.ir") {
      navigate("/program/ashbaria/");
    } else if (hostname === "platform.filmbazi.ir") {
      navigate("/program/filmbazi/");
    }
  }, [navigate]);

  return (
    <Fragment>
      <SiteSupport />
      <Routes>
        <Route index element={<Navigate to={'/programs/'} />} />
        <Route path="/articles/" element={<Articles />} />
        <Route path="/programs/" element={<Programs />} />
        <Route path="/profile/:partyType/:partyId/" element={<Profile />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/notifications/" element={<Notifications />} />
          <Route path="/setting/" element={<Setting />} />
        </Route>

        <Route path="/" element={<AnonymousRoute />}>
          <Route path='/auth/' element={<Authentication />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};

export default App;
