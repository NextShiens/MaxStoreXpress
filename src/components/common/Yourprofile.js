import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useProfile } from '../../auth/profileProvider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Skeleton from '@mui/material/Skeleton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': '#E0E3E7',
            '--TextField-brandBorderHoverColor': '#B2BAC2',
            '--TextField-brandBorderFocusedColor': '#6F7E8C',
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)',
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&::before, &::after': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)',
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
            },
          },
        },
      },
    },
  });

  const YourProfile = () => {
    const { loading, deleteLoading, createLoading,updateLoading, userPreferences, updateUserPreferences ,deleteUserAddress} = useProfile();
    const outerTheme = useTheme();
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState('');
    const [currency, setCurrency] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
    const [inputAddress, setInputAddress] = useState({
      city: '',
      email: '',
      phone: '',
      country: '',
      postalCode: '',
      streetAddress: '',
    });
    const [notificationSettings, setNotificationSettings] = useState({
      newProductUpdates: false,
      orderUpdates: false,
      promotionalOffers: false,
    });
  
    useEffect(() => {
      console.log("user preferences" + userPreferences);
      if (userPreferences) {
        setUserId(userPreferences.userId || '');
        setUsername(userPreferences.userName || '');
        setEmail(userPreferences.email || '');
        setLanguage(userPreferences.preferredLanguage || '');
        setCurrency(userPreferences.currencyPreference || '');
        setAddresses(userPreferences.defaultAddress || []);
        setNotificationSettings(userPreferences.notificationSettings || {});
      }
    }, [userPreferences]);
  
    const handleAddressChange = (e) => {
      const { name, value } = e.target;
      setInputAddress((prevAddress) => ({
        ...prevAddress,
        [name]: value,
      }));
    };
    
  
    const handleNotificationChange = (e) => {
      const { name, checked } = e.target;
      setNotificationSettings((prevSettings) => ({
        ...prevSettings,
        [name]: checked,
      }));
    };
  
    const handleAddressSelection = (index) => {
      setSelectedAddressIndex(index);
      setInputAddress(addresses[index]);
    };

    
    const handleDeleteAddress = async (index) => {
      try {
        await deleteUserAddress({
          variables: {
            index: index,
            email: email,
          },
        });
        setInputAddress({
          city: '',
          email: '',
          phone: '',
          country: '',
          postalCode: '',
          streetAddress: '',
        });
      } catch (error) {
        console.error('Error deleting user address:', error);
      }
    };
    const handleSubmit = async () => {
      let updatedAddress;
      if (selectedAddressIndex !== -1) {
        updatedAddress = {
          city: inputAddress.city,
          email: inputAddress.email,
          phone: inputAddress.phone,
          country: inputAddress.country,
          postalCode: inputAddress.postalCode,
          streetAddress: inputAddress.streetAddress,
        };
      } else {
        updatedAddress = {
          city: inputAddress.city,
          email: inputAddress.email,
          phone: inputAddress.phone,
          country: inputAddress.country,
          postalCode: inputAddress.postalCode,
          streetAddress: inputAddress.streetAddress,
        };
      }
    
      let updatedAddresses;
      if (selectedAddressIndex !== -1) {
        updatedAddresses = [...addresses];
        updatedAddresses[selectedAddressIndex] = updatedAddress;
      } else {
        updatedAddresses = [...addresses, updatedAddress];
      }
    
      const updatedUserPreferences = {
        userId: userId,
        userName: username,
        email: email,
        preferredLanguage: language,
        currencyPreference: currency,
        defaultAddress: updatedAddresses.map((address) => ({ ...address, __typename: undefined })),
        notificationSettings: {
          newProductUpdates: notificationSettings.newProductUpdates,
          orderUpdates: notificationSettings.orderUpdates,
          promotionalOffers: notificationSettings.promotionalOffers,
        },
        lastLoggedIn: userPreferences.lastLoggedIn,
      };
    
      try {
        await updateUserPreferences(updatedUserPreferences);
        setAddresses(updatedAddresses);
        setInputAddress({
          city: '',
          email: '',
          phone: '',
          country: '',
          postalCode: '',
          streetAddress: '',
        });
        setSelectedAddressIndex(-1);
      } catch (err) {
        console.error('Error updating user preferences:', err);
      }
    };
  if (loading || createLoading || !userPreferences) {
    return (
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <Skeleton variant="text" width={200} height={30} />
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <Skeleton className='rounded' variant="rectangular" width={250} height={30} />
              <Skeleton className='rounded' variant="rectangular" width={200} height={30} />
              <Skeleton className='rounded' variant="rectangular" width={250} height={30} />
              <Skeleton className='rounded' variant="rectangular" width={200} height={30} />
              <Skeleton className='rounded' variant="rectangular" width={250} height={30} />
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <Skeleton variant="text" width={200} height={30} />
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <Skeleton className='rounded' variant="rectangular" width="80%" height={30} />
              <Skeleton variant="rectangular" className='rounded' width="70%" height={30} />
              <Skeleton variant="rectangular" className='rounded' width="80%" height={30} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const selectedAddress = selectedAddressIndex !== -1 ? addresses[selectedAddressIndex] : inputAddress;
    return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6 relative">
              <h3 className="text-lg font-medium">Your Profile</h3>
              { updateLoading && <CircularProgress className='absolute right-10 top-6' color="inherit" size={25} /> }
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <div className="space-x-11 flex flex-row">
                <TextField
                required
                  id="userName"
                  label="Username"
                  value={username}
                  variant="outlined"
                  size="small"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="email"
                  label="Email"
                  value={email}
                  variant="outlined"
                  size="small"
                  disabled
                />
              </div>

              <div className="space-x-11 flex flex-row">
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Language</InputLabel>
                  <Select
                    size="small"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    label="Language"
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Urdu">Urdu</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="Arabic">Arabic</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>Currency</InputLabel>
                  <Select
                    size="small"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    label="Currency"
                  >
                    <MenuItem value="Dollar">Dollar</MenuItem>
                    <MenuItem value="PKR">PKR</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="space-x-11 flex flex-row">
              <TextField
  required
  id="city"
  label="City"
  value={inputAddress.city || ''}
  name="city"
  variant="outlined"
  size="small"
  onChange={handleAddressChange}
/>
<TextField
                required
                  id="postalCode"
                  label="Postal Code"
                  value={inputAddress.postalCode || ''}
                  name="postalCode"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="space-x-11 flex flex-row">
                <TextField
                required
                  id="phone"
                  label="Phone"
                  value={inputAddress.phone || ''}
                  name="phone"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
                <TextField
                required
                  id="country"
                  label="Country"
                  value={inputAddress.country || ''}
                  name="country"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="space-x-5 flex flex-row">
                <TextField
                required
                  className="w-full block"
                  id="email"
                  label="Contact Email"
                  value={inputAddress.email || ''}
                  name="email"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="space-y-2">
                <TextField
                required
                  className="w-full block"
                  id="streetAddress"
                  label="Street Address"
                  value={inputAddress.streetAddress || ''}
                  name="streetAddress"
                  variant="outlined"
                  multiline
                  rows={2}
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>
              <h3 className="text-lg font-medium">Notifications Settings</h3>
              <div className="flex items-center gap-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notificationSettings.newProductUpdates}
                      onChange={handleNotificationChange}
                      name="newProductUpdates"
                      color="default"
                    />
                  }
                  label="New Product Updates"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notificationSettings.orderUpdates}
                      onChange={handleNotificationChange}
                      name="orderUpdates"
                      color="default"
                    />
                  }
                  label="Order Updates"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={notificationSettings.promotionalOffers}
                      onChange={handleNotificationChange}
                      name="promotionalOffers"
                      color="default"
                    />
                  }
                  label="Promotional Offers"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
                type="button"
              >
                {selectedAddressIndex !== -1 ? 'Update Address' : 'Add Address'}
              </button>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6 relative">
              <h3 className="text-lg font-medium">Your Addresses</h3>
              { deleteLoading &&<CircularProgress className='absolute right-10 top-6' color="error" size={25} />}
            </div>
            <div className="p-4 md:p-6 space-y-4">
       
              {userPreferences.defaultAddress && userPreferences.defaultAddress.map((address, index) => (
              
              <div key={index} className="border flex flex-col justify-start border-gray-200 m-2 ml-5 mr-5 space-x-3 rounded-md p-4 mb-4">
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="default"
                        checked={index === selectedAddressIndex}
                        onChange={() => handleAddressSelection(index)}
                        className="text-blue-500 focus:ring-blue-500"
                      />
                    }
                    label={
                      <div>
                        
                        <p className="text-sm font-medium text-gray-900">{address.streetAddress}</p>
                        <p className="text-sm text-gray-500"><LocationOnIcon /> {address.city}</p>
                        <p className="text-sm text-gray-500"><LocalPhoneIcon /> {address.phone}</p>
                       
                      </div>

                    }
                    className="flex items-start"
                  />
                   <Button onClick={()=>handleDeleteAddress(index)} disabled={deleteLoading} className='w-8 ' variant="text" color="error">    
                  <DeleteForeverIcon/>
                </Button>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default YourProfile;