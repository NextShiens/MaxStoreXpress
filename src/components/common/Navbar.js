import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import logo from './logo2.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField, InputAdornment, Radio, FormControlLabel, Popover, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  const { user, signinRedirect, isAuthenticated, } = useAuth();
  const [language, setLanguage] = useState('english');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    signinRedirect();
    navigate('/login');
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    handleClosePopover();
  };

  const handleLanguageIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'language-popover' : undefined;

  return (
    <AppBar position="static" color="inherit" sx={{marginTop:"12px",marginRight:"4px" , backgroundColor: '#fff', height: 'auto' }}>
      <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          color="inherit"
          sx={{ color: '#000', flexGrow: 1, textAlign: 'center', mb: { xs: 2, sm: 0 } }}
        >
          <img src={logo} alt="Logo" width="200" height="80" />
        </Typography>
        <TextField
          id="outlined-basic"
          label="Search in maxstore"
          variant="outlined"
          sx={{ flexGrow: 1, maxWidth: 500, mb: { xs: 2, sm: 0 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div style={{ display: 'flex' }}>
          <IconButton color="inherit" component={RouterLink} to="/cart" sx={{ color: '#000', mr: 1 }}>
            <ShoppingCartIcon />
          </IconButton>
          {isAuthenticated ? (
             <Button color="inherit" variant="outlined" onClick={handleLogout} sx={{ color: '#000', mr: 1 }}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                variant="outlined"
                startIcon={<PersonIcon />}
                sx={{ color: '#000', mr: 1 }}
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                color="inherit"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                sx={{ color: '#000', mr: 1 }}
              >
                Sign Up
              </Button>
            </>
          )}
          <div style={{ position: 'relative' }}>
            <IconButton color="inherit" aria-describedby={id} onClick={handleLanguageIconClick} sx={{ color: '#000', mr: 1 }}>
              <LanguageIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <List>
                <ListItem disablePadding>
                  <FormControlLabel
                    value="english"
                    control={<Radio color="primary" />}
                    label="English"
                    labelPlacement="start"
                    checked={language === 'english'}
                    onChange={handleLanguageChange}
                    style={{ margin: '5px' }}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <FormControlLabel
                    value="urdu"
                    control={<Radio color="primary" style={{ marginLeft: '20px' }} />}
                    label="Urdu"
                    labelPlacement="start"
                    checked={language === 'urdu'}
                    onChange={handleLanguageChange}
                    style={{ margin: '5px' }}
                  />
                </ListItem>
              </List>
            </Popover>
          </div>
        </div>
      </Toolbar>
      <Toolbar  sx={{marginTop:"8px", flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'center',gap:"15px" }}>
          <Typography
         
            variant="h6"
            component={RouterLink}
            to="/become-seller"
            color="inherit"
            sx={{ color: '#000', mr: 2, fontSize: '15px'  }}
          >
            Become a Seller
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/affiliate-program"
            color="inherit"
            sx={{ color: '#000', mr: 2, fontSize: '15px' }}
          >
            MaxStore Affiliate Program
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/help-support"
            color="inherit"
            sx={{ color: '#000', mr: 2, fontSize: '15px' }}
          >
            Help & Support
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/logistics-partner"
            color="inherit"
            sx={{ color: '#000', fontSize: '15px' }}
          >
            MaxStore Logistics Partner
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;