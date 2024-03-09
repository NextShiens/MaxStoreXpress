import { User } from 'oidc-client-ts';
import { createContext, useContext } from 'react';

import React from 'react';
import { useAuth } from 'react-oidc-context';

export const getUser = () => {
  let oidcStorage = localStorage.getItem(
    `oidc.user:${process.env.REACT_APP_OPEN_ID_ISSUER}:${process.env.REACT_APP_OPENID_CLIENT_ID}`
  );

  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
};

export const getIdToken = () => {
  const user = getUser();
  if (!user) {
    return null;
  }
  return user.id_token ?? null;
};

const IdTokenContext = createContext(
  null
);

export const useIdToken = () => {
  return useContext(IdTokenContext);
};

const IdTokenProvider = ({ children }) => {
  const { user } = useAuth();

  return (
    <IdTokenContext.Provider value={user?.id_token ?? null}>
      {children}
    </IdTokenContext.Provider>
  );
};

export default IdTokenProvider;