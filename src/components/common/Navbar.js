import  React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink, } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import logo from './logo2.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { TextField, InputAdornment, Radio, FormControlLabel, Popover, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';


const Navbar = () => {
  const { keycloak } = useKeycloak();
  const [language, setLanguage] = useState('english');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin + '/login' });
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
    <AppBar position="static" color="inherit" sx={{ backgroundColor: '#fff',height:'120px' }}>
      <Toolbar>
        <div style={{ display: 'flex', marginRight: 'auto',marginBottom:'30px' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/become-seller"
            color="inherit"
            sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
          >
            Become a Seller
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/affiliate-program"
            color="inherit"
            sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
          >
            MaxStore Affiliate Program
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/help-support"
            color="inherit"
            sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
          >
            Help & Support
          </Typography>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/logistics-partner"
            color="inherit"
            sx={{ color: '#000', marginRight: '16px', fontSize: '15px' }}
          >
            MaxStore Logistics Partner
          </Typography>
        </div>
      </Toolbar>
      <Toolbar>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ flexGrow: 1, color: '#000', marginLeft:'40px',marginBottom:'30px' }}
          >
            <img src={logo} alt="Logo" width="200" height="80" />
          </Typography>

          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{
              width: '500px',
              height: '50px',
              marginTop: '10px',
              marginLeft:'250px'
            }}
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

          {keycloak.authenticated ? (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={{ color: '#000', height: '40px', marginTop: '15px', marginLeft: "250px" }}
            >
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
                sx={{ color: '#000', height: '40px', marginTop: '15px', marginLeft: "250px" }}
              >
                Login
              </Button>
              <hr style={{ width: '1px', height: "35px", background: 'black', marginLeft: '20px', marginTop: '16px' }} />
              <Button
                component={RouterLink}
                to="/signup"
                color="inherit"
                variant="outlined"
                startIcon={<AccountCircleIcon />}
                sx={{ color: '#000', height: '40px', marginTop: '15px', marginLeft: '20px' }}
              >
                Sign Up
              </Button>
            </>
          )}

          <div style={{ position: 'relative' }}>
            <IconButton
              color="inherit"
              aria-describedby={id}
              onClick={handleLanguageIconClick}
              sx={{ color: '#000', marginLeft: "20px", marginTop: '8px', padding:'15px'}}
            >
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
              <List >
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

          <IconButton
            color="inherit"
            component={RouterLink}
            to="/cart"
            sx={{ color: '#000', marginLeft: "20px", marginBottom: '50px' }}
          
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
