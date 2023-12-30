import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import keycloak from './Keycloak';
import './index.css';
import 'tailwindcss/tailwind.css';
import ErrorBoundary from './ErrorBoundry.js';
import ReactDOM from 'react-dom';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ErrorBoundary>
    <ReactKeycloakProvider authClient={keycloak}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </ReactKeycloakProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);