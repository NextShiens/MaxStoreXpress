import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const Login = () => {
  const { user, isLoading, isAuthenticated, signinRedirect, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    signinRedirect().catch((err) => console.error('Error redirecting to login page', err));
  };

  if (error) {
    console.error('Error', error);
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" textAlign="center" mb={3}>
              Error
            </Typography>
            <Typography variant="body1" textAlign="center" mb={3}>
              {error.message}
            </Typography>
            <Button onClick={handleLogin} variant="contained" fullWidth>
              Login To Maxstore
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" textAlign="center" mb={3}>
              Loading...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (isAuthenticated && user) {
    const userGroups = user['cognito:groups'];
    if (userGroups && userGroups.includes('seller')) {
      navigate('/seller-dashboard');
    } else {
      navigate('/');
    }
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Login
          </Typography>
          <Button onClick={handleLogin} variant="contained" fullWidth sx={{ marginTop: '20px' }}>
            Login To Maxstore
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;