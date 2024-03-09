import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'tailwindcss/tailwind.css';
import ErrorBoundary from './ErrorBoundry.js';
import ReactDOM from 'react-dom';
import { setContext } from '@apollo/client/link/context';
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from 'oidc-client';
import IdTokenProvider from './auth/idTokenProvider.js';
import ProfileProvider from './auth/profileProvider.js';
import { OPEN_ID_CLIENT_ID, OPEN_ID_ISSUER, WEBAPP_DOMAIN, GRAPHQL_URI  } from './constant.js';
import {getIdToken} from './auth/idTokenProvider.js';
const oidcConfig = {
  authority: OPEN_ID_ISSUER ,
  client_id:OPEN_ID_CLIENT_ID,
  redirect_uri:WEBAPP_DOMAIN || "http://localhost:3000/",
  moniterSession: false,
  response_type: "code",
  userStore: new WebStorageStateStore({ store: window.localStorage }),

};
console.log("oidcConfig: ", oidcConfig);
const httpLink = new HttpLink({ uri: GRAPHQL_URI });


const authLink = setContext((_, { headers }) => {
  const token = getIdToken();
  console.log("Token: ", token);
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
      <IdTokenProvider>
        <ProfileProvider>

          <ApolloProvider client={apolloClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApolloProvider>


        </ProfileProvider>
      </IdTokenProvider>
    </AuthProvider>

  </ErrorBoundary>,
  document.getElementById('root')
);