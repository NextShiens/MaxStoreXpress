import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useAuth } from 'react-oidc-context';
import { Box, Typography } from '@mui/material';

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
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
    }
  }
`;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  const [tenantID, setTenantID] = useState("testid");

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
    try {
      await deleteProduct({ variables: { productId } });
      refetch();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateTimeString = currentDate.toLocaleDateString('en-US', options);
    const [datePart, timePart] = dateTimeString.split(', ');
    const formattedTime = timePart.replace('at', '').trim();
    return `${datePart}, ${formattedTime}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Box style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#F1F1F1', border: '1px solid #ccc', borderRadius: '6px', padding: '10px', margin: '10px', marginTop: '30px' }}>
        <Typography variant="h6" style={{ marginLeft: '20px', marginTop: '10px', fontWeight: 'bold', fontStyle: 'italic', padding: '10px' }}>Products</Typography>
        <Typography variant="body1" style={{ backgroundColor: '#F9F9F9', padding: '13px', borderRadius: '5px', border: '1px solid #E2E1E1', marginRight: '17px' }}>{getCurrentDateTime()}</Typography>
      </Box>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px', padding: '20px' }}>
        {data.getProducts.map(({ id, name, price, minPrice, maxPrice, description, category, imageUrl }, index) => (
          <div key={id} style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '30px', height: '100%', marginBottom: index % 3 === 2 ? '0' : '20px', boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#F1F1F1' }}>
            <div style={{ flex: 1 }}>
              <img src={imageUrl} alt={name} style={{ maxWidth: '100%', maxHeight: '200px', border: '0.5px solid #ccc', borderRadius: '5px', alignSelf: 'center' }} />
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</h2>
              <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem', color:'#00BA9D' }}>Description: {description}</p>
              <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem', color:'#035ECF' }}>Price: ${price}</p>
              <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' }}>Min Price: ${minPrice}</p>
              <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' }}>Max Price: ${maxPrice}</p>
              <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' }}>Category: {category}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button onClick={() => handleEdit(id)} style={{ backgroundColor: 'white', color: 'blue', padding: '8px 42px', border: '2px solid blue', borderRadius: '23px', cursor: 'pointer', height: '38px' }}>Edit</button>
              <button onClick={() => handleDelete(id)} style={{ backgroundColor: 'white', color: 'red', padding: '8px 42px', border: '2px solid red', borderRadius: '23px', cursor: 'pointer', height: '38px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous Page</button>
        <span style={{ margin: '0 10px' }}>Page {page}</span>
        <button disabled={data.getProducts.length < limit} onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default Products;
