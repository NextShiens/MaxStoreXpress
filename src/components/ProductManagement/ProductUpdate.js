import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper, Snackbar, Select, MenuItem } from '@mui/material';
import { useMutation, gql } from '@apollo/client';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct(
    $Name: String!
    $Price: Float!
    $category: String!
    $maxPrice: Float!
    $minPrice: Float!
    $description: String!
    $rating: String!
    $imageUrl: [String!]!
  ) {
    createProduct(
      Name: $Name
      Price: $Price
      category: $category
      maxPrice: $maxPrice
      minPrice: $minPrice
      description: $description
      rating: $rating
      images: $images
    ) {
      Id
      Name
      Price
      category
      maxPrice
      minPrice
      description
      rating
      images {
        imageURL
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct(
    $Id: ID!,
    $Name: String!,
    $description: String!,
    $category: String!,
    $Price: Float!,
    $maxPrice: Float!,
    $minPrice: Float!,
    $rating: String!,
    $images: [String!]!
  ) {
    updateProduct(
      Id: $Id,
      Name: $Name,
      description: $description,
      category: $category,
      Price: $Price,
      maxPrice: $maxPrice,
      minPrice: $minPrice,
      rating: $rating,
      images: $images
    ) {
      Id
      Name
      description
      category
      Price
      maxPrice
      minPrice
      images {
        imageURL
      }
    }
  }
`;

const UpdateProductForm = () => {
  const [formData, setFormData] = useState({
    Id: '',
    Name: '',
    Price: '',
    category: '',
    maxPrice: '',
    minPrice: '',
    description: '',
    rating: '',
  });

  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages.slice(0, 6 )); 
  };

  const handleSaveToDraft = async () => {
    try {
      if (formData.Id) {
        await updateProduct({ variables: { ...formData, images } });
      } else {
        await createProduct({ variables: { ...formData, images } });
      }
      setOpenSnackbar(true);
      setFormData({
        Id: '',
        Name: '',
        Price: '',
        category: '',
        maxPrice: '',
        minPrice: '',
        description: '',
        rating: '',
      });
      setImages([]);
      console.log('Product saved to draft:', formData); 
    } catch (error) {
      console.error('Error updating/creating product:', error);
    }
  };

  const handlePublish = async () => {
    try {
      // setOpenSnackbar(true);
      setFormData({
        Id: '',
        Name: '',
        Price: '',
        category: '',
        maxPrice: '',
        minPrice: '',
        description: '',
        rating: '',
      });
      setImages([]);
      console.log('formData', formData);
      console.log('Publishing product...');
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex">
      <Box width="50%" p={2}>
        <Typography variant="h5" gutterBottom>Image Upload</Typography>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <Box mt={2}>
          <Grid container spacing={2}>
            {images.map((image, index) => (
              <Grid item xs={4} key={index}>
                <Paper style={{ padding: '10px' }}>
                  <img src={URL.createObjectURL(image)} alt={`Image ${index}`} style={{ width: '100%', height: 'auto' }} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box width="50%" p={2} style={{ marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom>Update Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" name="Name" value={formData.Name} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Price" name="Price" value={formData.Price} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="jewellery">Jewellery</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="grocery">Grocery</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Max Price" name="maxPrice" value={formData.maxPrice} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Min Price" name="minPrice" value={formData.minPrice} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Rating" name="rating" value={formData.rating} onChange={handleInputChange} fullWidth />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSaveToDraft}>Save to Draft</Button>
          <Button variant="contained" color="secondary" onClick={handlePublish} style={{ borderRadius: '20px', backgroundColor: 'green' }}>Publish</Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Product successfully updated"
      />
    </Box>
  );
};

export default UpdateProductForm;
