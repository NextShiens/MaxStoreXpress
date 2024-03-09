
import { createContext, useContext } from 'react';
import { useAuth } from 'react-oidc-context';
// eslint-disable-next-line
import React from 'react';

export const ProfileContext = createContext({});

export const useProfile = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  const { user } = useAuth();

  return (
    <ProfileContext.Provider value={user?.profile ?? {}}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;