import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



const CreateUserForm = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        imageUrl: '',
        role: '',
    });
    const [emailError, setEmailError] = useState('');
    const [selectedImage, setSelectedImage] = useState('https://static.thenounproject.com/png/3073402-200.png');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValidEmail(formData.email)) {
            setEmailError('Invalid email format');
            return;
        }
        setEmailError('');
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

                setFormData({
                    ...formData,
                    imageUrl: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };
    return (
        <Dialog open={open} onClose={onClose} maxWidth="auto" height='auto' >
            <Box style ={{border:'3px solid black', radius:'20px', width:'1200px', height:'500px'}}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="black" sx={{ textAlign: "left", marginTop: '20px', fontSize: '2.0rem' }}>
                        Create User
                    </Typography>
                    <Box >
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ width: '100px', height: '100px', marginRight: '20px', marginBottom: '10px', borderRadius: '50%' }}
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
                    <label htmlFor="image-upload" style={{ float: 'right', marginRight: '30px', marginTop: '-30px', border: '1px solid black', borderRadius: '5px' }}>
                        <Button
                            component="span"
                            style={{ color: 'black' }}
                        >
                            Upload Image
                        </Button>
                    </label>
                </Box>


                <DialogContent style={{ width: '80%' }}>
                    <form onSubmit={handleSubmit}>
                        
                        <Grid container spacing={2}>
                        <div style={{display:'flex'}}>
                            <Grid item style={{ marginLeft: '50px', }}>
                                <TextField
                                    label="First Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('firstName')}
                                />
                            </Grid>

                            <Grid item style={{ marginLeft: '55px', width:'232  px' }}>
                                <TextField
                                    label="Last Name"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('lastName')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '50px',  }}>
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
                            <Grid item style={{ marginLeft: '50px' }}>
                                <TextField
                                    label="Phone"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('phone')}
                                />
                            </Grid>
                            </div>
                            <div style={{display:'flex'}}>
                            <Grid item style={{ marginLeft: '50px', width:'195px', marginTop:'15px'}}>
                                <TextField
                                    label="Address"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={handleInputChange('address')}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: '50px', width:'200px', marginTop:'23px' }}>
                                
                                <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker label="Basic date picker" />
                                    </DemoContainer>
                                </LocalizationProvider>
                                </div>
                            </Grid>

                            <Grid item style={{ marginLeft: '50px', width: '192px',  }}>
                                <InputLabel shrink style={{marginTop:'5px'}}>
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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px', }}>
                            <Button type="submit" style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black' , padding:'10px'}}>
                                Create
                            </Button>
                            <Button onClick={onClose} style={{ borderRadius: '5px', color: 'black', margin: '10px', border: '1px solid black', marginLeft: '10px', padding:'10px' }}>
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