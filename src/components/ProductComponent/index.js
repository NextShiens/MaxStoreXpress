import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography } from '@mui/material';
import { Grid, Card, CardContent } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $price: Float!) {
    createProduct(input: { name: $name, price: $price }) {
      id
    }
  }
`;

const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $name: String!, $price: Float!) {
    updateProduct(id: $id, input: { name: $name, price: $price }) {
      id
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const ProductComponent = () => {
  debugger
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const openUpdateProductDialog = async () => {
    return {
      name: 'newProductName',
      price: 25.99,
    };
  };

  const handleUpdateProduct = async (id) => {
    const { name, price } = await openUpdateProductDialog();

    try {
      const { data } = await updateProduct({ variables: { id, name, price } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const { data } = await createProduct({ variables: { name, price: parseFloat(price) } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { data } = await deleteProduct({ variables: { id } });
      console.log(data);
      refetch();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton variant="text" />
        <Skeleton variant="circle" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </div>
    );
  }
  if (error) return `Error! ${error.message}`;

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Product Management</Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" className="mb-2">Create Product</Typography>
              <TextField size="small" className="mb-2 w-full" type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
              <TextField size="small" className="mb-2 w-full" type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
              <Button variant="contained" color="success" className="mb-4 w-full" onClick={handleCreateProduct}>Create Product</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" className="mb-2">Get Products</Typography>
          <TableContainer component={Paper} className="mb-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.getProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <ArrowDropDownIcon />
                      </IconButton>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => { handleUpdateProduct(product.id); handleClose(); }}
                          sx={{ color: 'blue' }}
                        >
                          Update
                        </MenuItem>
                        <MenuItem
                          onClick={() => { handleDeleteProduct(product.id); handleClose(); }}
                          sx={{ color: 'red' }}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductComponent;
