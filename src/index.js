import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'tailwindcss/tailwind.css';
import ErrorBoundary from './ErrorBoundry.js';
import ReactDOM from 'react-dom';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from "react-oidc-context";

import IdTokenProvider from './auth/idTokenProvider.js';
import { ProfileProvider } from './auth/profileProvider.js';
import { GRAPHQL_URI, oidcConfig } from './constant.js';
import { getIdToken } from './auth/idTokenProvider.js';
import { legacy_createStore as createStore} from 'redux'

import rootReducer from './globalReduxStore/reducers.js';
import { Provider } from 'react-redux';

const httpLink = new HttpLink({ uri: GRAPHQL_URI });

const store = createStore(rootReducer);

const authLink = setContext((_, { headers }) => {
  const token = getIdToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ErrorBoundary>
    <AuthProvider {...oidcConfig}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <IdTokenProvider>
            <ProfileProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ProfileProvider>
          </IdTokenProvider>
        </Provider>
      </ApolloProvider>
    </AuthProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);