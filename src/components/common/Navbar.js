import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer'; 
import List from '@mui/material/List'; 
import ListItem from '@mui/material/ListItem';   
import ListItemText from '@mui/material/ListItemText';    
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';  
import HomeIcon from '@mui/icons-material/Home';  
import ProductsIcon from '@mui/icons-material/LocalMall';  
import AboutIcon from '@mui/icons-material/Info';  
import ContactIcon from '@mui/icons-material/Mail';  
import ServicesIcon from '@mui/icons-material/Build';  
import GalleryIcon from '@mui/icons-material/Photo';  
import FacebookIcon from '@mui/icons-material/Facebook';  
import GitHubIcon from '@mui/icons-material/GitHub'; 
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import logo from './logo2.png';

const navLinks = [
  { text: 'Home', to: '/', icon: <HomeIcon /> },
  { text: 'Products', to: '/products', icon: <ProductsIcon /> },
  { text: 'About Us', to: '/about', icon: <AboutIcon /> },
  { text: 'Contact Us', to: '/contact', icon: <ContactIcon /> },
  { text: 'Services', to: '/services', icon: <ServicesIcon /> },
  { text: 'Gallery', to: '/gallery', icon: <GalleryIcon /> },
];

const externalLinks = [
  { text: 'Google', to: 'https://www.google.com', external: true, icon: <SearchIcon /> },
  { text: 'GitHub', to: 'https://github.com', external: true, icon: <GitHubIcon /> },
  { text: 'Facebook', to: 'https://www.facebook.com', external: true, icon: <FacebookIcon /> }, 
];

const adminLinks = [
  { text: 'Admin Dashboard', to: '/admin-dashboard' },
  { text: 'Manage Users', to: '/manage-users' },
];

const accountLinks = [ 
  { text: 'Profile', to: '/profile' },
  { text: 'Settings', to: '/settings' },
];

const Sidebar = ({ isOpen, onClose, userRole }) => {
  const location = useLocation();

  return (
    <Drawer anchor="left" open={isOpen} onClose={onClose} sx={{ maxWidth: '250px' }}>
      <List sx={{ width: '100%' }}> 
        {navLinks.map((link, index) => (
          <React.Fragment key={index}>
            <ListItem 
              component={RouterLink} 
              to={link.to} 
              onClick={onClose}
            >
              {link.icon && (
                <ListItemIcon sx={{ display: 'flex', flexDirection: 'column' }}>
                  {link.icon}
                  <ListItemText primary={link.text} sx={{ mt: 1 }} />
                </ListItemIcon>
              )}
            </ListItem>
            {index < navLinks.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        <Divider />
        {externalLinks.map((link, index) => (
          <ListItem 
            component={link.external ? 'a' : RouterLink} 
            href={link.external ? link.to : undefined} 
            to={!link.external ? link.to : undefined} 
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            onClick={onClose}
            key={index}
          >
            {link.icon && (
              <ListItemIcon sx={{ display: 'flex', flexDirection: 'column' }}>
                {link.icon}
                <ListItemText primary={link.text} sx={{ mt: 1 }} />
              </ListItemIcon>
            )}
          </ListItem>
        ))}

        {userRole === 'admin' && (
          <>
            <Divider />
            {adminLinks.map((link, index) => (
              <ListItem 
                component={RouterLink} 
                to={link.to} 
                onClick={onClose}
                key={index}
              >
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
          </>
        )}

        <Divider />
        {accountLinks.map((link, index) => (
          <ListItem 
            component={RouterLink} 
            to={link.to} 
            onClick={onClose}
            key={index}
          >
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

const Navbar = () => {
  const { keycloak } = useKeycloak();
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + '/login' });
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (

    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ mr: 3 }}
            onClick={toggleDrawer(true)}

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
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h6" 
            component={RouterLink} 

            to="/"
            color="inherit"
            sx={{ textDecoration: 'none', maxWidth: '200px' }}

            to="/login" 
            color="inherit" 
            variant="outlined"
            sx={{ color: '#000', borderColor: '#000' }}

          >
            Your Logo
          </Typography>
          
          <div style={{ position: 'relative', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', marginRight: '30px', marginLeft: 'auto', width: '300px' }}>
            <InputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
              style={{ color: 'inherit', paddingLeft: '8px', width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton onClick={handleSearch} style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)', color: 'inherit' }}>
              <SearchIcon />
            </IconButton>
          </div>

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

      <Sidebar isOpen={drawerOpen} onClose={toggleDrawer(false)} userRole="admin" />
    </>
  );
};

export default Navbar;
