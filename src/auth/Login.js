import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Paper,
  Typography,
  Skeleton,
} from '@mui/material';

import { useKeycloak } from '@react-keycloak/web';

const Login = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak.authenticated) {
      navigate("/");
    }
  }, [keycloak, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    keycloak.login();
  };

  if (!initialized) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
            <Skeleton variant="text" width={210} height={40} />
            <Skeleton variant="rectangular" width="100%" height={118} />
          </Paper>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px' }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              Login with Keycloak
            </Button>
            <Typography variant="body2" textAlign="center" mt={2}>
              Forgot password? <Link to="/forgot-password">Click here</Link>
            </Typography>
          </form>
          <Typography variant="body2" textAlign="center" mt={3}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
