import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import { useMutation, useQuery, gql } from '@apollo/client';

const UPDATE_USER_PREFERENCES = gql`
  mutation UpdateUserPreferences($id: ID!, $input: UserPreferencesInput) {
    updateUserPreferences(id: $id, input: $input) {
      userId
      id
      email
      userName
      preferredLanguage
      currencyPreference
      defaultAddress {
        city
        email
        phone
        country
        postalCode
        streetAddress
      }
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
      lastLoggedIn
    }
  }
`;

const GET_USER_PREFERENCES = gql`
  query getUserPreferencesByEmail($email: String!) {
    getUserPreferencesByEmail(email: $email) {
      id
      userId
      userName
      email
      preferredLanguage
      currencyPreference
      defaultAddress {
        city
        email
        phone
        country
        postalCode
        streetAddress
      }
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
      lastLoggedIn
    }
  }
`;

const CREATE_USER_PREFERENCES = gql`
  mutation createUserPreferences($input: UserPreferencesInput!) {
    createUserPreferences(input: $input) {
      id
      userId
      userName
      email
      preferredLanguage
      currencyPreference
      defaultAddress {
        city
        email
        phone
        country
        postalCode
        streetAddress
      }
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
      lastLoggedIn
    }
  }
`;

const DELETE_ADDRESS = gql`
  mutation deleteAddress($index: Int!, $email: String!) {
    deleteAddress(index: $index, email: $email) {
      id
      userId
      userName
      email
      preferredLanguage
      currencyPreference
      defaultAddress {
        city
        email
        phone
        country
        postalCode
        streetAddress
      }
      notificationSettings {
        newProductUpdates
        orderUpdates
        promotionalOffers
      }
      createdAt
      updatedAt
      lastLoggedIn
    }
  }
`;

const ProfileContext = createContext({});

export const ProfileProvider = ({ children = "null" }) => {
  const { user, isAuthenticated, isLoading: loading } = useAuth();
  const [preferencesCreated, setPreferencesCreated] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);

  const [updateUserPreferences, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER_PREFERENCES);
  const [createUserPreferences, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_USER_PREFERENCES);
  const [deleteUserAddress, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_ADDRESS);

  const { data: userPreferencesData, loading: userPreferencesLoading, error: userPreferencesError } = useQuery(GET_USER_PREFERENCES, {
    skip: !user?.profile?.email,
    variables: { email: user?.profile?.email },
  });

  useEffect(() => {
    if (userPreferencesData?.getUserPreferencesByEmail) {
      setUserPreferences(userPreferencesData.getUserPreferencesByEmail);
    }
  }, [userPreferencesData]);

  useEffect(() => {
    const cleanPreferences = (preferences) => {
      const { __typename, id, createdAt, updatedAt, ...cleanedPreferences } = preferences;
      if (cleanedPreferences.defaultAddress) {
        cleanedPreferences.defaultAddress = cleanedPreferences.defaultAddress.map(({ __typename, ...address }) => address);
      }
      if (cleanedPreferences.notificationSettings) {
        const { __typename, ...settings } = cleanedPreferences.notificationSettings;
        cleanedPreferences.notificationSettings = settings;
      }
      return cleanedPreferences;
    };

    const fetchUserPreferences = async () => {
      if (isAuthenticated && user?.profile?.email && !userPreferencesLoading) {
        try {
          if (userPreferencesData?.getUserPreferencesByEmail) {
            if (!userPreferencesData.getUserPreferencesByEmail.defaultAddress || userPreferencesData.getUserPreferencesByEmail.defaultAddress.length === 0) {
              const updatedPreferencesInput = {
                ...cleanPreferences(userPreferencesData.getUserPreferencesByEmail),
                defaultAddress: [
                  {
                    email: user.profile.email,
                    phone: user.profile.phone_number || '1234567890',
                    city: 'Kamalia',
                    country: 'Pakistan',
                    postalCode: '12345',
                    streetAddress: '123 Main Street',
                  },
                ],
              };

              const result = await updateUserPreferences({
                variables: {
                  id: userPreferencesData.getUserPreferencesByEmail.id,
                  input: updatedPreferencesInput,
                },
              });

              setUserPreferences(result.data.updateUserPreferences);
            } else {
              setUserPreferences(userPreferencesData.getUserPreferencesByEmail);
            }
          } else {
            const userPreferencesInput = {
              userId: user.profile.sub,
              userName: user.profile['cognito:username'],
              email: user.profile.email,
              preferredLanguage: 'English',
              currencyPreference: 'PKR',
              defaultAddress: [
                {
                  email: user.profile.email,
                  phone: user.profile.phone_number || '1234567890',
                  city: 'Kamalia',
                  country: 'Pakistan',
                  postalCode: '12345',
                  streetAddress: '123 Main Street',
                },
              ],
              notificationSettings: {
                newProductUpdates: true,
                orderUpdates: true,
                promotionalOffers: true,
              },
              lastLoggedIn: new Date().toISOString(),
            };

            const userPreferencesResult = await createUserPreferences({
              variables: {
                input: userPreferencesInput,
              },
            });

            setUserPreferences(userPreferencesResult?.data?.createUserPreferences);
            setPreferencesCreated(true);
          }
        } catch (error) {
          console.error('Error fetching user preferences:', error);
        }
      }
    };

    fetchUserPreferences();
  }, [isAuthenticated, user, userPreferencesLoading, loading]);

  const updateUserPreferencesHandler = async (updatedPreferences) => {
    try {
      const cleanPreferences = (preferences) => {
        const { __typename, id, createdAt, updatedAt, ...cleanedPreferences } = preferences;
        if (cleanedPreferences.defaultAddress) {
          cleanedPreferences.defaultAddress = cleanedPreferences.defaultAddress.map(({ __typename, ...address }) => address);
        }
        if (cleanedPreferences.notificationSettings) {
          const { __typename, ...settings } = cleanedPreferences.notificationSettings;
          cleanedPreferences.notificationSettings = settings;
        }
        return cleanedPreferences;
      };

      const result = await updateUserPreferences({
        variables: {
          id: userPreferences.id,
          input: cleanPreferences(updatedPreferences),
        },
      });
      setUserPreferences(result.data.updateUserPreferences);
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        user: user || {},
        userPreferences,
        createLoading,
        updateLoading,
        deleteLoading,
        createError,
        loading,
        updateUserPreferences: updateUserPreferencesHandler,
        deleteUserAddress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
