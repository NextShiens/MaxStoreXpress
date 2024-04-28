import React, { useState, useCallback, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, Snackbar } from '@mui/material';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { useParams, useLocation } from 'react-router-dom';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      category
      maxPrice
      minPrice
      description
      rating
      imageUrl
      slug
      brand
      tags
      stock
      discount
    }
  }
`;

const EditProduct = ({ tenantID }) => {
  const { id } = useParams();
  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId'); 

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    maxPrice: '',
    minPrice: '',
    description: '',
    rating: '',
    slug: '',
    brand: '',
    tags: '',
    stock: '',
    discount: '',
    imageUrl: [],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(true);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  useEffect(() => {
    async function fetchProductData(productId) {
      try {
        const fetchedProductData = await fetchProductData(productId);
        if (fetchedProductData) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: fetchedProductData.name || prevFormData.name,
            price: fetchedProductData.price || prevFormData.price,
            category: fetchedProductData.category || prevFormData.category,
            maxPrice: fetchedProductData.maxPrice || prevFormData.maxPrice,
            minPrice: fetchedProductData.minPrice || prevFormData.minPrice,
            description: fetchedProductData.description || prevFormData.description,
            rating: fetchedProductData.rating || prevFormData.rating,
            slug: fetchedProductData.slug || prevFormData.slug,
            brand: fetchedProductData.brand || prevFormData.brand,
            tags: fetchedProductData.tags ? fetchedProductData.tags.join(', ') : prevFormData.tags,
            stock: fetchedProductData.stock || prevFormData.stock,
            discount: fetchedProductData.discount || prevFormData.discount,
          }));
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    if (productIdFromQuery) {
      fetchProductData(productIdFromQuery);
    } else {
      fetchProductData(id); 
    }
  }, [id, productIdFromQuery]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveToDraft = async () => {
    try {
      const input = {
        ...formData,
        stock: parseInt(formData.stock),
        discount: parseInt(formData.discount),
      };

      const productId = id.trim(); 

      await updateProduct({ variables: { id: productId, input } });
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error saving product to draft:', error);
      showAlert('Error saving product to draft');
    }
  };

  const handleUpdate = async () => {
    try {
      const input = {
        ...(formData.name && { name: formData.name }),
        ...(formData.price && { price: formData.price }),
        ...(formData.category && { category: formData.category }),
        ...(formData.maxPrice && { maxPrice: formData.maxPrice }),
        ...(formData.minPrice && { minPrice: formData.minPrice }),
        ...(formData.description && { description: formData.description }),
        ...(formData.rating && { rating: formData.rating }),
        ...(formData.imageUrl.length > 0 && { imageUrl: formData.imageUrl }),
        ...(formData.slug && { slug: formData.slug }),
        ...(formData.brand && { brand: formData.brand }),
        ...(formData.tags && { tags: formData.tags.split(',').map(tag => tag.trim()) }),
        ...(formData.stock && { stock: parseInt(formData.stock) }),
        ...(formData.discount && { discount: parseInt(formData.discount) }),
      };
  
      const productId = id.trim();
  
      await updateProduct({ variables: { id: productId, input } });
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating product:', error);
      showAlert('Error updating product');
    }
  };
  
  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };
  

  const showAlert = (message) => {
    alert(message);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (files.length + acceptedFiles.length > 5) {
      showAlert('You can only upload up to 5 images.');
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }))]);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 5 - files.length,
  });

  return (
    <Box display="flex">
      <Box width="50%" p={2}>
        <Typography variant="h2" gutterBottom>Upload Images</Typography>
        <div {...getRootProps()} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
          <input {...getInputProps()} />
          <Typography>Drag 'n' drop some files here, or click to select files</Typography>
        </div>
        <Grid container spacing={3}>
          {files.map((file, index) => (
            <Grid item xs={3} key={index}>
              <img src={file.preview} alt={file.name} style={{ width: '100%' }} />
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" color="primary" disabled={files.length === 0 || isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      </Box>

      <Box width="50%" p={2} style={{ marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom>Update Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Price" name="price" value={formData.price} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={formData.category}
              onChange={handleChangeCategory}
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
          <Grid item xs={6}>
            <TextField label="Slug" name="slug" value={formData.slug} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Tags" name="tags" value={formData.tags} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Stock" name="stock" value={formData.stock} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Discount" name="discount" value={formData.discount} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Tenant ID" name="tenantID" value={tenantID} disabled fullWidth />
          </Grid>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSaveToDraft}>Save Changes</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Product successfully updated"
      />
    </Box>
  );
};

export default EditProduct;
