import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useProfile } from '../../auth/profileProvider';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: 'black',
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: 'black',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid gray',
          '&:hover': {
            backgroundColor: '#eaeaea',
            color: 'black',
            border: '1px solid black',
          },
        },
      },
    },
  },
});

const YourProfile = () => {
  const { userPreferences } = useProfile();
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('Dollar');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (userPreferences) {
      setUsername(userPreferences.userName || '');
      setEmail(userPreferences.email || '');
      setLanguage(userPreferences.preferredLanguage || 'English');
      setCurrency(userPreferences.currencyPreference || 'Dollar');
      setAddress(userPreferences.address || '');
    }
  }, [userPreferences]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="max-w-sm w-full p-4">
          <CardContent>
            <Typography variant="h5" component="div" className="mb-4">
              Your Profile
            </Typography>
            <div className="mb-4">
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={email}
                InputProps={{
                  style: {
                    borderColor: email ? 'black' : '',
                  },
                }}
                disabled
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Language</InputLabel>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
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
                  value={currency}
                  onChange={handleCurrencyChange}
                  label="Currency"
                >
                  <MenuItem value="Dollar">Dollar</MenuItem>
                  <MenuItem value="PKR">PKR</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                margin="normal"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <Button variant="contained" fullWidth>
              Submit
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default YourProfile;
