import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useAuth } from 'react-oidc-context';

const GET_PRODUCTS = gql`
  query GetProducts($filter: ProductFilterInput, $limit: Int, $skip: Int) {
    getProducts(filter: $filter, limit: $limit, skip: $skip) {
      id
      name
      price
      description

      tenantID
      category
      imageUrl
      # rating
    }
  }
`;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [user, isAuthenticated]);
  const tenantID = user?.profile['custom:tenatID'];
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { 
      filter:{
        tenantID: tenantID 
      },
      limit: 10, skip: (page - 1) * 10, tenantID }, 
  });

  const handleEdit = (productId) => {
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Deleting product with ID: ${productId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px', padding: '20px' }}>
      {data.getProducts.map(({ id, name, price, description, category, imageUrl }, index) => (
        <div key={id} style={{ border: '1px solid #ccc', borderRadius: '6px', padding: '30px', height: '80%', marginBottom: index % 3 === 2 ? '0' : '20px', boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <img src={imageUrl} alt={name} style={{ maxWidth: '100%', maxHeight: '200px', border: '0.5px solid #ccc', borderRadius: '5px', alignSelf: 'center' }} />
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</h2>
            <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' , color:'#00BA9D' }}>Description: {description}</p>
            <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' , color:'#035ECF' }}>Sale Price: {price}</p>
            <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' }}>Category: {category}</p>
            {/* <p style={{ fontWeight: 700, lineHeight: 1.4, fontSize: '.875rem' }}>rating {rating}</p> */}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={() => handleEdit(id)} style={{ backgroundColor: 'white', color: 'blue', padding: '8px 42px', border: '2px solid blue', borderRadius: '23px', cursor: 'pointer', height: '38px' }}>Edit</button>
            <button onClick={() => handleDelete(id)} style={{ backgroundColor: 'white', color: 'red', padding: '8px 42px', border: '2px solid red', borderRadius: '23px', cursor: 'pointer', height: '38px' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
