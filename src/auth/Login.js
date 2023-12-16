import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useKeycloak } from '@react-keycloak/web';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { keycloak, initialized } = useKeycloak();

  const handleSubmit = (event) => {
    event.preventDefault();

    keycloak
      .login({
        username,
        password,
      })
      .then((authenticated) => {
        if (authenticated) {
          console.log('User authenticated');
        } else {
          console.log('Authentication failed');
        }
      })
      .catch((error) => {
        console.error('Login error', error);
      });
  };

  if (!initialized) {
    return <div>Loading Keycloak...</div>;
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
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ marginTop: '10px' }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              Login
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
