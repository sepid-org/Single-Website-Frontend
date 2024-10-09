import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WebsiteDisplayApp from 'apps/website-display/App';
import WebsiteFactoryApp from 'apps/website-factory/App';
import ProgramApp from 'apps/program/App';
import ResetPassword from 'apps/website-display/pages/ResetPassword';
import CreateAccount from 'apps/website-display/pages/CreateAccount';
import RegistrationReceipt from 'apps/website-display/pages/RegistrationReceipt';
import Programs from 'apps/website-display/pages/Programs';
import Setting from 'apps/website-display/pages/Setting';
import Program from 'apps/website-display/pages/Program';
import ProgramManagement from 'apps/website-display/pages/ProgramManagement';
import NotFoundPage from 'apps/website-display/pages/Message/NotFoundPage';
import Login from 'apps/website-display/pages/Login';
import FailedPayment from 'apps/website-display/pages/Message/FailedPayment';
import SuccessfulPayment from 'apps/website-display/pages/Message/SuccessfulPayment';
import Registration from 'apps/website-display/pages/Registration';
import TeamSetting from 'apps/website-display/pages/TeamSetting';
import FSM from 'apps/website-display/pages/FSM';
import Article from 'apps/website-display/pages/Article';
import Articles from 'apps/website-display/pages/Articles';
import PrivateRoute from './PrivateRoute';
import FSMManagement from 'apps/website-display/pages/FSMManagement';
import Correction from 'apps/website-display/pages/Correction';
import EditArticle from 'apps/website-display/pages/EditArticle';
import WebsiteManagement from 'apps/website-factory/pages/WebsiteManagement';
import ProfilePage from 'apps/website-display/pages/Profile';
import CourseMapEditor from 'commons/components/organisms/Roadmap/CourseMapEditorProvider';
import CourseMapViewMode from 'commons/components/organisms/Roadmap/CourseMapViewMode';

const Root = () => {

  return (
    <Routes>
      <Route path="/program/*" element={<ProgramApp />} />
      <Route path="/management/*" element={<WebsiteFactoryApp />} />
      <Route path="*" element={<WebsiteDisplayApp />} />
    </Routes>
  );
};

export default Root;
