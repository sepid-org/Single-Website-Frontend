import React, { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from 'commons/routes/PrivateRoute';
import NotFoundPage from 'commons/pages/NotFoundPage';
import Form from 'apps/form/pages/Form';
import FormManagement from './pages/FormManagement';

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