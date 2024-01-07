import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai'; 

const Navbar = () => {
  const handleCartClick = () => {
    alert('Your cart is empty!');
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
          sx={{ flexGrow: 1 }}
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

        <Button 
          component={RouterLink} 
          to="/login" 
          color="inherit" 
          variant="outlined"
        >
          Login
        </Button>
        <IconButton 
          color="inherit" 
          component={RouterLink} 
          to="/cart" 
          onClick={handleCartClick} 
          sx={{ ml: 2 }} 
        >
          <AiOutlineShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;