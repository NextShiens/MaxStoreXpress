import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem, InputLabel, IconButton, InputAdornment } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $firstName: String!, $lastName: String!, $attributes:[AttributeInput]!, $tenantID: String!) {
    createUser(input: {username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName, attributes: $attributes, tenantID: $tenantID}) {
      Username
      Attributes {
        Name
        Value
      }
      Enabled
      UserStatus
    }
  }
`;

const CreateUserForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        password: '',
        dateOfBirth: '',
        imageUrl: '',
        role: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createUserMutation({
                variables: {
                    username: formData.userName,
                    password: formData.password,
                    email: formData.email,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    attributes: [
                        { Name: 'phone', Value: formData.phone },
                        { Name: 'address', Value: formData.address },
                        { Name: 'dateOfBirth', Value: formData.dateOfBirth },
                    ],
                    tenantID: formData.tenantID,
                },
            });
            console.log(data);
        setFormData({
            userName: '',
            email: '',
            firstName: '',
            lastName: '',
            tenantID: '',
            phone: '',
            address: '',
            password: '',
            dateOfBirth: '',
            imageUrl: '',
            role: '',
        });

        onClose();

        toast.success('New User Added', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    } catch (error) {
        console.error('Failed to create user:', error);
        toast.error('Failed to create user', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

const handleInputChange = (field) => (event) => {
    setFormData({
        ...formData,
        [field]: event.target.value,
    });
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
                    <AccountCircleIcon style={{ width: '80px', height: '80px', marginRight: '20px', color: 'black' }} />
                </Box>
            </DialogTitle>
            <DialogContent style={{ width: '80%' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <div style={{ display: 'flex' }}>
                            <Grid item style={{ marginLeft: '30px', width: '232px' }}>
                                <TextField
                                    label="Username"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={formData.userName}
                                    onChange={handleInputChange('userName')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '30px' }}>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                />
                            </Grid>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Grid item style={{ marginLeft: '30px' }}>
                                <TextField
                                    label="First Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange('firstName')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                <TextField
                                    label="Last Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange('lastName')}
                                />
                            </Grid>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                <TextField
                                    label="Phone"
                                    margin="normal"
                                    fullWidth
                                    value={formData.phone}
                                    onChange={handleInputChange('phone')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '30px' }}>
                                <TextField
                                    label="Address"
                                    margin="normal"
                                    fullWidth
                                    value={formData.address}
                                    onChange={handleInputChange('address')}
                                />
                            </Grid>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                <TextField
                                    label="Password"
                                    margin="normal"
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
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
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Grid item style={{ marginLeft: '30px', width: '220px' }}>
                                <TextField
                                    label="Tenant ID"
                                    margin="normal"
                                    fullWidth
                                    value={formData.tenantID}
                                    onChange={handleInputChange('tenantID')}
                                />
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
