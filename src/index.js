import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './Keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'tailwindcss/tailwind.css';
ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter><App /></BrowserRouter>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
