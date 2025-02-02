import React, { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import { retryImport } from 'commons/utils/retryImport';

const Form = React.lazy(() =>
  retryImport(() => import('apps/form/pages/Form'))
);

const FormManagement = React.lazy(() =>
  retryImport(() => import('apps/form/pages/FormManagement'))
);

type PropsType = {}

const FormApp: FC<PropsType> = ({ }) => {

  return (
    <Fragment>
      <Routes>
        <Route index element={<Form />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="manage" element={<FormManagement />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};


export default FormApp;