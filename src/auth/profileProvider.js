import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useMutation, useQuery, gql } from '@apollo/client';

const GET_USER_PREFERENCES = gql`
  query getUserPreferencesByEmail($email: String!) {
    getUserPreferencesByEmail(email: $email) {
      id
      email
      preferredLanguage
      currencyPreference
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
    }
  }
`;

const CREATE_USER_PREFERENCES = gql`
  mutation createUserPreferences($input: UserPreferencesInput!) {
    createUserPreferences(input: $input) {
      id
      email
      preferredLanguage
      currencyPreference
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
    }
  }
`;

const ProfileContext = createContext({});

export const useProfile = () => {
  return useContext(ProfileContext);
};

const ProfileProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [preferencesCreated, setPreferencesCreated] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [createUserPreferences, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_USER_PREFERENCES);
  const { data, loading, error } = useQuery(GET_USER_PREFERENCES, {
    variables: { email: user?.profile?.email },
    skip: !user?.profile?.email,
  });

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (isAuthenticated && user?.profile?.email) {
        if (data?.getUserPreferencesByEmail) {
          setUserPreferences(data.getUserPreferencesByEmail);
        } else if (error && error.message === 'User preferences not found' && !preferencesCreated) {
          await createUserPreferences({
            variables: {
              input: {
                email: user.profile.email,
                preferredLanguage: 'en',
                currencyPreference: 'USD',
                notificationSettings: {
                  newProductUpdates: true,
                  orderUpdates: true,
                  promotionalOffers: true,
                },
              },
            },
          });
          setUserPreferences(createData?.createUserPreferences);
          setPreferencesCreated(true);
        }
      }
    };

    fetchUserPreferences();
  }, [isAuthenticated, user, data, createUserPreferences, createData, error]);


  return (
    <ProfileContext.Provider
      value={{
        profile: user?.profile || {},
        userPreferences,
        loading,
        createLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;