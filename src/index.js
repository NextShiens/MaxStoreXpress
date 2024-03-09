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

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("REACT_APP_OPEN_ID_ISSUER: ", process.env.REACT_APP_OPEN_ID_ISSUER);
console.log("REACT_APP_OPEN_ID_CLIENT_ID: ", process.env.REACT_APP_OPEN_ID_CLIENT_ID);
console.log("REACT_APP_WEBAPP_DOMAIN: ", process.env.REACT_APP_WEBAPP_DOMAIN);
console.log("REACT_APP_GRAPHQL_URI: ", process.env.REACT_APP_GRAPHQL_URI);
console.log("Current Deployment URL: ", process.env.NEXT_PUBLIC_VERCEL_URL);

const oidcConfig = {
  authority: process.env.NODE_ENV === "production" ? process.env.REACT_APP_OPEN_ID_ISSUER : "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_vmOgPnqzT",
  client_id: process.env.NODE_ENV === "production" ? process.env.REACT_APP_OPEN_ID_CLIENT_ID: "6c36b2mbh4i7ohplokggiui8s3",
  redirect_uri: process.env.NODE_ENV === 'production' ? `${window.location.origin}/` : "http://localhost:3000/",  moniterSession: false,
  response_type: "code",
  userStore: new WebStorageStateStore({ store: window.localStorage }),

};
console.log("oidcConfig: ", oidcConfig);  
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
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