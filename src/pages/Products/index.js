import React, { useEffect, useState, useCallback } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import { useDropzone } from 'react-dropzone';
import { Button, Grid, Typography, Card, CardContent, TextField } from '@material-ui/core';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';
const UPLOAD_FILES = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadResolver(files: $files)
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      price
      description
      tenantID
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      description
    }
  }
`;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  const [files, setFiles] = useState([]);
  const tenantID = user?.profile['custom:tenantID'];
  const [page, setPage] = useState(1);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [createProduct, { data: createProductData }] = useMutation(CREATE_PRODUCT);
  const [uploadFiles, { data: uploadFilesData }] = useMutation(UPLOAD_FILES);

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '',
    tenantID: ''
  });
  const onUploadWithGraphQL = async () => {
    try {
      // Read the file data for each file
      const fileDataPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ path: file.name, data: reader.result });
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      });
  
      const filesData = await Promise.all(fileDataPromises);
  
      const response = await uploadFiles({ variables: { files: filesData } });
      console.log('Upload response:', response);
      alert('Files uploaded successfully with GraphQL');
    } catch (error) {
      console.error('Error uploading files with GraphQL:', error);
      alert('Error uploading files with GraphQL');
    }
  };

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
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
      alert('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
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
      const response = await axios.post(REACT_APP_GRAPHQL_FILE_UPLOAD_URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Upload response:', response);

      if (response.data && Array.isArray(response.data)) {
        const urls = response.data.map(file => file.url);
        setProduct(prevProduct => ({
          ...prevProduct,
          imageUrl: urls
        }));
      }

      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [user, isAuthenticated]);

  if (loading) {
    return (
      <div>
        <div {...getRootProps()} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
          <input {...getInputProps()} />
          <Typography>Drag 'n' drop some files here, or click to select files</Typography>
        </div>
        <Grid container spacing={3}>
          {[...Array(10)].map((_, index) => (
            <Grid item xs={3} key={index}>
              <Skeleton variant="rect" height={150} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  if (error) return <Typography>Error :(</Typography>;

  return (
    <div>
      <div {...getRootProps()} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop some files here, or click to select files</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField name="name" value={product.name} onChange={handleChange} label="Name" />
        <TextField name="price" value={product.price} onChange={handleChange} label="Price" />
        <TextField name="description" value={product.description} onChange={handleChange} label="Description" />
        <TextField name="category" value={product.category} onChange={handleChange} label="Category" />
        <TextField name="imageUrl" value={product.imageUrl} onChange={handleChange} label="Image URL" />
        <TextField name="tenantID" value={product.tenantID} onChange={handleChange} label="Tenant ID" />
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
          <Grid item xs={4} key={id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{name}</Typography>
                <Typography>{description}</Typography>
                <Typography>{price}</Typography>
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

export default Products;