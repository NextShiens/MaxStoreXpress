import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, ListItem, ListItemIcon, ListItemText, Menu,Popover, Button, MenuItem, InputAdornment, IconButton, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from './logo2.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReorderIcon from '@mui/icons-material/Reorder';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery, gql } from '@apollo/client';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../globalReduxStore/actions';
import { useFetchCartData } from '../../globalReduxStore/reducers/cartOperations';
import { useAuth } from 'react-oidc-context';
import Badge from '@mui/material/Badge';
import { UserManager } from 'oidc-client';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { oidcConfig, REACT_APP_AWS_REGION, OPEN_ID_CLIENT_ID, WEBAPP_DOMAIN } from '../../constant';

const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      text
      path
    }
  }
`;

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ccc',
    },
    '&:hover fieldset': {
      borderColor: '#ccc',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

const Navbar = () => {
  const dispatch = useDispatch();
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const [showCategories, setShowCategories] = useState(window.innerWidth > 992);
  const [showLanguage, setShowLanguage] = useState(window.innerWidth > 992);
  const [showListIcon, setShowListIcon] = useState(window.innerWidth <= 992);
  const [showLoginSignup, setShowLoginSignup] = useState(window.innerWidth > 760);

  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const { user, isAuthenticated, isLoading } = useAuth();
  const userManagers = new UserManager(oidcConfig);
  const navigate = useNavigate();
  const [listPopupAnchorEl, setListPopupAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [popupSearchValue, setPopupSearchValue] = useState('');
  const [hoveredLogin, setHoveredLogin] = useState(false);
  const [hoveredSignup, setHoveredSignup] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
    const userID= user?.profile?.sub || null;
    const { loading: isLoadingCart, error: cartError, data: cartData, refetch } = useFetchCartData(userID);
  const cart = useSelector((state) => state.cart.cart);


  const languages = ['English', 'Urdu', 'French', 'Arabic'];

  const handleListIconClick = (event) => {
    setListPopupAnchorEl(event.currentTarget);
  };

  const handleCloseListPopup = () => {
    setListPopupAnchorEl(null);
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleMouseEnterLogin = () => {
    setHoveredLogin(true);
  };

  const handleMouseEnterSignup = () => {
    setHoveredSignup(true);
  };

  const handleMouseLeaveSignup = () => {
    setHoveredSignup(false);
  };

  const handleMouseLeaveLogin = () => {
    setHoveredLogin(false);
  };
  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleLogout = async () => {
    try {
      await userManagers.signoutRedirect();
      window.location.href = `https://maxstore.auth.${REACT_APP_AWS_REGION}.amazoncognito.com/logout?client_id=${OPEN_ID_CLIENT_ID}&logout_uri=${WEBAPP_DOMAIN}`;
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowCategories(window.innerWidth > 992);
      setShowLanguage(window.innerWidth > 992);
      setShowListIcon(window.innerWidth <= 992);
      setShowLoginSignup(window.innerWidth > 760);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    useEffect(() => {
    if (data && data.getCartItems) {
      dispatch(actionCreators.setCart(data.getCartItems.products));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("User: LoggedIn")
    }
  }, [user, isAuthenticated, navigate])

  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseCategoryPopover = () => {
    setCategoryAnchorEl(null);
  };

  const handleCloseLanguagePopover = () => {
    setLanguageAnchorEl(null);
  };

  const handleLoginClick = () => {
    console.log('Login clicked');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setListPopupAnchorEl(null);
      }
      setShowLoginSignup(window.innerWidth > 760);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePopupSearchInputChange = (event) => {
    setPopupSearchValue(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#eaeaea' }}>
      <Toolbar>
        <div className="flex w-full items-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div
              className="flex items-center"
              style={{ padding: '5px', height: '60px', border: '2px solid transparent', borderRadius: '5px', marginRight: '20px' }}

            >
              <img
                src={logo}
                alt="Logo"
                className="h-14 my-2 md:my-2 cursor-pointer"
              />
              <Typography variant="h5" component="div" style={{ color: 'black', }}>
                MaxStore
              </Typography>
            </div>
          </Link>

          {showCategories && (
            <div
              className="flex items-center"
              style={{
                width: '160px',
                marginLeft: '50px',
                border: '2px solid transparent',
                borderRadius: '5px',
                padding: '5px',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.cursor = 'pointer';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.cursor = 'none';
              }}
              onClick={handleCategoryClick}
            >
              <ListItem sx={{ backgroundColor: 'transparent' }}>
                <ListItemIcon>
                  <ReorderIcon style={{ color: 'black', marginLeft: '-15px' }} />
                </ListItemIcon>
                <ListItemText primary="Categories" style={{ color: 'black', marginLeft: '-35px' }} />
                <ListItemIcon>
                  <KeyboardArrowDownIcon style={{ color: 'black', marginLeft: '80px' }} />
                </ListItemIcon>
              </ListItem>
            </div>
          )}

          <Popover
            id="category-popover"
            open={Boolean(categoryAnchorEl)}
            anchorEl={categoryAnchorEl}
            onClose={handleCloseCategoryPopover}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 54, left: 270 }}
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
                  key={category.text}
                  component={Link}
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

          <div style={{ position: 'relative', marginLeft: 'auto' }}>
            <div style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '3px', marginRight: '10px' }}>
              <CustomTextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                value={searchValue}
                onChange={handleSearchInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          {showLanguage && (
           <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
           <LanguageIcon
             style={{ marginRight: '10px', color: 'black', cursor: 'pointer' }}
             aria-controls="language-menu"
             aria-haspopup="true"
           />
           <Typography
             variant="body1"
             style={{ color: 'black', cursor: 'pointer' }}
             onClick={handleLanguageClick}
           >
             Language
             <ArrowDropDownIcon/>
           </Typography>
           <Menu
             id="language-menu"
             anchorEl={anchorEl}
             open={Boolean(anchorEl)}
             onClose={handleCloseLanguageMenu}
             anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
             }}
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
           >
             {languages.map((language) => (
               <MenuItem key={language} onClick={handleCloseLanguageMenu}>
                 <Typography variant="body1">{language}</Typography>
               </MenuItem>
             ))}
           </Menu>
         </div>
       )}

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            {showLoginSignup && (
              <>
                {isLoading ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    onMouseEnter={handleMouseEnterLogin}
                    onMouseLeave={handleMouseLeaveLogin}
                    style={{
                      marginLeft: '20px',
                      padding: '15px',
                      borderRadius: '5px',
                      color: 'black',
                    }}
                  >
                    Loading...
                  </Button>
                ) : isAuthenticated ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleLogout}
                    style={{
                      padding: '10px',
                      border: '2px solid black',
                      borderRadius: '5px',
                      color: 'black',
                    }}
                  >
                    LogOut
                  </Button>
                ) : (
                  <>
                    <Button
                      color="inherit"
                      variant="outlined"
                      component={Link}
                      to="/login"
                      onMouseEnter={handleMouseEnterLogin}
                      onMouseLeave={handleMouseLeaveLogin}
                      style={{
                        marginLeft: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                        color: 'black',
                      }}
                    >
                      LogIn
                    </Button>
                    <Button
                      color="inherit"
                      variant="outlined"
                      component={Link}
                      to="/signup"
                      onMouseEnter={handleMouseEnterSignup}
                      onMouseLeave={handleMouseLeaveSignup}
                      style={{
                        marginLeft: '20px',
                        padding: '10px',
                        borderRadius: '5px',
                        color: 'black',
                      }}
                    >
                      SignUp
                    </Button>
                  </>
                )}
              </>
            )}
            <IconButton
              color="inherit"
              aria-label="cart"
              onClick={handleCartClick}
              style={{
                marginLeft: '20px',
                padding: '15px',
                borderRadius: '50%',
                color: 'black',
              }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          {showListIcon && (
            <IconButton
              aria-label="list"
              color="inherit"
              onClick={handleListIconClick}
            >
              <ReorderIcon style={{ color: 'black' }} />
            </IconButton>
          )}
          <Popover
            open={Boolean(listPopupAnchorEl)}
            anchorEl={listPopupAnchorEl}
            onClose={handleCloseListPopup}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 0, right: 0 }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                width: 300,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                right: 0,
                marginTop: '50px',
                padding: '0px',
              },
            }}
          >
            <div style={{ position: 'relative', marginLeft: 'auto' }}>
              <div style={{ border: '2px solid #ccc', borderRadius: '5px', padding: '3px', marginRight: '10px', marginTop: '20px', marginBottom: '20px' }}>
                <CustomTextField
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  value={popupSearchValue}
                  onChange={handlePopupSearchInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            {loading && <MenuItem>Loading...</MenuItem>}
            {error && <MenuItem>Error fetching categories</MenuItem>}
            {data && data.getCategories.map((category) => (
              popupSearchValue.trim() === '' || category.text.toLowerCase().includes(popupSearchValue.toLowerCase()) ? (
                <MenuItem key={category.text} onClick={handleCloseListPopup} sx={{ paddingLeft: '10px', paddingRight: '10px', marginBottom: '-10px' }}>
                  <Link to={category.path} style={{ textDecoration: 'none' }}>
                    <Typography variant="body1">{category.text}</Typography>
                  </Link>
                </MenuItem>
              ) : null
            ))}
            <hr style={{ margin: '10px 0px' }} />
            {window.innerWidth <= 760 && !isAuthenticated && (
              <>
                <MenuItem onClick={handleCloseListPopup}>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <Typography variant="body1" sx={{ border: '1px solid black', backgroundColor: '#eaeaea', width: '100%', display: 'block', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>LogIn</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseListPopup}>
                  <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <Typography variant="body1" sx={{ border: '1px solid black', backgroundColor: '#eaeaea', width: '100%', display: 'block', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>SignUp</Typography>
                  </Link>
                </MenuItem>
              </>
            )}
            {isAuthenticated && (
              <MenuItem onClick={handleLogout}>
                <Typography variant="body1" sx={{ border: '1px solid black', backgroundColor: '#eaeaea', width: '100%', display: 'block', padding: '10px', textAlign: 'center', borderRadius: '5px' }}>LogOut</Typography>
              </MenuItem>
            )}
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;