import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
  const { userPreferences, updateUserPreferences } = useProfile();
  const dispatch = useDispatch();
  const outerTheme = useTheme();

  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('');
  const [currency, setCurrency] = useState('');
  const [address, setAddress] = useState({
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
    if (userPreferences) {
      setUserId(userPreferences.userId || '');
      setUsername(userPreferences.userName || '');
      setEmail(userPreferences.email || '');
      setLanguage(userPreferences.preferredLanguage || '');
      setCurrency(userPreferences.currencyPreference || '');
      setAddress(userPreferences.defaultAddress || {});
      setNotificationSettings(userPreferences.notificationSettings || {});
    }
  }, [userPreferences]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
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
  const handleSubmit = () => {
    const updatedUserPreferences = {
      userId: userId,
      userName: username,
      email: email,
      preferredLanguage: language,
      currencyPreference: currency,
      defaultAddress: {
        city: address.city,
        email: address.email,
        phone:address.phone,
        country: address.country,
        postalCode: address.postalCode,
        streetAddress: address.streetAddress,
      },
      notificationSettings: {
        newProductUpdates: notificationSettings.newProductUpdates,
        orderUpdates: notificationSettings.orderUpdates,
        promotionalOffers: notificationSettings.promotionalOffers,
      },
      lastLoggedIn: userPreferences.lastLoggedIn,
    };
  
    updateUserPreferences(updatedUserPreferences);
  };

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-6">
          <div className="rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
              <h3 className="text-lg font-medium">Your Profile</h3>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <div className="space-x-5 flex flex-row">
                <TextField
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

              <div className="space-x-5 flex flex-row">
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

              <div className="space-x-5 flex flex-row">
                <TextField
                  id="city"
                  label="City"
                  value={address.city}
                  name="city"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
                <TextField
                  id="postalCode"
                  label="Postal Code"
                  value={address.postalCode}
                  name="postalCode"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="space-x-5 flex flex-row">
                <TextField
                  id="phone"
                  label="Phone"
                  value={address.phone}
                  name="phone"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
                <TextField
                  id="country"
                  label="Country"
                  value={address.country}
                  name="country"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>
              
              <div className="space-x-5 flex flex-row">
                <TextField
                  id="email"
                  label="Contact Email"
                  value={address.email}
                  name="email"
                  variant="outlined"
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

              <div className="space-y-2 ">
                <TextField className='w-full block '
                  id="streetAddress"
                  label="Street Address"
                  value={address.streetAddress}
                  name="streetAddress"
                  variant="outlined"
                  multiline
                  rows={2}
                  size="small"
                  onChange={handleAddressChange}
                />
              </div>

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
                className="inline-flex justify-center w-full rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 "
                type="button"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default YourProfile;
