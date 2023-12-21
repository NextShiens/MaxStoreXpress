import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import keycloak from './Keycloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'tailwindcss/tailwind.css';
import ErrorBoundary from './ErrorBoundry.js';
ReactDOM.render(

    <ErrorBoundary>
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </ReactKeycloakProvider>
    </ErrorBoundary>,
  document.getElementById('root')
);
