import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WebsiteDisplayApp from 'apps/website-display/App';
import WebsiteFactoryApp from 'apps/website-factory/App';
import ProgramApp from 'apps/program/App';

import CourseMapEditorProvider from 'commons/components/organisms/Roadmap/CourseMapEditorProvider';


const Root = () => {

  return (
    <Routes>
      <Route path="/program/*" element={<ProgramApp />} />
      <Route path="/management/*" element={<WebsiteFactoryApp />} />
      <Route path="*" element={<WebsiteDisplayApp />} />
      <Route path='/map' element={<CourseMapEditorProvider />} />
    </Routes>
  );
};

export default Root;
