import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem, InputAdornment, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!, $firstName: String!, $lastName: String!, $attributes: JSON!,$imageUrl:String) {
    createUser(input: {username: $username, password: $password, email: $email, firstName: $firstName, lastName: $lastName, attributes: $attributes,imageUrl:$imageUrl}) {
      id
      username
      email
      firstName
      lastName
      attributes
    }
  }
`;

const CreateUserForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        username: '',
        phone: '',
        address: '',
        password: '',
        dateOfBirth: '',
        imageUrl: '',
        role: '',
    });
    const [showIcon, setShowIcon] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [selectedImage, setSelectedImage] = useState('https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg');

    const [createUserMutation] = useMutation(CREATE_USER_MUTATION);

    const handleSubmit = async (event) => {
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

        try {
            const { data } = await createUserMutation({ variables: {
                username: formData.username,
                password: 'somePassword',
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                attributes: {
                    phone: formData.phone,
                    address: formData.address,
                    dateOfBirth: formData.dateOfBirth,
                }
            }});
            console.log('User created:', data.createUser);
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
            toast.error('Failed to create user');
        }
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

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md"  >
            <Box >
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="black" sx={{ textAlign: "left", marginTop: '20px', fontSize: '2.5rem' }}>
                        Create User
                    </Typography>
                    <Box sx={{ alignItems: 'center' }}>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ width: '100px', height: '100px', marginRight: '60px', marginBottom: '10px', borderRadius: '20px' }}
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
                    <label htmlFor="image-upload" style={{ float: 'right', marginRight: '70px', marginTop: '-30px', border: '1px solid black', borderRadius: '5px' }}>
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
                            <Grid item style={{ marginLeft: '100px' }}>
                                <TextField
                                    label="First Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('firstName')}
                                />
                            </Grid>

                            <Grid item style={{ marginLeft: '100px' }}>
                                <TextField
                                    label="Last Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('lastName')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '100px' }}>
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
                            <Grid item style={{ marginLeft: '100px' }}>
                                <TextField
                                    label="Username"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('username')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '100px' }}>
                                <TextField
                                    label="Phone"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('phone')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '100px' }}>
                                <TextField
                                    label="Address"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('address')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '100px', width: '240px' }}>
                                <TextField
                                    label="Date of Birth"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('dateOfBirth')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ cursor: 'pointer' }}>
                                                <EventIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Basic date picker" />
                                    </DemoContainer>
                                </LocalizationProvider>
                                </div>
                            </Grid>

                            <Grid item style={{ marginLeft: '100px', width: '240px' }}>
                                <InputLabel shrink>
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
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <Button type="submit" style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black' }}>
                                Create
                            </Button>
                            <Button onClick={onClose} style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black', marginLeft: '10px' }}>
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

