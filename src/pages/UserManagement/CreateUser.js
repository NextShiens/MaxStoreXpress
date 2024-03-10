import React, { useState } from 'react';
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

const CreateUserForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        dateOfBirth: '',
        imageUrl: '',
        role: '',
    });
    const [showIcon, setShowIcon] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [dateOfBirthError, setDateOfBirthError] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValidEmail(formData.email)) {
            setEmailError('Invalid email format');
            return;
        }

        if (!formData.dateOfBirth) {
            setDateOfBirthError('Date of birth is required');
            return;
        }

        setEmailError('');
        setDateOfBirthError('');
        console.log('Submitted data:', formData);
        onClose();

        toast.success('New User Added', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
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

    const isValidEmail = (email) => {
        return email.includes('@');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
        
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setShowIcon(false); 
        
                setFormData({
                    ...formData,
                    imageUrl: reader.result,
                });
            };
        
            reader.readAsDataURL(file);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                            <AccountCircleIcon style={{ width: '80px', height: '80px', marginRight: '20px', color: 'black' }} />
                        )}
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ width: '75px', height: '75px', marginRight: '20px', borderRadius: '50%', }}
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
                    <label htmlFor="image-upload" style={{ float: 'right', marginRight: '50px', marginTop: '45px', border: '1px solid black', borderRadius: '5px' }}>
                        <Button
                            component="span"
                            style={{ color: 'black', width: '30px', height: '30px', fontSize: '10px', textAlign: 'center', fontWeight: 'bold' }}
                        >
                            Image
                        </Button>
                    </label>
                </Box>
                <DialogContent style={{ width: '90%' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <div style={{ display: 'flex' }}>
                                <Grid item style={{ marginLeft: '30px', width: '232px' }}>
                                    <TextField
                                        label="Name"
                                        margin="normal"
                                        fullWidth
                                        required
                                        onChange={handleInputChange('userName')}
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: '30px' }}>
                                    <TextField
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
                                        label="Phone"
                                        margin="normal"
                                        fullWidth
                                        required
                                        onChange={handleInputChange('phone')}
                                    />
                                </Grid>
                                <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                    <TextField
                                        label="Address"
                                        margin="normal"
                                        fullWidth
                                        required
                                        onChange={handleInputChange('address')}
                                    />
                                </Grid>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Grid item style={{ marginLeft: '30px', width:'220px' }}>
                                    <TextField
                                        label="Password"
                                        margin="normal"
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        onChange={handleInputChange('password')}
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
                                <Grid item style={{ marginLeft: '30px', width: '214px', marginTop: '10px' }}>
                                    <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']} >
                                                <DatePicker 
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
                                        
                                    </div>
                                </Grid>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                    <InputLabel shrink style={{ marginTop: '5px' }}>
                                        Role
                                    </InputLabel>
                                    <Select
                                        labelId="role-label"
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        label="Role"
                                        fullWidth
                                        required
                                    >
                                        <MenuItem value="User">User</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
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
