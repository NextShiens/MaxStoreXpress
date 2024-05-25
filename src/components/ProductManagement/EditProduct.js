import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, Snackbar, Checkbox, FormControlLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useParams, useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import {  useDispatch } from 'react-redux';
import { actionCreators } from '../../globalReduxStore/actions';
import { useUpdateProduct } from '../../globalReduxStore/reducers/productoperation';

const EditProduct = () => {
  const location = useLocation();
  const { product } = location.state;
  console.log('Product:', product);
  const updateProduct = useUpdateProduct();
  const dispatch = useDispatch();
  const { id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const productIdFromQuery = searchParams.get('productId'); 

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    maxPrice: product.maxPrice,
    minPrice: product.minPrice,
    description: product.description,
    slug: product.slug,
    brand: product.brand,
    tags: product.tags,
    stock: product.stock,
    discount: product.discount,
    status: product.status,
    paymentMethods: product.paymentMethods,
    imageUrl: product.imageUrl, 
  });

  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading] = useState(false);
 

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
      dispatch(actionCreators.updateProduct({ id: productId, input }));
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
        ...(formData.price && { price: parseFloat(formData.price) }),
        ...(formData.category && { category: formData.category }),
        ...(formData.maxPrice && { maxPrice: parseFloat(formData.maxPrice) }),
        ...(formData.minPrice && { minPrice: parseFloat(formData.minPrice) }),
        ...(formData.description && { description: formData.description }),
        ...(formData.imageUrl.length > 0 && { imageUrl: formData.imageUrl }),
        ...(formData.slug && { slug: formData.slug }),
        ...(formData.brand && { brand: String(formData.brand) }),
        ...(formData.tags && { tags: formData.tags}),
        ...(formData.stock && { stock: parseInt(formData.stock) }),
        ...(formData.discount && { discount: parseInt(formData.discount) }),
        ...(formData.tenantID && { tenantID: formData.tenantID }),
        ...(formData.paymentMethods && { paymentMethods: formData.paymentMethods }),
        ...(formData.status && { status: formData.status }),
      };
  
      const productId = id.trim();
  
      await updateProduct({ variables: { id: productId, input } });
      dispatch(actionCreators.updateProduct({ id: productId, input }));
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating product:', error);
      showAlert('Error updating product');
    }
  };

  const handlePaymentMethodChange = (e) => {
    const { value, checked } = e.target;
    const updatedPaymentMethods = [...formData.paymentMethods]; 
    const index = updatedPaymentMethods.indexOf(value);
  
    if (checked && index === -1) {
      updatedPaymentMethods.push(value); 
    } else if (!checked && index !== -1) {
      updatedPaymentMethods.splice(index, 1); 
    }
  
    setFormData(prevFormData => ({
      ...prevFormData,
      paymentMethods: updatedPaymentMethods,
    }));
  };
  
  const handleChangeCategory = (e) => {
    const value = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      category: value,
    }));
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = currentDate.toLocaleDateString('en-US', options);
    const [datePart, timePart] = dateTimeString.split(', ');
    const formattedTime = timePart.replace('at', '').trim();
    return `${datePart}, ${formattedTime}`;
  };

  const showAlert = (message) => {
    alert(message);
  };
  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (files.length + acceptedFiles.length > 5) {
      showAlert('You can only upload up to 5 images.');
      return;
    }
    const newImageUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageUrl: [FormData.imageUrl, ...newImageUrls]
    }));
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }))]);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 5 - files.length,
  });

  const paymentMethods = [
    { name: 'MasterCard', value: 'MasterCard', image: 'https://shop-point.merku.love/assets/mc-8847c9c4.svg' },
    { name: 'Visa', value: 'Visa', image: 'https://shop-point.merku.love/assets/visa-b8e4f9fc.svg' },
    { name: 'Google Pay', value: 'GooglePay', image: 'https://shop-point.merku.love/assets/googlepay-29a97f47.svg' },
    { name: 'Apple Pay', value: 'ApplePay', image: 'https://shop-point.merku.love/assets/applepay-0249fd50.svg' },
    { name: 'PayPal', value: 'PayPal', image: 'https://shop-point.merku.love/assets/paypal-2d7156e7.svg' },
    { name: 'BitPay', value: 'BitPay', image: 'https://shop-point.merku.love/assets/bitpay-9ae748cf.svg' }
  ];

  return (
    <div>
      <Box style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', border: '1px solid #ffffff', borderRadius: '6px', padding: '15px', margin: '10px', marginTop: '30px',  boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)',height:'90px',width:'99%', fontFamily:'cursive' }}>
        <Typography variant="h6" style={{ marginLeft: '40px', marginTop: '5px', fontWeight: 'bold', fontSize:'38px' }}>UPDATE PRODUCT</Typography>
        <Typography variant="body1" style={{ backgroundColor: '#F9F9F9', padding: '13px', borderRadius: '5px', border: '1px solid #E2E1E1', marginRight: '30px', width:'328px' , height:'61px', textAlign:'center',fontWeight:'700', fontFamily:'cursive'}}>{getCurrentDateTime()}</Typography>
      </Box>
    <Box style={{display:'flex', border:'1px solid #ffffff', borderRadius:'6px', padding:'30px', height:'95%', boxShadow:'0 0 14px rgba(0, 0, 0, 0.1)' , backgroundColor: '#ffffff', margin:'20px 20px 20px 20px',  fontFamily:'sans-serif'}}>
    <Box width="50%" p={2}>
  <Typography variant="h2" gutterBottom>Upload Images</Typography>
  <div {...getRootProps()} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
    <input {...getInputProps()} />
    <Typography>Browse Image</Typography>
  </div>
  {product.imageUrl && (
    <img src={product.imageUrl} alt="Product" style={{ marginTop: '10px' }} />
  )}
  <Box display="flex" flexWrap="wrap" mt={2}>
    {files.map((file, index) => (
      <Box key={index} width="100px" mr={1} mb={1}>
        <img src={file.preview} alt={file.name} style={{ width: '100%' }} />
      </Box>
    ))}
  </Box>
  <Button variant="contained" color="primary" disabled={files.length === 0 || isUploading}>
    {isUploading ? 'Uploading...' : 'Upload Images'}
  </Button>
</Box>


      <Box width="50%" p={2} style={{ marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom>Update Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" name="name" value={formData.name } onChange={handleInputChange} fullWidth />
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
          {/* <Grid item xs={6}>
            <TextField label="Rating" name="rating" value={formData.rating} onChange={handleInputChange} fullWidth />
          </Grid> */}
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
            <TextField label="Status" name="status" value={formData.status} onChange={handleInputChange} fullWidth />
          </Grid>
          <Box mt={2}>
            <Typography gutterBottom>Payment Methods</Typography>
            <Grid container spacing={2}>
              {paymentMethods.map((method) => (
                <Grid item xs={2} key={method.name}>
                  <FormControlLabel
                    control={<Checkbox
                      checked={(formData.paymentMethods).includes(method.value)}
                      onChange={handlePaymentMethodChange}
                      value={method.value}
                    />}
                    label={
                      <Box>
                        <img src={method.image} alt={method.name} style={{ width: '65%' }} />
                        <Typography variant="body2">{method.name}</Typography>
                      </Box>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSaveToDraft}>Save Changes</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Product Updated successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
    </div>
  );
};

export default EditProduct;
