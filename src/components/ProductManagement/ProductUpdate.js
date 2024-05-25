import React, { useState, useCallback, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, Snackbar, Checkbox, FormControlLabel } from '@mui/material';
import { useMutation, gql } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { useAuth } from 'react-oidc-context';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../globalReduxStore/actions';
import { useCreateProduct } from '../../globalReduxStore/reducers/productoperation';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';
import { getIdToken } from '../../auth/idTokenProvider';

const UPLOAD_FILES_MUTATION = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files)
  }
`;

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const createProduct = useCreateProduct();
  const [tenantID, setTenantID] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    maxPrice: '',
    minPrice: '',
    description: '',
    tenantID: '',
    slug: '',
    brand: '',
    tags: [],
    stock: '',
    discount: '',
    imageUrl: [],
    paymentMethods: [], 
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadFiles] = useMutation(UPLOAD_FILES_MUTATION);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user && user.profile && user.profile["custom:tenantID"]) {
      setTenantID(user.profile["custom:tenantID"]);
    }
  }, [user,isAuthenticated]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "This field is required.";
    tempErrors.price = formData.price ? "" : "This field is required.";
    tempErrors.maxPrice = formData.maxPrice ? "" : "This field is required.";
    tempErrors.minPrice = formData.minPrice ? "" : "This field is required.";
    tempErrors.stock = formData.stock ? "" : "This field is required.";
    tempErrors.discount = formData.discount ? "" : "This field is required.";
    tempErrors.alreadySold = formData.alreadySold ? "" : "This field is required.";
    tempErrors.category = formData.category ? "" : "This field is required.";
    tempErrors.description = formData.description ? "" : "This field is required.";
    tempErrors.slug = formData.slug ? "" : "This field is required.";
    tempErrors.brand = formData.brand ? "" : "This field is required.";
    tempErrors.tags = formData.tags.length > 0 ? "" : "This field is required.";

    setErrors({
      ...tempErrors
    });

    return Object.values(tempErrors).every(x => x === "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const numberFields = ['price', 'maxPrice', 'minPrice', 'stock', 'discount', 'alreadySold'];
    const numberPattern = /^[0-9]*$/;

    if (numberFields.includes(name) && (value === '' || numberPattern.test(value))) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (!numberFields.includes(name)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSaveToDraft = async () => {
    if (validate()) {
      try {
        const input = {
          ...formData,
          price: parseFloat(formData.price),
          maxPrice: parseFloat(formData.maxPrice),
          minPrice: parseFloat(formData.minPrice),
          alreadySold: parseInt(formData.alreadySold),
          stock: parseInt(formData.stock),
          discount: parseInt(formData.discount),
          tenantID: tenantID,
          status: 'non-active',
        };

        await createProduct({ variables: { input } });
        dispatch(actionCreators.createProduct(input));
        setOpenSnackbar(true);
        clearForm();
        clearFiles();
      } catch (error) {
        console.error('Error creating product:', error);
        showAlert('Error saving product to draft');
      }
    }
  };

  const handlePublish = async () => {
    if (validate()) {
      try {
        const input = {
          ...formData,
          price: parseFloat(formData.price),
          maxPrice: parseFloat(formData.maxPrice),
          minPrice: parseFloat(formData.minPrice),
          alreadySold: parseInt(formData.alreadySold),
          stock: parseInt(formData.stock),
          discount: parseInt(formData.discount),
          tenantID: tenantID,
          status: 'active',
        };

        console.log('Publishing product with data:', input);

        await createProduct({ variables: { input } });
        dispatch(actionCreators.createProduct(input));
        setOpenSnackbar(true);
        clearForm();
        clearFiles();
      } catch (error) {
        console.error('Error publishing product:', error);
        showAlert('Error publishing product');
      }
    }
  };


  const handleImageUpload = async () => {
    const token = await getIdToken();
  
    try {
      setIsUploading(true);
  
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
  
      const response = await axios.post(REACT_APP_GRAPHQL_FILE_UPLOAD_URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const uploadedImageUrls = response.data.urls;
  
      const imageUrlArray = Array.isArray(uploadedImageUrls) ? uploadedImageUrls.map((url) => String(url)) : [String(uploadedImageUrls)];
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageUrl: [...prevFormData.imageUrl, ...imageUrlArray],
      }));
  
      showAlert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      showAlert('Error uploading files');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const clearForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      maxPrice: '',
      minPrice: '',
      description: '',
      tenantID: '',
      slug: '',
      brand: '',
      tags: [],
      stock: '',
      discount: '',
      paymentMethods: [], 
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

  const handlePaymentMethodChange = (e) => {
    const { value, checked } = e.target;
    const updatedPaymentMethods = [...(formData.paymentMethods || [])];
    const index = updatedPaymentMethods.indexOf(value);
  
    if (checked && index === -1) {
      updatedPaymentMethods.push(value);
    } else if (!checked && index !== -1) {
      updatedPaymentMethods.splice(index, 1);
    }
  
    setFormData({
      ...formData,
      paymentMethods: updatedPaymentMethods
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

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = currentDate.toLocaleDateString('en-US', options);
    const [datePart, timePart] = dateTimeString.split(', ');
    const formattedTime = timePart.replace('at', '').trim();
    return `${datePart}, ${formattedTime}`;
  };

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
      <Box style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', border: '1px solid #ffffff', borderRadius: '6px', padding: '15px', margin: '10px', marginTop: '30px',  boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)',height:'90px',width:'99%', fontFamily:'cursive'}}>
        <Typography variant="h6" style={{ marginLeft: '40px', marginTop: '5px', fontWeight: 'bold', fontFamily:'sans-serif', fontSize:'30px' }}>CREATE PRODUCT</Typography>
        <Typography variant="body1" style={{ backgroundColor: '#F9F9F9', padding: '13px', borderRadius: '5px', border: '1px solid #E2E1E1', marginRight: '30px', width:'328px' , height:'61px', textAlign:'center',fontWeight:'700', fontFamily:'cursive', color:'#182e4c'  }}>{getCurrentDateTime()}</Typography>
      </Box>
    
      <Box  style={{display:'flex', border:'1px solid #ffffff', borderRadius:'6px', padding:'30px', height:'95%', boxShadow:'0 0 14px rgba(0, 0, 0, 0.1)' , backgroundColor: '#ffffff', margin:'20px 20px 20px 20px',  fontFamily:'sans-serif'}}>
      <Box width="50%" p={2}>
        <Typography variant="h2" gutterBottom>Upload Images</Typography>
      <Grid container spacing={3}>
       {[...Array(5)].map((_, index) => (
      <Grid item xs={3} key={index}>
       <div style={{ 
           background: 'var(--body)', 
           aspectRatio: '288 / 262', 
           borderRadius: '6px', 
           display: 'flex', 
           alignItems: 'center', 
           justifyContent: 'center', 
           border: '1px dashed #E2E1E1', 
           padding: '10px', 
           marginBottom: '10px', 
           backgroundColor: '#F9F9F9',         
           position: 'relative' 
        }} {...getRootProps()}>
       <input {...getInputProps()} />
  <Typography component="div" >
    {files[index] && (
      <img src={files[index].preview} alt={files[index].name} style={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        borderRadius: '6px'
      }} />
      )}
       {!files[index] && (
         <Typography style={{cursor:'pointer'}} >Browse image</Typography>
          )}
        </Typography>
       </div>
          {index === 4 && (
          <Button variant="contained" color="primary" onClick={handleImageUpload} disabled={files.length === 0 || isUploading}>
            {isUploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        )}
        </Grid>
        ))}
         </Grid>
        </Box>
      <Box width="50%" p={2} style={{ marginTop: '20px' }}>
        <Typography variant="h2" gutterBottom>Create Product</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} fullWidth error={!!errors.name} helperText={errors.name} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Price" name="price" value={formData.price} onChange={handleInputChange} fullWidth error={!!errors.price} helperText={errors.price}/>
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
              <MenuItem value="furniture">Furniture</MenuItem>
              
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Max Price" name="maxPrice" value={formData.maxPrice} onChange={handleInputChange} fullWidth  error={!!errors.maxPrice} helperText={errors.maxPrice} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Min Price" name="minPrice" value={formData.minPrice} onChange={handleInputChange} fullWidth  error={!!errors.minPrice} helperText={errors.minPrice}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Slug" name="slug" value={formData.slug} onChange={handleInputChange} fullWidth error={!!errors.slug} helperText={errors.slug} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Brand" name="brand" value={formData.brand} onChange={handleInputChange} fullWidth error={!!errors.brand} helperText={errors.brand}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Tags" name="tags" value={formData.tags} onChange={handleInputChange} fullWidth error={!!errors.tags} helperText={errors.tags} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Stock" name="stock" value={formData.stock} onChange={handleInputChange} fullWidth error={!!errors.stock} helperText={errors.stock}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Discount" name="discount" value={formData.discount} onChange={handleInputChange} fullWidth error={!!errors.discount} helperText={errors.discount}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Already Sold" name="alreadySold" value={formData.alreadySold} onChange={handleInputChange} fullWidth  error={!!errors.alreadySold} helperText={errors.alreadySold}/>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth error={!!errors.description} helperText={errors.description}/>
          </Grid>
          <Box mt={2}>
            <Typography gutterBottom style={{fontFamily:'sans-serif'}}>Payment Methods</Typography>
            <Grid container spacing={2}>
              {paymentMethods.map((method) => (
                <Grid item xs={2} key={method.name}>
                  <FormControlLabel
                    control={<Checkbox
                      checked={(formData.paymentMethods || []).includes(method.value)}
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
          <Button variant="contained" color="primary" onClick={handleSaveToDraft}>Save to Draft</Button>
          <Button variant="contained" color="primary" onClick={handlePublish} disabled={!formData.imageUrl}>Publish</Button>
        </Box>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Product created successfully!
        </MuiAlert>
      </Snackbar>
    </Box>
    </div>
  );
};

export default CreateProductForm;
