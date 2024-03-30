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
import PetsIcon from '@mui/icons-material/Pets';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import FashionIcon from '@mui/icons-material/ShoppingBag';
import BabyIcon from '@mui/icons-material/ChildFriendly';
import HomeIcon from '@mui/icons-material/Home';
import ElectronicsIcon from '@mui/icons-material/DevicesOther';
import AccessoryIcon from '@mui/icons-material/Smartphone';
import TvIcon from '@mui/icons-material/Tv';
import SportsIcon from '@mui/icons-material/Sports';
import AccessoriesIcon from '@mui/icons-material/Watch';
import AutomotiveIcon from '@mui/icons-material/DriveEta';

const categories = [
  { text: "Groceries & Pets", icon: <PetsIcon />, key: 'Groceries & Pets', path: '/groceries' },
  { text: "Health & Beauty", icon: <HealthIcon />, key: 'Health & Beauty', path: '/health-beauty' },
  { text: "Men's Fashion", icon: <FashionIcon />, key: "Men's Fashion", path: '/mens-fashion' },
  { text: "Mother & Baby", icon: <BabyIcon />, key: 'Mother & Baby', path: '/mother-baby' },
  { text: "Home & Lifestyle", icon: <HomeIcon />, key: 'Home & Lifestyle', path: '/home-lifestyle' },
  { text: "Electronics Devices", icon: <ElectronicsIcon />, key: 'Electronics Devices', path: '/electronics-devices' },
  { text: "Electronic Accessories", icon: <AccessoryIcon />, key: 'Electronic Accessories', path: '/electronic-accessories' },
  { text: "TV & Home Appliances", icon: <TvIcon />, key: 'TV & Home Appliances', path: '/tv-home-appliances' },
  { text: "Sports & Outdoor", icon: <SportsIcon />, key: 'Sports & Outdoor', path: '/sports-outdoor' },
  { text: "Watches Bags & Jewellery", icon: <AccessoriesIcon />, key: 'Watches Bags & Jewellery', path: '/watches-bags-jewellery' },
  { text: "Automotive & Motorbike", icon: <AutomotiveIcon />, key: 'Automotive & Motorbike', path: '/automotive-motorbike' },
];

const languages = ['English', 'Urdu', 'Arabic', 'German', 'Chinese'];


const Navbar = () => {
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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
  };

  const handleMouseLeaveAll = () => {
    setHoveredAll(false);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleMouseEnterSearchIcon = () => {
    setHoveredSearchIcon(true);
  };

  const handleMouseLeaveSearchIcon = () => {
    setHoveredSearchIcon(false);
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
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
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
            marginLeft: '50px'
          }}
        >
          <LocationOnIcon style={{ marginRight: '10px' }} />
          {selectedCity || selectedCountry ? (
            <div>
              <Typography variant="body1" sx={{ color: 'white', marginLeft: '5px', fontSize: '17px' }}>
                {selectedCity}
              </Typography>
              <Typography variant="body2" sx={{ color: 'white' }}>
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
          anchorPosition={{ top: 300, left: 600 }}
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
              sx={{ mt: 2, ml: 14, border: '1px solid black', borderRadius: '10px', backgroundColor: 'lightgrey' }}
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
            <Button onClick={handleApplyLocation} variant="contained" sx={{ mt: 2, ml: 1, mb: 3, float: 'right' }}>
              Apply
            </Button>
          </div>
        </Popover>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `2px solid ${hoveredAll ? 'white' : 'black'}`,
            borderRadius: '5px',
            marginLeft: '100px',
            cursor: 'pointer',
          }}
          onMouseEnter={handleMouseEnterAll}
          onMouseLeave={handleMouseLeaveAll}
        >
          <Typography
            variant="body1"
            sx={{
              alignSelf: "center",
              backgroundColor: "transparent",
              padding: "5px",
              paddingLeft: "10px",
              borderRadius: "5px",
              marginRight: "10px",
              display: "flex",
              color: hoveredAll ? "orange" : "inherit",
            }}
            onMouseEnter={handleMouseEnterAll}
            onMouseLeave={handleMouseLeaveAll}
            onClick={handleAllClick}
          >
            All
            <ArrowDropDownIcon
              sx={{
                color: hoveredAll ? "orange" : "inherit",
              }}
            />
          </Typography>
          <Popover
            id="category-popover"
            open={Boolean(categoryAnchorEl)}
            anchorEl={categoryAnchorEl}
            onClose={handleCloseCategoryPopover}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 65, left: 400 }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <div style={{ padding: '5px' }}>
              {categories.map((category) => (
                <MenuItem
                  key={category.key}
                  component={RouterLink}
                  to={category.path}
                  onClick={handleCloseCategoryPopover}
                >
                  {category.icon}
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {category.text}
                  </Typography>
                </MenuItem>
              ))}
            </div>
          </Popover>
          <TextField
            variant="outlined"
            placeholder="Search"
            fullWidth
            sx={{
              backgroundColor: 'white',
              width: '400px',
              borderRadius: '0',
              borderTopRightRadius: '5px',
              borderBottomRightRadius: '5px',
            }}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <IconButton
            component="span"
            color="inherit"
            aria-label="search"
            sx={{
              backgroundColor: hoveredSearchIcon ? 'yellow' : 'black',
              borderRadius: '0 5px 5px 0',
              padding: '15px',
              '&:hover': {
                backgroundColor: hoveredSearchIcon ? '#ff9933' : '#ffb366',
              },
            }}
            onMouseEnter={handleMouseEnterSearchIcon}
            onMouseLeave={handleMouseLeaveSearchIcon}
          >
            <SearchIcon />
          </IconButton>
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
            marginLeft: '170px',
            width: '150px',
            padding: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px'
          }}
        >
          <LanguageIcon style={{ marginRight: '10px', fontSize: '22px' }} />
          {selectedLanguage ? ( // Display selected language if available
            <>
              <Typography variant="body1" sx={{ color: 'white', fontSize: '15px', marginLeft: '5px' }}>
                {selectedLanguage}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: 'white', fontSize: '15px' }}>Language</Typography> // Display default text if no language is selected
          )}
        </IconButton>

        <Popover
          id="language-popover"
          open={Boolean(languageAnchorEl)}
          anchorEl={languageAnchorEl}
          onClose={handleCloseLanguagePopover}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 65, left: 1150 }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div style={{ padding: '20px' }}>
            {languages.map((language) => (
              <MenuItem key={language} onClick={() => handleLanguageSelect(language)}>
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
