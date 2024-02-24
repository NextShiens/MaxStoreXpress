import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Grid } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MessageIcon from '@mui/icons-material/Message';
import PaletteIcon from '@mui/icons-material/Palette';
import SecurityIcon from '@mui/icons-material/Security';
import ConfigurationIcon from '@mui/icons-material/SettingsApplications';
import ViewModeIcon from '@mui/icons-material/Pageview';
import PaymentIcon from '@mui/icons-material/Payment';


const UpdateUserForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (location.state && location.state.user) {
      const userToUpdate = location.state.user;
      setFormData({
        firstName: userToUpdate.firstName || '',
        lastName: userToUpdate.lastName || '',
        phone: userToUpdate.phone || '',
        email: userToUpdate.email || '',
        address: userToUpdate.address || '',
        city: userToUpdate.city || '',
        state: userToUpdate.state || '',
        zipCode: userToUpdate.zipCode || '',
        password: userToUpdate.password || '',
      });
    }
  }, [location.state]);
  const send = () => {
    toast.success('Profile Update Successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'password' && confirmPassword && e.target.value !== confirmPassword) {
      setConfirmPassword('');
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = currentDate.toLocaleDateString('en-US', options);
    const [datePart, timePart] = dateTimeString.split(', ');
    const formattedTime = timePart.replace('at', '').trim();
    return `${datePart}, ${formattedTime}`;
  };
  const newCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dateString = currentDate.toLocaleDateString('en-US', options);
    return dateString;
  };
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#F9F9F9', display: 'flex', flexDirection: 'column' }}>
      <Box style={{ backgroundColor: '#fff', padding: '10px', margin: '10px', color: 'black', textAlign: 'left', width: '97%', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" style={{ marginLeft: '20px', fontWeight: 'bold', fontStyle: 'italic', padding: '10px' }}>Settings</Typography>
        <Typography variant="body1" style={{ marginRight: '20px', backgroundColor: '#F9F9F9', padding: '10px', borderRadius: '5px', border: '1px solid #E2E1E1' }}>{getCurrentDateTime()}</Typography>
      </Box>
      <Box style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Box style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
          <Box style={{ width: '90%', height: '270px', backgroundColor: 'rgb(255, 255, 255)', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {location.state.user && (
              <>
                <img
                  src={location.state.user.imageurl}
                  alt={location.state.user.username}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                />
                <Typography variant="h5">{formData.firstName} {formData.lastName}</Typography>
                {location.state.user.__typename === 'Admin' ? (
                  <Button variant="outlined" color="primary" style={{ borderRadius: '20px', marginTop: '10px' }}>Admin</Button>
                ) : (
                  <Button variant="outlined" color="primary" style={{ borderRadius: '20px', marginTop: '10px' }}>User</Button>
                )}
                <Typography variant="body1" style={{ marginRight: '20px', color: '#1976d2', padding: '10px', }}>
                  last visit {newCurrentDateTime()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '50%', borderRadius: '20px', }}
                >
                  Log Out
                </Button>
              </>
            )}
          </Box>
          <Box>
            <Box style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '20px', borderRadius: '10px', marginTop: '10px', marginBottom: '30px' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <NotificationsNoneIcon style={{ marginLeft: '-3px', marginRight: '5px', color: '#1976d2', fontSize: '25px' }} />
                <Typography variant="body1">Notification(2)</Typography>
              </div>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <MessageIcon style={{ marginRight: '5px', color: '#1976d2', fontSize: '20px' }} />
                <Typography variant="body1">Message(7)</Typography>
              </div>
            </Box>
          </Box>
          <Grid container style={{ height: '200px' }}>
            <Grid item xs={12} style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '20px', borderRadius: '10px' }}>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <EmailIcon style={{ marginRight: '5px', color: '#1976d2' }} />
                <Typography variant="body1">{formData.email}</Typography>
              </div>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <PhoneIcon style={{ marginRight: '5px', color: '#1976d2' }} />
                <Typography variant="body1">{formData.phone}</Typography>
              </div>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <HomeIcon style={{ marginRight: '5px', color: '#1976d2' }} />
                <Typography variant="body1">{formData.address}</Typography>
              </div>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <WorkIcon style={{ marginRight: '5px', color: '#1976d2' }} />
                <Typography variant="body1">Profile Information File</Typography>
              </div>
              <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <PersonIcon style={{ marginRight: '5px', color: '#1976d2' }} />
                <Typography variant="body1">{formData.firstName} {formData.lastName}</Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
        <Grid container style={{ width: '70%', marginRight: '10px', marginTop: '20px' }}>
          <Grid item xs={12} style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '20px', borderRadius: '10px' }}>
            <h2>My Profile Details</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <TextField label="First Name" name="firstname" value={formData.firstName} onChange={handleInputChange} fullWidth />
              <TextField label="Last Name" name="lastname" value={formData.lastName} onChange={handleInputChange} fullWidth />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <TextField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} fullWidth />
              <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} fullWidth />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <TextField label="Address" name="address" value={formData.address} onChange={handleInputChange} fullWidth />
              <TextField label="City" name="city" value={formData.city} onChange={handleInputChange} fullWidth />
            </div>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <TextField label="State" name="state" value={formData.state} onChange={handleInputChange} fullWidth />
              <TextField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} fullWidth />
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        style={{ color: '#3498db' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                        style={{ color: '#3498db' }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <Typography
                variant="caption"
                style={{
                  color: '#3498db',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'inline-block',
                  paddingRight: '5px',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Change Password
                {isHovered && (
                  <div
                    style={{
                      bottom: '0',
                      left: '0',
                      height: '2px',
                      width: '100%',
                      backgroundColor: '#3498db',
                    }}
                  />
                )}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={send}
              style={{ width: '30%', borderRadius: '20px', marginTop: '20px' }}
            >
              Submit
            </Button>
            <h2>Admin Pannel Tools</h2>
            <Box style={{ backgroundColor: 'rgb(255, 255, 255)', padding: '30px', borderRadius: '10px', marginTop: '10px', marginBottom: '30px', }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <div>
                  <PaymentIcon style={{ marginRight: '5px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">Connected Apps(12)</Typography>
                </div>
                <div>
                  <PaletteIcon style={{ marginRight: '5px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">Appearance</Typography>
                </div>
                <div>
                  <SecurityIcon style={{ marginRight: '5px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">Security Assets</Typography>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginTop: '15px' }}>
                <div>
                  <ConfigurationIcon style={{ marginRight: '20px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">Configuration Settings</Typography>
                </div>
                <div>
                  <PaymentIcon style={{ marginLeft: '10px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">Payment Methods</Typography>
                </div>
                <div>
                  <ViewModeIcon style={{ marginRight: '85px', color: '#1976d2', fontSize: '25px' }} />
                  <Typography variant="body1">View Mode</Typography>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};
export default UpdateUserForm;
