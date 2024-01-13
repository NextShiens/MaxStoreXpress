import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import logo from './logo2.png';

const Navbar = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate();

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + '/login' });
  };

  return (
    <AppBar position="static" color="inherit" sx={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ mr: 2, color: '#000' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/"
          color="inherit"
          sx={{ flexGrow: 1, color: '#000' }}
        >
          <img src={logo} alt="Logo" width="200" height="80" />
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/products"
          color="inherit"
          sx={{ mr: 2, color: '#000' }}
        >
          Products
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/about"
          color="inherit"
          sx={{ mr: 2, color: '#000' }}
        >
          About Us
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/contact"
          color="inherit"
          sx={{ mr: 2, color: '#000' }}
        >
          Contact Us
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/services"
          color="inherit"
          sx={{ mr: 2, color: '#000' }}
        >
          Services
        </Typography>

        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/gallery"
          color="inherit"
          sx={{ mr: 2, color: '#000' }}
        >
          Gallery
        </Typography>

        {keycloak.authenticated ? (
          <Button 
            color="inherit" 
            variant="outlined"
            onClick={handleLogout}
            sx={{ color: '#000', borderColor: '#000' }}
          >
            Logout
          </Button>
        ) : (
          <Button 
            component={RouterLink} 
            to="/login" 
            color="inherit" 
            variant="outlined"
            sx={{ color: '#000', borderColor: '#000' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;