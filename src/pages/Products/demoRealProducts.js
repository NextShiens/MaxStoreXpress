import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Grid, Typography, Card, CardContent, TextField } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';
import { getIdToken } from '../../auth/idTokenProvider';

const UPLOAD_FILES = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadResolver(files: $files)
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      tenantID
      name
      slug
      brand
      price
      minPrice
      maxPrice
      description
      category
      tags
      imageUrl
      rating
      stock
      discount
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      tenantID
      name
      slug
      brand
      price
      minPrice
      maxPrice
      description
      category
      tags
      imageUrl
      rating
      stock
      discount
    }
  }
`;
const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const DemoProducts = () => {
  const { user, isAuthenticated } = useAuth();
  const [files, setFiles] = useState([]);
  const tenantID = user?.profile['custom:tenantID'];
  const [page, setPage] = useState(1);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [createProduct, { data: createProductData }] = useMutation(CREATE_PRODUCT);
  const [uploadFiles, { data: uploadFilesData }] = useMutation(UPLOAD_FILES);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);


  const [product, setProduct] = useState({
    tenantID: '',
    name: '',
    slug: '',
    brand: '',
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    description: '',
    category: '',
    tags: [],
    imageUrl: [],
    rating: 0,
    stock: 0,
    discount: 0
  });
  const onUploadWithGraphQL = async () => {
    try {
      const response = await uploadFiles({ variables: { files } });
      console.log('Upload response:', response);
    } catch (error) {
      console.error('Error uploading files with GraphQL:', error);
     
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = ['price', 'minPrice','maxPrice'].includes(name) ? parseFloat(value) : value;
  
    console.log(name + typeof(parsedValue));
    
    setProduct({
      ...product,
      [name]: parsedValue
    });
  };
  
  
  
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        tenantID: tenantID
      },
      limit: 10, skip: (page - 1) * 10, tenantID
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProduct({ variables: { input: product } });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  const onDeleteProduct = async (productId) => {
    try {
      await deleteProductMutation({ variables: { id: productId }});
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const onDrop = useCallback(acceptedFiles => {
    if (files.length + acceptedFiles.length > 5) {
      alert('You can only upload up to 5 images.');
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
  const onUpload = async () => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    try {
      const token = await getIdToken();
      const response = await axios.post(REACT_APP_GRAPHQL_FILE_UPLOAD_URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(percentCompleted);
        }
      });

      if (response.data && Array.isArray(response.data)) {
        const urls = response.data.map(file => file.url);
        setProduct(prevProduct => ({
          ...prevProduct,
          imageUrl: urls
        }));
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>

    );
  }

  if (error) return <Typography>Error :</Typography>;
  console.log("working properly")
  return (
    <div>
      <div {...getRootProps()} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop some files here, or click to select files</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField name="name" value={product.name} onChange={handleChange} label="Name" required/>
        <TextField name="description" value={product.description} onChange={handleChange} label="Description" required/>
        <TextField name="category" value={product.category} onChange={handleChange} label="Category" required/>
        <TextField name="price" value={Number(product.price)} onChange={handleChange} label="Price" required/>
        <TextField name="tenantID" value={product.tenantID} onChange={handleChange} label="Tenant ID" required/>
        <TextField name="slug" value={product.slug} onChange={handleChange} label="Slug" required/>
        <TextField name="brand" value={product.brand} onChange={handleChange} label="Brand" required/>
        <TextField name="minPrice" value={product.minPrice} onChange={handleChange} label="Min Price" required/>
        <TextField name="maxPrice" value={product.maxPrice} onChange={handleChange} label="Max Price" required/>
        <TextField name="tags" value={product.tags} onChange={handleChange} label="Tags" required/>
        <TextField name="rating" value={product.rating} onChange={handleChange} label="Rating" required/>
        <TextField name="stock" value={product.stock} onChange={handleChange} label="Stock" required/>
        <TextField name="discount" value={product.discount} onChange={handleChange} label="Discount" required/>
        <TextField name="imageUrl" value={product.imageUrl} onChange={handleChange} label="Image URL" required/>

        <Button type="submit">Create Product</Button>
      </form>
      <Button variant="contained" color="primary" onClick={onUpload} disabled={files.length === 0}>
        Upload
      </Button>
      <Button variant="contained" color="primary" onClick={onUploadWithGraphQL} disabled={files.length === 0}>
        Upload with GraphQL
      </Button>
      <Grid container spacing={3}>
        {files.map((file, index) => (
          <Grid item xs={3} key={index}>
            <img src={file.preview} alt={file.name} style={{ width: '100%' }} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        {data.getProducts.map(({ id, name, price, description }) => (
          
          <Grid item xs={6} key={id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography>{price}</Typography>
                <Typography>{description}</Typography>
                <Button variant="danger" onClick={() => onDeleteProduct(id)}>Delete Item</Button>
               
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous Page
      </Button>
      <Button variant="contained" color="primary" onClick={() => setPage(page + 1)}>
        Next Page
      </Button>
    </div>
  );
};

export default DemoProducts;