import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import ResetPassword from 'apps/website-display/pages/ResetPassword';
import CreateAccount from 'apps/website-display/pages/CreateAccount';
import Login from 'apps/website-display/pages/Login';
import PrivateRoute from 'commons/routes/PrivateRoute';
import AnonymousRoute from 'commons/routes/AnonymousRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import { retryImport } from 'commons/utils/retryImport';
import Articles from './pages/Articles';
import Programs from './pages/Programs';

const Profile = React.lazy(() =>
  retryImport(() => import('apps/website-display/pages/Profile'))
);

const Notifications = React.lazy(() =>
  retryImport(() => import('apps/chat/pages/Notifications'))
);

const RegistrationReceipt = React.lazy(() =>
  retryImport(() => import('apps/website-display/pages/RegistrationReceipt'))
);

const Setting = React.lazy(() =>
  retryImport(() => import('apps/website-display/pages/Setting'))
);

const App = () => {
  const navigate = useNavigate();

  // todo: TOF
  useEffect(() => {
    const hostname = window.location.hostname;

    if (hostname === "ashbaria.ir") {
      navigate("/program/ashbaria/");
    } else if (hostname === "platform.filmbazi.ir") {
      navigate("/program/filmbazi/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route index element={<Navigate to={'/programs/'} />} />
      <Route path="/articles/" element={<Articles />} />
      <Route path="/programs/" element={<Programs />} />
      <Route path="/profile/:partyType/:partyId/" element={<Profile />} />

      <Route path="/" element={<PrivateRoute />}>
        <Route path="/notifications/" element={<Notifications />} />
        <Route path="/receipt/:receiptId/" element={<RegistrationReceipt />} />
        <Route path="/setting/" element={<Setting />} />
      </Route>

      <Route path="/" element={<AnonymousRoute />}>
        <Route path="/login/" element={<Login />} />
        <Route path="/token-expiration/" element={<Login />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/create-account/" element={<CreateAccount />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
