import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const UpdateProductForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    brandName: '',
    category: '',
    regularPrice: '',
    salePrice: '',
    productType: '',
    weight: '',
    stockStatus: '',
    date: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Box display="flex">
      <Box width="30%" p={2}>
        <Typography variant="h5" gutterBottom>Image Upload</Typography>
      </Box>

      <Box width="70%" p={2}>
        <Typography variant="h2" gutterBottom>Update Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{borderRadius:"16px"}}>
            <TextField label="Product Name" name="productName" value={formData.productName} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Brand Name" name="brandName" value={formData.brandName} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Category" name="category" value={formData.category} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Regular Price" name="regularPrice" value={formData.regularPrice} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Sale Price" name="salePrice" value={formData.salePrice} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Product Type" name="productType" value={formData.productType} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Weight" name="weight" value={formData.weight} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Stock Status" name="stockStatus" value={formData.stockStatus} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Date" name="date" value={formData.date} onChange={handleInputChange} fullWidth InputProps={{ endAdornment: <CalendarTodayIcon /> }} />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Box>
    </Box>
  );
};

export default UpdateProductForm;
