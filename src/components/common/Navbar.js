import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, TextField, Button, Popover, MenuItem, Select, Divider } from '@mui/material';
import logo from './logo2.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from 'react-oidc-context';
import { useQuery, gql } from '@apollo/client'; 


const GET_CATEGORIES = gql`
  query GetCategories {
  getCategories {
    text
    path
  }
}
`;


const languages = ['English', 'Urdu', 'Arabic', 'German', 'Chinese'];

const Navbar = () => {
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(false);
  const [hoveredAll, setHoveredAll] = useState(false);
  const [hoveredSearchIcon, setHoveredSearchIcon] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [hoveredLogin, setHoveredLogin] = useState(false);
  const [hoveredSignup, setHoveredSignup] = useState(false);
  const { isAuthenticated, signoutRedirect } = useAuth();
  const [hoveredLanguageIcon, setHoveredLanguageIcon] = useState(false);
  const { loading, error, data } = useQuery(GET_CATEGORIES);


  const handleMouseEnterLanguageIcon = () => {
    setHoveredLanguageIcon(true);
  };

  const handleMouseLeaveLanguageIcon = () => {
    setHoveredLanguageIcon(false);
  };

  const handleMouseEnterLogin = () => {
    setHoveredLogin(true);
  };

  const handleLanguageIconClick = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };

  const handleCloseLanguagePopover = () => {
    setLanguageAnchorEl(null);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageAnchorEl(null);
  };

  const handleMouseLeaveLogin = () => {
    setHoveredLogin(false);
  };

  const handleMouseEnterSignup = () => {
    setHoveredSignup(true);
  };

  const handleMouseLeaveSignup = () => {
    setHoveredSignup(false);
  };

  const handleMouseEnterCart = () => {
    setHoveredCart(true);
  };

  const handleMouseLeaveCart = () => {
    setHoveredCart(false);
  };

  const handleMouseEnterLogo = () => {
    setHoveredLogo(true);
  };

  const handleMouseLeaveLogo = () => {
    setHoveredLogo(false);
  };

  const handleMouseEnterLocation = () => {
    setHoveredLocation(true);
  };

  const handleMouseLeaveLocation = () => {
    setHoveredLocation(false);
  };

  const handleMouseEnterAll = () => {
    setHoveredAll(true);
    document.body.style.cursor = 'pointer';
  };

  const handleMouseLeaveAll = () => {
    setHoveredAll(false);
    document.body.style.cursor = 'default';
  };

  const handleMouseEnterSearchIcon = () => {
    setHoveredSearchIcon(true);
    document.body.style.cursor = 'pointer';
  };

  const handleMouseLeaveSearchIcon = () => {
    setHoveredSearchIcon(false);
    document.body.style.cursor = 'default';
  };

  const handleClickLocation = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleApplyLocation = () => {
    setSelectedCountry(countryInput);
    setSelectedCity(cityInput);
    setAnchorEl(null);
  };

  const handleCountryChange = (event) => {
    setCountryInput(event.target.value);
  };

  const handleCityInputChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleAllClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCloseCategoryPopover = () => {
    setCategoryAnchorEl(null);
  };


  return (
    <AppBar position="static" sx={{ backgroundColor: 'black', width:'100%' }}>
      <Toolbar>
        <div
          style={{
            border: `2px solid ${hoveredLogo ? 'white' : 'black'}`,
            borderRadius: '5px',
            padding: '5px',
          }}
          onMouseEnter={handleMouseEnterLogo}
          onMouseLeave={handleMouseLeaveLogo}
        >
          <IconButton
            component={RouterLink}
            to="/"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{
              padding: '0',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 100,
                height: 50,
                marginLeft: '10px',

              }}
            />
          </IconButton>
        </div>
        <IconButton
          component={RouterLink}
          to="/location"
          edge="end"
          color="inherit"
          aria-label="location"
          onClick={handleClickLocation}
          onMouseEnter={handleMouseEnterLocation}
          onMouseLeave={handleMouseLeaveLocation}
          sx={{
            border: `2px solid ${hoveredLocation ? 'white' : 'black'}`,
            borderRadius: '5px',
            padding: '12px',
            display: 'flex',
            alignItems: 'center',
            width: '200px',
            marginLeft: '20px'
          }}
        >
          <LocationOnIcon style={{ marginRight: '10px' }} />
          {selectedCity || selectedCountry ? (
            <div style={{display:'flex'}}>
              <Typography variant="body1" sx={{ color: 'white', fontSize: '17px' }}>
                {selectedCity} ,
              </Typography>
              <Typography variant="body2" sx={{ color: 'white',marginLeft:'2px',marginTop:'2px' }}>
                {selectedCountry}
              </Typography>
            </div>
          ) : (
            <Typography variant="body1" sx={{ color: 'white' }}>Select Location</Typography>
          )}
        </IconButton>
        <Popover
          id={anchorEl ? 'location-popover' : undefined}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 230, left: 450 }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Choose your location
            </Typography>
            <Divider />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Delivery options and delivery speeds may vary for different locations.
            </Typography>
            <Button
              color="primary"
              sx={{ mt: 2, ml: 14, border: '1px solid black', borderRadius: '10px', backgroundColor: 'lightgrey', color:'black' }}
              component={RouterLink}
              to="/login"
              onClick={handleClosePopover}
            >
              Log in to see your address
            </Button>
            <Divider sx={{ mt: 2 }} />
            <Select
              value={countryInput}
              onChange={handleCountryChange}
              variant="outlined"
              fullWidth
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="">Choose a country</MenuItem>
              <MenuItem value="Pakistan">Pakistan</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              placeholder="Enter your location"
              fullWidth
              sx={{ mt: 2 }}
              value={cityInput}
              onChange={handleCityInputChange}
            />
            <Button onClick={handleApplyLocation} variant="contained" sx={{ mt: 2, ml: 1, mb: 3, float: 'right', }}>
              Apply
            </Button>
          </div>
        </Popover>
        <div
          style={{
            display: 'flex',
            border: '4px solid black',
            borderRadius: '5px',
            transition: 'border-color 0.3s ease',
            marginLeft: '60px',
            height:'50px'
          }}
        >
          <h6
            style={{
              borderRight: '2px solid gray',
              borderRadius: '5px 0px 0px 5px',
              color: 'black',
              width: '70px',
              height: '43px',
              textAlign: 'center',
              alignContent: 'center',
              backgroundColor: hoveredAll ? '#D4D4D4' : '#ECECEC',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={handleMouseEnterAll}
            onMouseLeave={handleMouseLeaveAll}
            onClick={handleAllClick}
          >
            All <ArrowDropDownIcon onClick={handleAllClick} />
          </h6>
          <Popover
          id="category-popover"
          open={Boolean(categoryAnchorEl)}
          anchorEl={categoryAnchorEl}
          onClose={handleCloseCategoryPopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 64, left: 350 }} 
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={{ padding: '5px' }}>
            {loading && <MenuItem>Loading...</MenuItem>}
            {error && <MenuItem>Error fetching categories</MenuItem>}
            {data && data.getCategories.map((category) => (
              <MenuItem
                text={category.text}
                component={RouterLink}
                to={category.path}
                onClick={handleCloseCategoryPopover}
              >
                <Typography variant="body1">
                  {category.text}
                </Typography>
              </MenuItem>
            ))}
          </div>
        </Popover>
          <input
            style={{
              backgroundColor: 'white',
              width: '400px',
              height:'43px',
              marginBottom:'10px'
            }}
          />
          <SearchIcon
            style={{
              borderLeft: '2px solid gray',
              backgroundColor: hoveredSearchIcon ? '#ff9800' : '#ffb74d',
              width: '60px',
              color: 'black',
              height: '43px',
              borderRadius: '0px 5px 5px 0px',
              padding: '10px'
            }}
            onMouseEnter={handleMouseEnterSearchIcon}
            onMouseLeave={handleMouseLeaveSearchIcon}
          />
        </div>
        <IconButton
          color="inherit"
          aria-label="language"
          onClick={handleLanguageIconClick}
          onMouseEnter={handleMouseEnterLanguageIcon}
          onMouseLeave={handleMouseLeaveLanguageIcon}
          sx={{
            border: `2px solid ${hoveredLanguageIcon ? 'white' : 'black'}`,
            borderRadius: '5px',
            marginLeft: '80px',
            width: '150px',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px'
          }}
        >
          <LanguageIcon style={{ marginRight: '10px', fontSize: '22px' }} />
          {selectedLanguage ? (
            <>
              <Typography variant="body1" sx={{ color: 'white', fontSize: '15px', marginLeft: '5px' }}>
                {selectedLanguage}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: 'white', fontSize: '15px' }}>Language</Typography>
          )}
        </IconButton>

        <Popover
          id="language-popover"
          open={Boolean(languageAnchorEl)}
          anchorEl={languageAnchorEl}
          onClose={handleCloseLanguagePopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 65, left: 1030 }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={{ padding: '20px' }}>
            {languages.map((language) => (
              <MenuItem  key={language} onClick={() => handleLanguageSelect(language)}>
                {language}
              </MenuItem>
            ))}
          </div>
        </Popover>
        {isAuthenticated ? (
          <Button
            color="inherit"
            variant="outlined"
            onClick={signoutRedirect}
            onMouseEnter={handleMouseEnterLogin}
            onMouseLeave={handleMouseLeaveLogin}
            style={{
              marginLeft: '20px',
              padding: '15px',
              border: `2px solid ${hoveredLogin ? 'white' : 'black'}`,
              borderRadius: '5px',
            }}
          >
            Log out
          </Button>
        ) : (
          <>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to="/login"
              onMouseEnter={handleMouseEnterLogin}
              onMouseLeave={handleMouseLeaveLogin}
              style={{
                marginLeft: '20px',
                padding: '15px',
                border: `2px solid ${hoveredLogin ? 'white' : 'black'}`,
                borderRadius: '5px',
              }}
            >
              Log in
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              component={RouterLink}
              to="/signup"
              onMouseEnter={handleMouseEnterSignup}
              onMouseLeave={handleMouseLeaveSignup}
              style={{
                marginLeft: '20px',
                padding: '15px',
                border: `2px solid ${hoveredSignup ? 'white' : 'black'}`,
                borderRadius: '5px',
              }}
            >
              Sign up
            </Button>
          </>
        )}
        <IconButton
          color="inherit"
          aria-label="cart"
          component={RouterLink}
          to="/cart"
          style={{
            marginLeft: '20px',
            padding: '15px',
            border: `2px solid ${hoveredCart ? 'white' : 'black'}`,
            borderRadius: '5px',
          }}
          onMouseEnter={handleMouseEnterCart}
          onMouseLeave={handleMouseLeaveCart}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;