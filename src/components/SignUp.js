import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  CircularProgress,
} from '@mui/material';

const registerUser = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`User registered with username: ${username} and password: ${password}`);
      resolve(true);
    }, 1500);
  });
};

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [googleHovered, setGoogleHovered] = useState(false);
  const [facebookHovered, setFacebookHovered] = useState(false);
  const [microsoftHovered, setMicrosoftHovered] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      handleSnackbarOpen('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerUser(username, password);
      handleSnackbarOpen('Registration successful');
    } catch (error) {
      console.error('Error during registration:', error);
      handleSnackbarOpen('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleContinueWithGoogle = () => {
    handleSnackbarOpen('Continue with Google clicked');
    // Add your logic for Google authentication here
  };

  const handleContinueWithFacebook = () => {
    handleSnackbarOpen('Continue with Facebook clicked');
    // Add your logic for Facebook authentication here
  };

  const handleContinueWithMicrosoft = () => {
    handleSnackbarOpen('Continue with Microsoft clicked');
    // Add your logic for Microsoft authentication here
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Sign Up
          </Typography>
          {loading ? (
            <CircularProgress sx={{ alignSelf: 'center', marginBottom: '20px' }} />
          ) : (
            <form onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                sx={{ marginBottom: '15px' }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                sx={{ marginBottom: '15px' }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                sx={{ marginBottom: '15px' }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: '20px', backgroundColor: '#1976d2', color: '#ffffff' }}
              >
                Sign Up
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleContinueWithGoogle}
                onMouseEnter={() => setGoogleHovered(true)}
                onMouseLeave={() => setGoogleHovered(false)}
                sx={{
                  marginTop: '10px',
                  color: googleHovered ? '#1976d2' : '#1976d2',
                  // backgroundColor: googleHovered ? '#1976d2' : '#ffffff',
                }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleContinueWithFacebook}
                onMouseEnter={() => setFacebookHovered(true)}
                onMouseLeave={() => setFacebookHovered(false)}
                sx={{
                  marginTop: '10px',
                  color: facebookHovered ? '#1976d2' : '#1976d2',
                  // backgroundColor: facebookHovered ? '#1976d2' : 'transparent',
                }}
              >
                Continue with Facebook
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleContinueWithMicrosoft}
                onMouseEnter={() => setMicrosoftHovered(true)}
                onMouseLeave={() => setMicrosoftHovered(false)}
                sx={{
                  marginTop: '10px',
                  color: microsoftHovered ? '#1976d2' : '#1976d2',
                  // backgroundColor: microsoftHovered ? '#1976d2' : 'transparent',
                }}
              >
                Continue with Microsoft
              </Button>
            </form>
          )}
          <Typography variant="body2" textAlign="center" mt={3}>
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            {}
          </IconButton>
        }
        sx={{ backgroundColor: '#1976d2' }}
      />
    </Grid>
  );
};

export default SignUp;
