import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import { Box, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert';
import { Link } from 'react-router-dom'; 
import EditIcon from '@mui/icons-material/Edit'; 

const GET_PRODUCTS = gql`
  query GetProducts($limit: Int!, $skip: Int!, $filter: ProductFilterInput) {
    getProducts(limit: $limit, skip: $skip, filter: $filter) {
      id
      name
      price
      maxPrice
      minPrice
      category
      rating
      description
      tenantID
      imageUrl
      slug
      brand
      tags
      stock
      discount
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($ID: String) {
    deleteProduct(id: $ID)
  }
`;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  const [tenantID, setTenantID] = useState("testid");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && user.profile && user.profile['custom:tenantID']) {
      setTenantID(user.profile['custom:tenantID']);
    }
  }, [user, isAuthenticated]);

  const [page, setPage] = useState(1);
  const limit = 50;

  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: {
      limit: limit,
      skip: (page - 1) * limit
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleEdit = (productId) => {
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = async (productId) => {
    Swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          await deleteProduct({ variables: { ID: productId.toString() } });
          setOpenSnackbar(true);
          refetch();
        } catch (err) {
          console.error('Error deleting product:', err);
        }
      }
    });
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = currentDate.toLocaleDateString('en-US', options);
    const [datePart, timePart] = dateTimeString.split(', ');
    const formattedTime = timePart.replace('at', '').trim();
    return `${datePart}, ${formattedTime}`;
  };

  const resetDeleteMessage = () => {
    setDeleteSuccess(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <Box style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F1F1F1', border: '1px solid #ccc', borderRadius: '6px', padding: '10px', margin: '10px', marginTop: '30px' }}>
        <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px', fontWeight: 'bold', fontStyle: 'italic', padding: '10px' }}>Products</Typography>
        <Typography variant="body1" style={{ backgroundColor: '#F9F9F9', padding: '13px', borderRadius: '5px', border: '1px solid #E2E1E1', marginRight: '17px' }}>{getCurrentDateTime()}</Typography>
      </Box>

      {deleteSuccess && (
        <div style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', marginBottom: '10px', borderRadius: '6px', textAlign: 'center' }}>
          Product deleted successfully!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px', padding: '20px' }}>
        {data.getProducts.map(({ id, name, price, minPrice, maxPrice, description, category, imageUrl, slug, brand, tags, stock, discount }, index) => (
          <div key={id} style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '30px', height: '100%', marginBottom: index % 3 === 2 ? '0' : '20px', boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#F1F1F1' }}>
            <div style={{ flex: 1 }}>
              <img src={imageUrl} alt={name} style={{ maxWidth: '100%', maxHeight: '200px', border: '0.5px solid #ccc', borderRadius: '5px', alignSelf: 'center' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 'bold', color: '#333' }}>{name}</h2>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#666' }}>Description: {description}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Price: ${price}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Min Price: ${minPrice}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Max Price: ${maxPrice}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Category: {category}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Slug: {slug}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Brand: {brand}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Tags: {tags.join(', ')}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Stock: {stock}</p>
              <p style={{ fontWeight: 'normal', lineHeight: 1.4, fontSize: '1rem', color: '#777' }}>Discount: {discount}%</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Link to={`/editproduct/${id}`} style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: 'white', color: 'blue', padding: '8px 42px', border: '2px solid blue', borderRadius: '23px', cursor: 'pointer', height: '38px', display: 'flex', alignItems: 'center' }}>
                  <EditIcon style={{ marginRight: '5px' }} />
                  Edit
                </button>
              </Link>
              <button onClick={() => handleDelete(id)} style={{ backgroundColor: 'white', color: 'red', padding: '8px 42px', border: '2px solid red', borderRadius: '23px', cursor: 'pointer', height: '38px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
          Product deleted successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Products;