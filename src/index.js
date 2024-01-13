import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import keycloak from './Keycloak';
import './index.css';
import 'tailwindcss/tailwind.css';
import ErrorBoundary from './ErrorBoundry.js';
import ReactDOM from 'react-dom';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });

const authLink = setContext((_, { headers }) => {
  const token = keycloak.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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