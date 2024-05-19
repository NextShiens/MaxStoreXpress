import React, { useState } from 'react';
import { gql , useMutation} from '@apollo/client';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem, InputLabel, IconButton, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CreateUserForm = ({ open, onClose, handleCreateUser }) => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        preferredLanguage: '',
        tenantID: '',
        imageUrl: null,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // Add this line
    const [showIcon, setShowIcon] = useState(true); // Add this line
    const [dateOfBirthError, setDateOfBirthError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        handleCreateUser(formData);
        console.log(formData);
    };

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
        if (field === 'email') {
            setEmailError('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageUrl: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="auto" height='auto'>
<Box style={{ border: '3px solid black', width: '600px', height: '600px' }}>
<DialogTitle style={{ display: 'flex', height: '50px', justifyContent: 'space-between' }}>
<Typography color="black" sx={{ textAlign: "left", marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
Create User
</Typography>
<Box>
{showIcon && (
<AccountCircleIcon style={{ width: '80px', height: '80px', marginRight: '20px',marginTop:'40px', color: 'black' }} />
)}
{selectedImage && (
<img
src={selectedImage}
alt="Selected"
style={{ width: '80px', height: '80px', marginRight: '20px', borderRadius: '50%', }}
/>
)}
<Input
accept="image/*"
id="image-upload"
type="file"
onChange={handleImageUpload}
style={{ display: 'none' }}
/>
</Box>
</DialogTitle>
<Box>
<label htmlFor="image-upload" style={{ float: 'right', marginRight: '50px', marginTop: '100px', border: '1px solid black', borderRadius: '5px' }}>
<Button
component="span"
style={{ color: 'black', width: '30px', height: '30px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}
>
Image
</Button>
</label>
</Box>
<DialogContent style={{ width: '80%' }}>
<form onSubmit={handleSubmit}>
<Grid container spacing={2}>
<div style={{ display: 'flex' }}>
<Grid item style={{ marginLeft: '30px', width: '232px' }}>
<TextField
  type='text'
  label="Username"
  margin="normal"
  fullWidth
  required
  onChange={handleInputChange('username')}
/>
</Grid>
<Grid item style={{ marginLeft: '30px' }}>
<TextField
type='email'
label="Email"
margin="normal"
fullWidth
required
error={!!emailError}
helperText={emailError}
onChange={handleInputChange('email')}
/>
</Grid>
</div>
<div style={{ display: 'flex' }}>
<Grid item style={{ marginLeft: '30px' }}>
<TextField
type='text'
label="First Name"
margin="normal"
fullWidth
required
onChange={handleInputChange('firstName')}
/>
</Grid>
<Grid item style={{ marginLeft: '30px', width: '220px' }}>
<TextField
label="Last Name"
margin="normal"
fullWidth
required
onChange={handleInputChange('lastName')}
/>
</Grid>
</div>
<div style={{ display: 'flex' }}>
<Grid item style={{ marginLeft: '30px' }}>
<TextField
type='text'
label="Phone"
margin="normal"
fullWidth
required
onChange={handleInputChange('phone')}
/>
</Grid>
<Grid item style={{ marginLeft: '30px', width: '220px' }}>
<TextField
type='text'
label="Address"
margin="normal"
fullWidth
required
onChange={handleInputChange('address')}
/>
</Grid>
</div>
<div style={{ display: 'flex' }}>
<Grid item style={{ marginLeft: '30px' }}>
<TextField
type='text'
label="PreferredLanguage"
margin="normal"
fullWidth
required
onChange={handleInputChange('preferredLanguage')}
/>
</Grid>
<Grid item style={{ marginLeft: '30px', width: '220px' }}>
<TextField
type='text'
label="TenantID"
margin="normal"
fullWidth
required
onChange={handleInputChange('tenantID')}
/>
</Grid>
</div>
<div style={{ display: 'flex' }}>
<Grid item style={{ marginLeft: '30px', width:'200px' }}>
<TextField
label="Password"
margin="normal"
fullWidth
required
onChange={handleInputChange('password')}
type={showPassword ? 'text' : 'password'}
InputProps={{
endAdornment: (
<InputAdornment position="end">
<IconButton
onClick={handleTogglePasswordVisibility}
edge="end"
>
{showPassword ? <VisibilityOff /> : <Visibility />}
</IconButton>
</InputAdornment>
),
}}
/>
</Grid>
<Grid item style={{ marginLeft: '30px', width: '200px', marginTop: '10px' }}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['DatePicker']} >
<DatePicker
type='date'
label="Date of Birth"
value={formData.dateOfBirth}
onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
required
/>
</DemoContainer>
{dateOfBirthError && (
<Typography variant="body2" color="error">
{dateOfBirthError}
</Typography>
)}
</LocalizationProvider>
</Grid>
</div>
</Grid>
<Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
<Button type="submit" style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black', padding: '10px' }}>
Create
</Button>
<Button onClick={onClose} style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black', marginLeft: '10px', padding: '10px' }}>
Cancel
</Button>
</Box>
</form>
</DialogContent>
</Box>
</Dialog>
 
 
    );
};
export default CreateUserForm;
