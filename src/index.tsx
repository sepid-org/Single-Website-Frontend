import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
import reduxStore from 'commons/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootContent =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ?
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </GoogleOAuthProvider> :
    <Provider store={reduxStore}>
      <App />
    </Provider>


ReactDOM.createRoot(document.getElementById("root")).render(rootContent);