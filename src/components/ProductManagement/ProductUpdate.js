import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, Snackbar } from '@mui/material';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      category
      maxPrice
      minPrice
      description
      rating
      imageUrl
    }
  }
`;

const UPLOAD_FILES_MUTATION = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files)
  }
`;

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    maxPrice: '',
    minPrice: '',
    description: '',
    rating: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);
  const [uploadFiles] = useMutation(UPLOAD_FILES_MUTATION);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveToDraft = async () => {
    try {
      await createProduct({ variables: { input: formData } });
      setOpenSnackbar(true);
      clearForm();
    } catch (error) {
      console.error('Error creating product:', error);
      showAlert('Error saving product to draft');
    }
  };

  const handlePublish = async () => {

    try {
      await createProduct({ variables: { input: formData } });
      setOpenSnackbar(true);
      clearForm();
    } catch (error) {
      console.error('Error publishing product:', error);
      showAlert('Error publishing product');
    }
  };

  const handleImageUpload = async () => {
    try {
      setIsUploading(true);
  
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('files', file);
      });
  
      const response = await axios.post(REACT_APP_GRAPHQL_FILE_UPLOAD_URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      const uploadedImageUrls = response.data; 
  
      const imageUrlArray = Array.isArray(uploadedImageUrls) ? uploadedImageUrls.map(url => String(url)) : [String(uploadedImageUrls)];
  
      setFormData({
        ...formData,
        imageUrl: imageUrlArray
      });
  
      console.log('Upload response:', response);
      showAlert('Files uploaded successfully');
      clearFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
      showAlert('Error uploading files');
    } finally {
      setIsUploading(false);
    }
  };
  
  
  const clearForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      maxPrice: '',
      minPrice: '',
      description: '',
      rating: '',
    });
  };

  const clearFiles = () => {
    setFiles([]);
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleChangeCategory = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const onDrop = useCallback(acceptedFiles => {
    if (files.length + acceptedFiles.length > 5) {
      showAlert('You can only upload up to 5 images.');
      return;
    }
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 5 - files.length
  });

  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };

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
        <Button variant="contained" color="primary" onClick={handleImageUpload} disabled={files.length === 0 || isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      </Box>

      <Box width="50%" p={2} style={{ marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom>Create Product</Typography>
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
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSaveToDraft}>Save to Draft</Button>
          <Button variant="contained" color="primary" onClick={handlePublish} disabled={!formData.imageUrl}>Publish</Button>
        </Box>
      </Box>

      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Product successfully published"
      /> */}
    </Box>
  );
};

export default CreateProductForm;