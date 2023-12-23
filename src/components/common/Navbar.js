import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const Navbar = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + '/login' });
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/"
          color="inherit"
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          Your Logo
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/products"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Products
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/about"
          color="inherit"
          sx={{ mr: 2 }}
        >
          About Us
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/contact"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Contact Us
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/services"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Services
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/gallery"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Gallery
        </Typography>

        {keycloak.authenticated ? (
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button 
            component={RouterLink} 
            to="/login" 
            color="inherit" 
            variant="outlined"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;