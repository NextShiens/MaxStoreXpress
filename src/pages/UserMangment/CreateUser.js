import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem, InputLabel } from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" >
            <DialogTitle>
                <Typography color="black" sx={{ textAlign: "left", m: 2, fontSize: '2.5rem' }}>
                    Create User
                </Typography>
            </DialogTitle>
            <DialogContent style={{ width: '90%' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="First Name"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Name"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('lastName')}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                            <TextField
                                label="Phone"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('phone')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Address"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('address')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Date of Birth"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('dateOfBirth')}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Image Url"
                                margin="normal"
                                fullWidth
                                required
                                onChange={handleInputChange('imageUrl')}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Button type="submit" variant="contained" color="primary" style={{ borderRadius: '20px' }}>
                            Create
                        </Button>
                        <Button onClick={onClose} style={{ borderRadius: '20px', marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};
export default CreateUserForm;
