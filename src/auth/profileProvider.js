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
      defaultAddress{
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
      defaultAddress{
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
      defaultAddress{
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
  const { user, isAuthenticated, isLoading:loading } = useAuth();
  console.log('loading', loading)
  const [preferencesCreated, setPreferencesCreated] = useState(false);
  const [userPreferences, setUserPreferences] = useState(null);
  const [updateUserPreferences, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER_PREFERENCES);
  const [createUserPreferences, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_USER_PREFERENCES);

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
    const fetchUserPreferences = async () => {
      if (isAuthenticated && user?.profile?.email && !userPreferencesLoading) {
        try {
          const userPreferencesInput = {
            userId: user.profile.sub,
            userName: user.profile['cognito:username'],
            email: user.profile.email,
            preferredLanguage: 'en',
            currencyPreference: 'PKR',
            defaultAddress: [
              {
                email: user.profile.email,
                phone: 1234567890,
                city: 'Karachi',
                country: 'Pakistan',
                postalCode: 12345,
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
    
          let userPreferencesResult;
          if (userPreferencesData?.getUserPreferencesByEmail) {
            const updatedPreferencesInput = {
              userId: userPreferencesData.userId ? userPreferencesData.userId : userPreferencesInput.userId,
              email: userPreferencesData.email ? userPreferencesData.email : userPreferencesInput.email,
              currencyPreference: userPreferencesData.currencyPreference ? userPreferencesData.currencyPreference : userPreferencesInput.currencyPreference,
              defaultAddress: userPreferencesData.defaultAddress ? userPreferencesData.defaultAddress : userPreferencesInput.defaultAddress,              preferredLanguage: userPreferencesData.preferredLanguage ? userPreferencesData.preferredLanguage : userPreferencesInput.preferredLanguage,
              userName: userPreferencesData.userName ? userPreferencesData.userName : userPreferencesInput.userName,
              lastLoggedIn: new Date().toISOString(),
            };
    
            userPreferencesResult = await updateUserPreferences({
              variables: {
                id: userPreferencesData.getUserPreferencesByEmail.id,
                input: updatedPreferencesInput,
              },
            });
          } else if (!preferencesCreated) {
            userPreferencesResult = await createUserPreferences({
              variables: {
                input: userPreferencesInput,
              },
            });
            setPreferencesCreated(true);
          }
    
          setUserPreferences(userPreferencesResult?.data?.createUserPreferences || userPreferencesResult?.data?.updateUserPreferences);
        } catch (error) {
          console.error('Error fetching user preferences:', error);
        }
      }
    };
    fetchUserPreferences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, userPreferencesLoading, loading]);

  return (
    <ProfileContext.Provider
      value={{
        user: user || {},
        userPreferences,
        createLoading,
        updateLoading,
        createError,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};


export const useProfile = () => {
  return useContext(ProfileContext);
};