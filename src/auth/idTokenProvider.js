import { User } from 'oidc-client-ts';
import { createContext, useContext } from 'react';

import React from 'react';
import { useAuth } from 'react-oidc-context';
import {OPEN_ID_ISSUER, OPEN_ID_CLIENT_ID} from '../constant.js';
export const getUser = () => {
  let oidcStorage = localStorage.getItem(
    `oidc.user:${OPEN_ID_ISSUER}:${OPEN_ID_CLIENT_ID}`
  );
    console.log("oidcStorage: ", oidcStorage);  
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